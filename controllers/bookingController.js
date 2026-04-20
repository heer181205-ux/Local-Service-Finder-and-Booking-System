import Booking from '../models/Booking.js';
import User from '../models/User.js';

// Create a new booking
export const createBooking = async (req, res) => {
  try {
    const { providerId, serviceName, agreedPrice, date, description, customerNotes } = req.body;
    const customerId = req.user.id;

    // Validate that the provider exists and is a provider
    const provider = await User.findById(providerId);
    if (!provider || provider.role !== 'provider') {
      return res.status(404).json({
        success: false,
        message: 'Provider not found'
      });
    }

    // Create booking
    const booking = await Booking.create({
      customer: customerId,
      provider: providerId,
      serviceName,
      agreedPrice,
      date: new Date(date),
      description,
      customerNotes
    });

    // Populate booking details
    const populatedBooking = await Booking.findById(booking._id)
      .populate('customer', 'name phone email')
      .populate('provider', 'name phone email');

    // Get Socket.io instance and emit to provider
    const io = req.app.get('io');
    if (io) {
      io.emit('new_booking_request', {
        bookingId: booking._id,
        providerId,
        customerId,
        serviceName,
        agreedPrice,
        date: booking.date,
        customerName: req.user.name
      });
    }

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: {
        booking: populatedBooking
      }
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating booking',
      error: error.message
    });
  }
};

// Update booking status (for providers)
export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, providerNotes } = req.body;
    const providerId = req.user.id;

    // Find booking
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if the current user is the provider
    if (booking.provider.toString() !== providerId) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to update this booking'
      });
    }

    // Validate status transition
    const validTransitions = {
      'pending': ['accepted', 'rejected'],
      'accepted': ['completed'],
      'rejected': [],
      'completed': []
    };

    if (!validTransitions[booking.status].includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Cannot change status from ${booking.status} to ${status}`
      });
    }

    // Update booking
    booking.status = status;
    if (providerNotes) {
      booking.providerNotes = providerNotes;
    }

    if (status === 'completed') {
      booking.completedAt = new Date();
    }

    await booking.save();

    // Populate booking details
    const updatedBooking = await Booking.findById(booking._id)
      .populate('customer', 'name phone email')
      .populate('provider', 'name phone email');

    // Get Socket.io instance and emit to customer
    const io = req.app.get('io');
    if (io) {
      io.emit('booking_status_updated', {
        bookingId: booking._id,
        customerId: booking.customer,
        providerId: booking.provider,
        status,
        providerName: req.user.name
      });
    }

    res.status(200).json({
      success: true,
      message: `Booking ${status} successfully`,
      data: {
        booking: updatedBooking
      }
    });
  } catch (error) {
    console.error('Update booking status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating booking status',
      error: error.message
    });
  }
};

// Get bookings for the logged-in user
export const getMyBookings = async (req, res) => {
  try {
    const userId = req.user.id;
    const { status, page = 1, limit = 10 } = req.query;

    // Build query
    let query = {
      $or: [
        { customer: userId },
        { provider: userId }
      ]
    };

    if (status) {
      query.status = status;
    }

    // Get bookings with pagination
    const bookings = await Booking.find(query)
      .populate('customer', 'name phone email')
      .populate('provider', 'name phone email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    // Get total count
    const total = await Booking.countDocuments(query);

    // Format bookings to include user role context
    const formattedBookings = bookings.map(booking => {
      const isCustomer = booking.customer._id.toString() === userId;
      const isProvider = booking.provider._id.toString() === userId;
      
      return {
        ...booking.toObject(),
        userRole: isCustomer ? 'customer' : isProvider ? 'provider' : 'unknown',
        otherParty: isCustomer ? {
          name: booking.provider.name,
          phone: booking.provider.phone,
          email: booking.provider.email
        } : {
          name: booking.customer.name,
          phone: booking.customer.phone,
          email: booking.customer.email
        }
      };
    });

    res.status(200).json({
      success: true,
      data: {
        bookings: formattedBookings,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get my bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching bookings',
      error: error.message
    });
  }
};

// Get single booking details
export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const booking = await Booking.findById(id)
      .populate('customer', 'name phone email')
      .populate('provider', 'name phone email');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user is part of this booking
    if (booking.customer._id.toString() !== userId && booking.provider._id.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to view this booking'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        booking
      }
    });
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching booking',
      error: error.message
    });
  }
};
