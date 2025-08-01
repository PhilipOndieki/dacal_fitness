import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Adventures from './components/Adventures';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ email: string; name?: string } | null>(null);

  const handleLogin = (email: string, password: string) => {
    // Simulate login - in real app, this would make an API call
    console.log('Login attempt:', { email, password });
    setIsAuthenticated(true);
    setUser({ email, name: email.split('@')[0] });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const handleBookService = (serviceId: string) => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
    } else {
      // Handle booking logic
      console.log('Booking service:', serviceId);
      alert(`Booking ${serviceId}! This would redirect to booking page.`);
    }
  };

  const handleBookAdventure = (adventureId: string) => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
    } else {
      // Handle adventure booking logic
      console.log('Booking adventure:', adventureId);
      alert(`Booking ${adventureId}! This would redirect to booking page.`);
    }
  };

  const handleBookNow = () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
    } else {
      // Scroll to services or open booking modal
      document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header 
        onAuthClick={() => setIsAuthModalOpen(true)}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      />
      
      <main>
        <Hero onBookNow={handleBookNow} />
        <Services onBookService={handleBookService} />
        <Adventures onBookAdventure={handleBookAdventure} />
        <About />
        <Testimonials />
        <Blog />
        <Contact />
      </main>
      
      <Footer />
      
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  );
}

export default App;