import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: '+1 (555) 123-4567',
      subtitle: 'Mon-Fri 8AM-6PM'
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'hello@dacalfitness.com',
      subtitle: 'We reply within 24 hours'
    },
    {
      icon: MapPin,
      title: 'Location',
      details: 'Mountain View, CA',
      subtitle: 'Serving Bay Area trails'
    },
    {
      icon: Clock,
      title: 'Hours',
      details: 'Mon-Sun 6AM-8PM',
      subtitle: 'Flexible scheduling available'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-pink-100 text-pink-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Mail className="w-4 h-4" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about our services or ready to book your first session? 
            We'd love to hear from you and help you begin your fitness and adventure journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h3>
            
            {isSubmitted && (
              <div className="mb-6 p-4 bg-pink-50 border border-pink-200 rounded-lg flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-pink-600" />
                <span className="text-pink-800">Thank you! We'll get back to you soon.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                    Service Interest
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                  >
                    <option value="">Select a service</option>
                    <option value="personal-training">Personal Training</option>
                    <option value="group-training">Group Training</option>
                    <option value="guided-hikes">Guided Adventures</option>
                    <option value="wellness">Wellness Programs</option>
                    <option value="consultation">Free Consultation</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors resize-none"
                  placeholder="Tell us about your fitness goals, experience level, or any questions you have..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-pink-500 text-white py-4 rounded-lg font-semibold hover:bg-pink-600 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in touch</h3>
              <p className="text-gray-600 mb-8">
                We're here to help you every step of the way. Whether you have questions about our services, 
                need help choosing the right program, or want to schedule a consultation, don't hesitate to reach out.
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="grid gap-6">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <div key={index} className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl">
                    <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{info.title}</h4>
                      <p className="text-gray-900 font-medium">{info.details}</p>
                      <p className="text-sm text-gray-600">{info.subtitle}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Map Placeholder */}
            <div className="bg-gray-200 rounded-xl h-64 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Interactive map coming soon</p>
                <p className="text-sm text-gray-500">Serving the greater Bay Area</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}