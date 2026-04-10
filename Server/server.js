import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import issueRoutes from './routes/issueRoutes.js';

dotenv.config();
connectDB();

const app = express();

// Updated CORS for Production
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173", // Use env variable in Render
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true
}));

app.use(express.json());

// API Routes
app.use('/api/issues', issueRoutes);

app.get('/', (req, res) => {
  res.send('Civico API is live and running! 🚀');
});

// Port handling for Render
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});