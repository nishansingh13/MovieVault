const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const movieRoutes = require('./routes/movieRoutes');
const userRoutes = require("./routes/userRoutes");
const rentalRoutes = require("./routes/rentalRoutes");
const { connectDB } = require('./config/database');

dotenv.config();
const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use('/api/movies', movieRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/rentals', rentalRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
