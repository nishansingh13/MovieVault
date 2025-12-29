# MovieVault Server API

Backend server for the MovieVault application - A movie rental platform with TMDB integration.

## Features

- 🎬 Movie search and details via TMDB API
- 👤 User authentication with JWT
- 🔐 Secure password hashing with bcryptjs
- 📧 Email notifications via Nodemailer
- 🎫 Movie rental management
- ⏰ Automated rental expiration with cron jobs
- 🛡️ Security features: Helmet, CORS, Rate Limiting, Input Sanitization
- 📝 Request logging with Morgan
- 🔍 MongoDB with Mongoose ODM

## Prerequisites

- Node.js v16 or higher
- MongoDB database
- TMDB API key

## Environment Variables

Create a `.env` file in the server directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
TMDB_API=your_tmdb_api_key
NODE_ENV=development
```

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm start
```

## API Endpoints

### Health & Status
- `GET /api/health` - Server health check
- `GET /api/ping` - Simple ping endpoint

### Movies
- `GET /api/movies/search?search=query` - Search movies
- `GET /api/movies/trending` - Get trending movies
- `GET /api/movies/:id` - Get movie details

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)

### Rentals
- `GET /api/rentals` - Get user rentals (protected)
- `POST /api/rentals` - Create new rental (protected)
- `DELETE /api/rentals/:id` - Return rental (protected)

### Email
- `POST /api/sendMail` - Send email notification

## Security Features

- **Helmet**: Sets security HTTP headers
- **CORS**: Configured for specific origins
- **Rate Limiting**: 100 requests per 15 minutes
- **MongoDB Sanitization**: Prevents NoSQL injection
- **JWT Authentication**: Secure token-based auth
- **Input Validation**: Request data validation

## Scheduled Tasks

- **Daily at midnight**: Automatically delete expired rentals

## Technologies

- Express.js - Web framework
- MongoDB & Mongoose - Database
- JWT - Authentication
- bcryptjs - Password hashing
- Helmet - Security headers
- Morgan - HTTP logging
- Nodemailer - Email service
- node-cron - Task scheduling
- Axios - HTTP client for TMDB API

## Development

```bash
# Run with nodemon (auto-restart)
npm start
```

## License

ISC

## Author

MovieVault Team
