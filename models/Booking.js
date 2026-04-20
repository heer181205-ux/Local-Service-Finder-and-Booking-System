import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Customer reference is required']
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Provider reference is required']
  },
  serviceName: {
    type: String,
    required: [true, 'Service name is required'],
    trim: true
  },
  agreedPrice: {
    type: Number,
    required: [true, 'Agreed price is required'],
    min: [0, 'Price cannot be negative']
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'completed'],
    default: 'pending'
  },
  date: {
    type: Date,
    required: [true, 'Booking date is required'],
    validate: {
      validator: function(date) {
        return date > new Date();
      },
      message: 'Booking date must be in the future'
    }
  },
  description: {
    type: String,
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  customerNotes: {
    type: String,
    trim: true,
    maxlength: [500, 'Customer notes cannot exceed 500 characters']
  },
  providerNotes: {
    type: String,
    trim: true,
    maxlength: [500, 'Provider notes cannot exceed 500 characters']
  },
  completedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Index for efficient queries
bookingSchema.index({ customer: 1, status: 1 });
bookingSchema.index({ provider: 1, status: 1 });
bookingSchema.index({ date: 1 });

// Method to mark booking as completed
bookingSchema.methods.completeBooking = function() {
  this.status = 'completed';
  this.completedAt = new Date();
  return this.save();
};

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
