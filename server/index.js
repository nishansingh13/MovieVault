import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import movieRoutes from './routes/movieRoutes.js';
import connectDB from './config/database.js';
import userRoutes from "./routes/userRoutes.js"
dotenv.config();
const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use('/api/movies', movieRoutes);
app.use('/api/auth',userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
