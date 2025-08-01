import React, { useState } from 'react';
import { Menu, X, Mountain, User, Calendar } from 'lucide-react';

interface HeaderProps {
  onAuthClick: () => void;
  isAuthenticated: boolean;
  onLogout: () => void;
}

export default function Header({ onAuthClick, isAuthenticated, onLogout }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Adventures', href: '#adventures' },
    { name: 'About', href: '#about' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg flex items-center justify-center">
              <Mountain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Dacal</h1>
              <p className="text-xs text-gray-600 -mt-1">Fitness & Adventure</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-pink-600 font-medium transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Auth & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="hidden md:flex items-center space-x-3">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-pink-600 transition-colors">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">My Bookings</span>
                </button>
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-2 text-gray-700 hover:text-pink-600 transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="hidden md:flex items-center space-x-2 bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors duration-200"
              >
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">Sign In</span>
              </button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-pink-600 font-medium py-2 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-3 border-t border-gray-200">
                {isAuthenticated ? (
                  <div className="flex flex-col space-y-3">
                    <button className="flex items-center space-x-2 text-gray-700 hover:text-pink-600 transition-colors py-2">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm font-medium">My Bookings</span>
                    </button>
                    <button
                      onClick={onLogout}
                      className="flex items-center space-x-2 text-gray-700 hover:text-pink-600 transition-colors py-2"
                    >
                      <User className="w-4 h-4" />
                      <span className="text-sm font-medium">Logout</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={onAuthClick}
                    className="flex items-center space-x-2 bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors duration-200 w-full justify-center"
                  >
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium">Sign In</span>
                  </button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}