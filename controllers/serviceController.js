import ProviderProfile from '../models/ProviderProfile.js';
import User from '../models/User.js';

// Search providers by service name
export const searchServices = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    // Search for providers offering the requested service
    const providers = await ProviderProfile.find({
      availability: true,
      'servicesOffered.serviceName': {
        $regex: query,
        $options: 'i' // Case insensitive search
      }
    })
    .populate('user', 'name phone')
    .sort({ averageRating: -1 });

    // Format the response
    const formattedProviders = providers.map(provider => {
      const matchingServices = provider.servicesOffered.filter(service =>
        service.serviceName.toLowerCase().includes(query.toLowerCase())
      );

      return {
        providerId: provider._id,
        userId: provider.user._id,
        businessName: provider.businessName,
        userName: provider.user.name,
        phone: provider.user.phone,
        averageRating: provider.averageRating,
        totalRatings: provider.totalRatings,
        description: provider.description,
        location: provider.location,
        matchingServices: matchingServices.map(service => ({
          serviceName: service.serviceName,
          price: service.price
        }))
      };
    });

    res.status(200).json({
      success: true,
      message: `Found ${formattedProviders.length} providers for "${query}"`,
      data: {
        providers: formattedProviders,
        count: formattedProviders.length
      }
    });
  } catch (error) {
    console.error('Service search error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during service search',
      error: error.message
    });
  }
};

// Get all available services (for dropdown/categories)
export const getAllServices = async (req, res) => {
  try {
    // Get all unique service names from available providers
    const services = await ProviderProfile.aggregate([
      { $match: { availability: true } },
      { $unwind: '$servicesOffered' },
      { $group: { _id: '$servicesOffered.serviceName' } },
      { $sort: { _id: 1 } }
    ]);

    const serviceNames = services.map(service => service._id);

    res.status(200).json({
      success: true,
      data: {
        services: serviceNames,
        count: serviceNames.length
      }
    });
  } catch (error) {
    console.error('Get all services error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching services',
      error: error.message
    });
  }
};
