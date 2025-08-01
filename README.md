# Dacal Fitness & Adventure Website

A comprehensive fitness and adventure booking platform built with React.js frontend and Node.js/MySQL backend.

## Features

- **User Authentication**: Secure registration with email verification, login/logout
- **Service Booking**: Personal training, group sessions, guided adventures, wellness programs
- **Adventure Calendar**: Upcoming hikes and outdoor activities with difficulty levels
- **Blog System**: Latest articles on fitness, adventure, and wellness
- **Contact System**: Contact forms with admin notifications
- **Newsletter**: Email subscription system
- **Responsive Design**: Mobile-first design with pink/rose color theme

## Tech Stack

### Frontend
- React.js with TypeScript
- Tailwind CSS for styling
- Lucide React for icons
- Vite for development and building

### Backend
- Node.js with Express
- MySQL database
- JWT authentication
- Bcrypt for password hashing
- Nodemailer for email services
- Express-validator for input validation
- Helmet for security headers
- Rate limiting for API protection

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MySQL (v8.0 or higher)
- Gmail account for email services

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dacal-fitness
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up MySQL database**
   ```bash
   # Create database and tables
   mysql -u root -p < server/database/schema.sql
   ```

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=dacal_fitness
   JWT_SECRET=your_super_secret_jwt_key
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_gmail_app_password
   ADMIN_EMAIL=admin@dacalfitness.com
   PORT=5000
   ```

5. **Start the development servers**
   
   Frontend (Terminal 1):
   ```bash
   npm run dev
   ```
   
   Backend (Terminal 2):
   ```bash
   npm run server
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/verify-email` - Email verification
- `POST /api/auth/resend-code` - Resend verification code
- `POST /api/auth/login` - User login

### User Management
- `GET /api/user/profile` - Get user profile (protected)
- `PUT /api/user/profile` - Update user profile (protected)

### Contact & Newsletter
- `POST /api/contact` - Submit contact form
- `POST /api/newsletter/subscribe` - Newsletter subscription

### Health Check
- `GET /api/health` - API health status

## Database Schema

The application uses the following main tables:
- `users` - User accounts and authentication
- `services` - Available fitness and wellness services
- `staff` - Trainers and guides information
- `adventures` - Scheduled outdoor activities
- `bookings` - Service and adventure reservations
- `contact_submissions` - Contact form submissions
- `newsletter_subscribers` - Email subscribers
- `blog_posts` - Blog content management
- `testimonials` - Client reviews and ratings

## Security Features

- Password hashing with bcrypt (12 rounds)
- JWT token authentication
- Rate limiting on authentication endpoints
- Input validation and sanitization
- SQL injection prevention
- CORS protection
- Security headers with Helmet
- Email verification for new accounts

## Email Configuration

The application uses Gmail for sending emails. You need to:
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password for the application
3. Use the App Password in the `EMAIL_PASS` environment variable

## Development

### Available Scripts
- `npm run dev` - Start frontend development server
- `npm run server` - Start backend server
- `npm run dev:server` - Start backend with nodemon (auto-restart)
- `npm run build` - Build frontend for production
- `npm run preview` - Preview production build

### Project Structure
```
├── src/
│   ├── components/     # React components
│   ├── App.tsx        # Main application component
│   └── main.tsx       # Application entry point
├── server/
│   ├── app.js         # Express server
│   └── database/
│       └── schema.sql # Database schema
├── public/            # Static assets
└── package.json       # Dependencies and scripts
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
