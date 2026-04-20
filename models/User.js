import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
  },
  phone: {
    type: String,
    required: false, // Made optional
    validate: {
      validator: function(phone) {
        // Only validate if phone is provided
        if (!phone) return true;
        // Validate +91 format for Indian numbers
        return /^(\+91)[6-9]\d{9}$/.test(phone);
      },
      message: 'Phone number must be in +91 format (e.g., +919876543210)'
    }
  },
  role: {
    type: String,
    enum: ['customer', 'provider'],
    required: [true, 'Role is required']
  },
  birthdate: {
    type: Date,
    required: false
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    throw error;
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
