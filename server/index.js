const express = require('express');
const cors = require('cors');
const cron = require('node-cron')
const dotenv = require('dotenv');
const movieRoutes = require('./routes/movieRoutes');
const userRoutes = require("./routes/userRoutes");
const rentalRoutes = require("./routes/rentalRoutes");
const sendMail = require("./routes/sendMail")
const { connectDB } = require('./config/database');
const { validateEnv } = require('./config/validateEnv');
const Rentals = require('./models/Rentals');

dotenv.config();
validateEnv();
const app = express();
connectDB();
cron.schedule('0 0 * * *', async () => {
    const now = new Date();
    try {
      const result = await Rentals.deleteMany({ expiresAt: { $lte: now } });
      console.log(`Deleted ${result.deletedCount} expired rentals at ${now.toISOString()}`);
    } catch (err) {
      console.error(' Error deleting expired rentals:', err.message);
    }
  });
  
  app.use(cors({
    origin: ['https://movie-vauit.vercel.app', 'http://localhost:5173'],
    credentials: true,
  }));
  
  
app.use(express.json());
app.use('/api/movies', movieRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/rentals', rentalRoutes);
app.use('/api/sendMail',sendMail)
app.get('/api/ping', (req, res) => {
    res.send('pong');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
