import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import favoriteRoutes from './routes/favoriteRoutes.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();


connectDB(); // Connect to MongoDB

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/favorites', favoriteRoutes);

// Error Handler
app.use(errorHandler);

// Default Route
app.get('/', (req, res) => {
  res.send('🌤️ Weather Dashboard API is running...');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

