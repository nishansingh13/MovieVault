const express = require('express');
const cors = require('cors');
const cron = require('node-cron')
const morgan = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const dotenv = require('dotenv');
const movieRoutes = require('./routes/movieRoutes');
const userRoutes = require("./routes/userRoutes");
const rentalRoutes = require("./routes/rentalRoutes");
const sendMail = require("./routes/sendMail")
const { healthCheck } = require('./controllers/healthController');
const { connectDB } = require('./config/database');
const { validateEnv } = require('./config/validateEnv');
const corsOptions = require('./config/corsConfig');
const { errorHandler, notFound } = require('./middleware/errorHandler');
const { apiLimiter } = require('./middleware/rateLimiter');
const Rentals = require('./models/Rentals');

dotenv.config();
validateEnv();
const app = express();

// Security middleware
app.use(helmet());

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

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
  
app.use(cors(corsOptions));
  
  
app.use(express.json());
app.use(mongoSanitize()); // Sanitize data to prevent MongoDB injection
app.use(apiLimiter); // Apply rate limiting to all routes
app.use('/api/movies', movieRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/rentals', rentalRoutes);
app.use('/api/sendMail',sendMail)
app.get('/api/health', healthCheck);
app.get('/api/ping', (req, res) => {
    res.send('pong');
});

// Error handling middleware (must be last)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
