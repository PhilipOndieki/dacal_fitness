-- Dacal Fitness & Adventure Database Schema

-- Create database
CREATE DATABASE IF NOT EXISTS dacal_fitness;
USE dacal_fitness;

-- Users table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role ENUM('user', 'admin', 'trainer', 'guide') DEFAULT 'user',
    is_verified BOOLEAN DEFAULT FALSE,
    verification_code VARCHAR(6),
    code_expiry DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    INDEX idx_email (email),
    INDEX idx_verification (verification_code),
    INDEX idx_role (role)
);

-- Services table
CREATE TABLE services (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    category ENUM('personal_training', 'group_training', 'adventure', 'wellness') NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    duration_minutes INT,
    max_participants INT DEFAULT 1,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_active (is_active)
);

-- Trainers/Guides table
CREATE TABLE staff (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    specialization VARCHAR(255),
    bio TEXT,
    certifications TEXT,
    experience_years INT DEFAULT 0,
    hourly_rate DECIMAL(10, 2),
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_available (is_available)
);

-- Adventures/Events table
CREATE TABLE adventures (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    location VARCHAR(255),
    difficulty_level ENUM('easy', 'beginner', 'intermediate', 'advanced') NOT NULL,
    duration_hours INT NOT NULL,
    max_participants INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    start_datetime DATETIME NOT NULL,
    end_datetime DATETIME NOT NULL,
    guide_id INT,
    requirements TEXT,
    included_items TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (guide_id) REFERENCES staff(id),
    INDEX idx_start_date (start_datetime),
    INDEX idx_difficulty (difficulty_level),
    INDEX idx_active (is_active)
);

-- Bookings table
CREATE TABLE bookings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    service_id INT,
    adventure_id INT,
    staff_id INT,
    booking_date DATETIME NOT NULL,
    duration_minutes INT,
    total_amount DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'confirmed', 'completed', 'cancelled') DEFAULT 'pending',
    payment_status ENUM('pending', 'paid', 'refunded') DEFAULT 'pending',
    payment_method VARCHAR(50),
    payment_reference VARCHAR(100),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES services(id),
    FOREIGN KEY (adventure_id) REFERENCES adventures(id),
    FOREIGN KEY (staff_id) REFERENCES staff(id),
    INDEX idx_user (user_id),
    INDEX idx_booking_date (booking_date),
    INDEX idx_status (status),
    INDEX idx_payment_status (payment_status),
    CHECK ((service_id IS NOT NULL AND adventure_id IS NULL) OR (service_id IS NULL AND adventure_id IS NOT NULL))
);

-- Contact form submissions
CREATE TABLE contact_submissions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    service VARCHAR(100),
    message TEXT NOT NULL,
    status ENUM('new', 'in_progress', 'resolved') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_created (created_at)
);

-- Newsletter subscribers
CREATE TABLE newsletter_subscribers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    unsubscribed_at TIMESTAMP NULL,
    INDEX idx_email (email),
    INDEX idx_active (is_active)
);

-- Blog posts
CREATE TABLE blog_posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT,
    content LONGTEXT NOT NULL,
    author_id INT,
    category VARCHAR(100),
    featured_image VARCHAR(500),
    is_published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id),
    INDEX idx_slug (slug),
    INDEX idx_published (is_published),
    INDEX idx_category (category),
    INDEX idx_published_date (published_at)
);

-- Testimonials
CREATE TABLE testimonials (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255),
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    testimonial TEXT NOT NULL,
    service_type VARCHAR(100),
    is_approved BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_approved (is_approved),
    INDEX idx_featured (is_featured),
    INDEX idx_rating (rating)
);

-- User sessions (for security tracking)
CREATE TABLE user_sessions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    session_token VARCHAR(255) NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_token (session_token),
    INDEX idx_user (user_id),
    INDEX idx_expires (expires_at)
);

-- Insert sample data

-- Sample services
INSERT INTO services (name, description, category, price, duration_minutes, max_participants) VALUES
('Personal Training Session', 'One-on-one fitness coaching tailored to your goals', 'personal_training', 75.00, 60, 1),
('Group Training Session', 'High-energy group fitness sessions', 'group_training', 35.00, 60, 8),
('Nutrition Consultation', 'Personalized nutrition planning and guidance', 'wellness', 60.00, 45, 1),
('Yoga Class', 'Mindful movement and flexibility training', 'wellness', 25.00, 75, 12);

-- Sample admin user (password: Admin123!)
INSERT INTO users (name, email, password, role, is_verified) VALUES
('Admin User', 'admin@dacalfitness.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj3bp.Vp/PpO', 'admin', TRUE);

-- Sample blog posts
INSERT INTO blog_posts (title, slug, excerpt, content, author_id, category, is_published, published_at) VALUES
('10 Essential Tips for Your First Mountain Hike', '10-essential-tips-first-mountain-hike', 'Preparing for your first mountain adventure? Here are the essential tips every beginner should know.', 'Full content here...', 1, 'Adventure', TRUE, NOW()),
('Building Strength: A Beginner\'s Guide', 'building-strength-beginners-guide', 'Start your strength training journey with confidence and proper form.', 'Full content here...', 1, 'Fitness', TRUE, NOW()),
('Mindful Movement: Integrating Wellness', 'mindful-movement-integrating-wellness', 'Discover how to incorporate mindfulness into your daily routine.', 'Full content here...', 1, 'Wellness', TRUE, NOW());