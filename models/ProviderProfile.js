import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  serviceName: {
    type: String,
    required: [true, 'Service name is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  }
});

const providerProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User reference is required'],
    unique: true
  },
  businessName: {
    type: String,
    required: [true, 'Business name is required'],
    trim: true
  },
  availability: {
    type: Boolean,
    default: true
  },
  averageRating: {
    type: Number,
    default: 0,
    min: [0, 'Rating cannot be less than 0'],
    max: [5, 'Rating cannot be more than 5']
  },
  totalRatings: {
    type: Number,
    default: 0,
    min: [0, 'Total ratings cannot be negative']
  },
  servicesOffered: [serviceSchema],
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  location: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Method to update average rating
providerProfileSchema.methods.updateRating = function(newRating) {
  const totalRatingPoints = this.averageRating * this.totalRatings + newRating;
  this.totalRatings += 1;
  this.averageRating = totalRatingPoints / this.totalRatings;
  return this.save();
};

const ProviderProfile = mongoose.model('ProviderProfile', providerProfileSchema);

export default ProviderProfile;
