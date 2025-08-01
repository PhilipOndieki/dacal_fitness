import React from 'react';
import { Mountain, Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: 'Personal Training', href: '#services' },
      { name: 'Group Training', href: '#services' },
      { name: 'Guided Adventures', href: '#adventures' },
      { name: 'Wellness Programs', href: '#services' }
    ],
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Our Team', href: '#about' },
      { name: 'Blog', href: '#blog' },
      { name: 'Careers', href: '#' }
    ],
    support: [
      { name: 'Contact Us', href: '#contact' },
      { name: 'FAQ', href: '#' },
      { name: 'Safety Guidelines', href: '#' },
      { name: 'Booking Policy', href: '#' }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg flex items-center justify-center">
                <Mountain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Dacal</h3>
                <p className="text-sm text-gray-400 -mt-1">Fitness & Adventure</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Transforming lives through personalized fitness training, guided adventures, 
              and holistic wellness programs in the heart of nature.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2 text-gray-400">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail className="w-4 h-4" />
                <span>hello@dacalfitness.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>Mountain View, CA</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-pink-400 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-pink-400 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 mb-6">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-pink-400 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Newsletter Signup */}
            <div>
              <h5 className="font-semibold mb-2">Stay Updated</h5>
              <p className="text-sm text-gray-400 mb-3">Get adventure tips and special offers</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:border-pink-500 text-sm"
                />
                <button className="bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded-r-lg transition-colors duration-200">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-gray-400">
              © {currentYear} Dacal Fitness & Adventure. All rights reserved.
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">Follow us:</span>
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-pink-500 transition-colors duration-200"
                    aria-label={social.label}
                  >
                    <IconComponent className="w-4 h-4" />
                  </a>
                );
              })}
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-4 text-sm">
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                Privacy Policy
              </a>
              <span className="text-gray-600">•</span>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}