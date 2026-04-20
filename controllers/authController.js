import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import ProviderProfile from '../models/ProviderProfile.js';

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// Register user
export const register = async (req, res) => {
  try {
    console.log('=== REGISTRATION REQUEST ===');
    console.log('Request body:', req.body);
    console.log('Request headers:', req.headers);
    
    const { name, email, password, phone, role, birthdate } = req.body;

    // Validate required fields
    if (!name || !email || !password || !role) {
      console.log('Missing required fields:', { name, email, password: !!password, role });
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, email, password, role'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists:', email);
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Create new user (phone is optional)
    console.log('Creating user with data:', { name, email, phone, role, birthdate });
    const user = await User.create({
      name,
      email,
      password,
      phone: phone || undefined, // Only include phone if provided
      role,
      birthdate: birthdate || undefined
    });
    
    console.log('User created successfully:', user._id);

    // If role is provider, create provider profile
    if (role === 'provider') {
      await ProviderProfile.create({
        user: user._id,
        businessName: `${name}'s Services`
      });
    }

    // Generate token
    const token = generateToken(user._id);

    // Send response
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          birthdate: user.birthdate
        },
        token
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration',
      error: error.message
    });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if password matches
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate token
    const token = generateToken(user._id);

    // Send response
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          birthdate: user.birthdate
        },
        token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: error.message
    });
  }
};

// Get current user (for profile)
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    res.status(200).json({
      success: true,
      data: {
        user
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching user data',
      error: error.message
    });
  }
};
