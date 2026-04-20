import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import User from './models/User.js';
import ProviderProfile from './models/ProviderProfile.js';

// Import routes
import authRoutes from './routes/auth.js';
import serviceRoutes from './routes/services.js';
import bookingRoutes from './routes/bookings.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const server = createServer(app);

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' ? 'https://yourdomain.com' : 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Make io available to controllers
app.set('io', io);

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    console.log('Database name:', mongoose.connection.name);
    console.log('Connection host:', mongoose.connection.host);
  })
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Local Service Finder API is running!',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      services: '/api/services',
      bookings: '/api/bookings'
    }
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/bookings', bookingRoutes);

// Debug endpoint to check users (remove this in production)
app.get('/debug/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.json({
      success: true,
      count: users.length,
      users: users.map(u => ({ id: u._id, name: u.name, email: u.email, role: u.role }))
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Clear dummy data endpoint
app.delete('/debug/clear-users', async (req, res) => {
  try {
    await User.deleteMany({});
    await ProviderProfile.deleteMany({});
    res.json({ success: true, message: 'All dummy data cleared' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Join user to their personal room
  socket.on('join_user_room', (userId) => {
    socket.join(`user_${userId}`);
    console.log(`User ${userId} joined their room`);
  });

  // Handle new booking requests (for providers)
  socket.on('new_booking_request', (data) => {
    // Emit to specific provider
    io.to(`user_${data.providerId}`).emit('booking_request', data);
  });

  // Handle booking status updates (for customers)
  socket.on('booking_status_updated', (data) => {
    // Emit to specific customer
    io.to(`user_${data.customerId}`).emit('booking_status_update', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Socket.io server running on port ${PORT}`);
});
