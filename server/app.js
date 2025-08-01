const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many authentication attempts, please try again later.'
});

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/auth', authLimiter);
app.use('/api', generalLimiter);

// Database connection
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'dacal_fitness',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

// Email transporter
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Generate verification code
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send verification email
const sendVerificationEmail = async (email, code) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Dacal Fitness - Email Verification',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #ec4899, #f472b6); padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Dacal Fitness & Adventure</h1>
        </div>
        <div style="padding: 30px; background: #fff;">
          <h2 style="color: #ec4899;">Verify Your Email Address</h2>
          <p>Thank you for joining Dacal Fitness & Adventure! Please use the verification code below to complete your registration:</p>
          <div style="background: #fdf2f8; border: 2px solid #ec4899; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
            <h1 style="color: #ec4899; font-size: 32px; margin: 0; letter-spacing: 5px;">${code}</h1>
          </div>
          <p>This code will expire in 10 minutes for security purposes.</p>
          <p>If you didn't create an account with us, please ignore this email.</p>
        </div>
        <div style="background: #f9fafb; padding: 20px; text-align: center; color: #6b7280;">
          <p>© 2024 Dacal Fitness & Adventure. All rights reserved.</p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
};

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Dacal Fitness API is running' });
});

// User registration
app.post('/api/auth/register', [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain uppercase, lowercase, number and special character')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    // Check if user already exists
    const [existingUsers] = await pool.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Generate verification code
    const verificationCode = generateVerificationCode();
    const codeExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Insert user into database
    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password, verification_code, code_expiry, is_verified) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, hashedPassword, verificationCode, codeExpiry, false]
    );

    // Send verification email
    const emailSent = await sendVerificationEmail(email, verificationCode);

    if (!emailSent) {
      // If email fails, still return success but log the error
      console.error('Failed to send verification email to:', email);
    }

    res.status(201).json({
      message: 'User registered successfully. Please check your email for verification code.',
      userId: result.insertId,
      emailSent
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Email verification
app.post('/api/auth/verify-email', [
  body('email').isEmail().normalizeEmail(),
  body('code').isLength({ min: 6, max: 6 }).isNumeric()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, code } = req.body;

    const [users] = await pool.execute(
      'SELECT id, verification_code, code_expiry, is_verified FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = users[0];

    if (user.is_verified) {
      return res.status(400).json({ message: 'Email already verified' });
    }

    if (new Date() > new Date(user.code_expiry)) {
      return res.status(400).json({ message: 'Verification code expired' });
    }

    if (user.verification_code !== code) {
      return res.status(400).json({ message: 'Invalid verification code' });
    }

    // Update user as verified
    await pool.execute(
      'UPDATE users SET is_verified = true, verification_code = NULL, code_expiry = NULL WHERE id = ?',
      [user.id]
    );

    res.json({ message: 'Email verified successfully' });

  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Resend verification code
app.post('/api/auth/resend-code', [
  body('email').isEmail().normalizeEmail()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    const [users] = await pool.execute(
      'SELECT id, is_verified FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (users[0].is_verified) {
      return res.status(400).json({ message: 'Email already verified' });
    }

    // Generate new verification code
    const verificationCode = generateVerificationCode();
    const codeExpiry = new Date(Date.now() + 10 * 60 * 1000);

    await pool.execute(
      'UPDATE users SET verification_code = ?, code_expiry = ? WHERE email = ?',
      [verificationCode, codeExpiry, email]
    );

    const emailSent = await sendVerificationEmail(email, verificationCode);

    res.json({
      message: 'Verification code sent successfully',
      emailSent
    });

  } catch (error) {
    console.error('Resend code error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// User login
app.post('/api/auth/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const [users] = await pool.execute(
      'SELECT id, name, email, password, is_verified, role FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = users[0];

    if (!user.is_verified) {
      return res.status(401).json({ message: 'Please verify your email before logging in' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '24h' }
    );

    // Update last login
    await pool.execute(
      'UPDATE users SET last_login = NOW() WHERE id = ?',
      [user.id]
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get user profile
app.get('/api/user/profile', authenticateToken, async (req, res) => {
  try {
    const [users] = await pool.execute(
      'SELECT id, name, email, phone, created_at, last_login FROM users WHERE id = ?',
      [req.user.userId]
    );

    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user: users[0] });

  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update user profile
app.put('/api/user/profile', authenticateToken, [
  body('name').optional().trim().isLength({ min: 2 }),
  body('phone').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, phone } = req.body;
    const updates = [];
    const values = [];

    if (name) {
      updates.push('name = ?');
      values.push(name);
    }

    if (phone) {
      updates.push('phone = ?');
      values.push(phone);
    }

    if (updates.length === 0) {
      return res.status(400).json({ message: 'No valid fields to update' });
    }

    values.push(req.user.userId);

    await pool.execute(
      `UPDATE users SET ${updates.join(', ')}, updated_at = NOW() WHERE id = ?`,
      values
    );

    res.json({ message: 'Profile updated successfully' });

  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Contact form submission
app.post('/api/contact', [
  body('name').trim().isLength({ min: 2 }),
  body('email').isEmail().normalizeEmail(),
  body('message').trim().isLength({ min: 10 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, service, message } = req.body;

    // Insert contact form submission
    await pool.execute(
      'INSERT INTO contact_submissions (name, email, phone, service, message) VALUES (?, ?, ?, ?, ?)',
      [name, email, phone || null, service || null, message]
    );

    // Send notification email to admin (optional)
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: 'New Contact Form Submission - Dacal Fitness',
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Service Interest:</strong> ${service || 'Not specified'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };

    try {
      await transporter.sendMail(adminMailOptions);
    } catch (emailError) {
      console.error('Failed to send admin notification:', emailError);
    }

    res.json({ message: 'Contact form submitted successfully' });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Newsletter subscription
app.post('/api/newsletter/subscribe', [
  body('email').isEmail().normalizeEmail()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    // Check if already subscribed
    const [existing] = await pool.execute(
      'SELECT id FROM newsletter_subscribers WHERE email = ?',
      [email]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: 'Email already subscribed' });
    }

    await pool.execute(
      'INSERT INTO newsletter_subscribers (email) VALUES (?)',
      [email]
    );

    res.json({ message: 'Successfully subscribed to newsletter' });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Dacal Fitness API server running on port ${PORT}`);
});

module.exports = app;