import 'dotenv/config'; // Must be first — loads .env before other modules
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import tripRoutes from './routes/tripRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

// Connect to MongoDB
connectDB();

const app = express();

// ---------------------------------------------------------------------------
// Middleware
// ---------------------------------------------------------------------------
app.use(compression()); // GZIP all responses
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'AI Travel Planner API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);

// ---------------------------------------------------------------------------
// Error handling (must be registered AFTER routes)
// ---------------------------------------------------------------------------
app.use(errorHandler);

// ---------------------------------------------------------------------------
// Start server
// ---------------------------------------------------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
