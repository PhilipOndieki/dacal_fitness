import React from 'react';
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Marketing Executive',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5,
      text: "Dacal transformed my relationship with fitness. The personal training sessions are incredibly effective, and the guided hikes have shown me places I never knew existed. The team's expertise and genuine care make all the difference.",
      service: 'Personal Training & Adventures'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Software Developer',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5,
      text: "As someone who spent years behind a desk, I was intimidated by outdoor adventures. The Dacal team made me feel comfortable from day one. Now I look forward to every weekend hike and have never been in better shape.",
      service: 'Group Training & Wellness'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Teacher',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5,
      text: "The wellness programs at Dacal go beyond just physical fitness. The mindfulness and nutrition coaching have helped me find balance in my busy life. I feel stronger, more confident, and genuinely happier.",
      service: 'Wellness Programs'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-pink-50 to-rose-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-pink-100 text-pink-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Star className="w-4 h-4" />
            <span>Client Stories</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Adventurers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our community of adventurers 
            and fitness enthusiasts have to say about their transformative experiences.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                <Quote className="w-4 h-4 text-pink-600" />
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 leading-relaxed mb-6">
                "{testimonial.text}"
              </p>

              {/* Service Badge */}
              <div className="mb-6">
                <span className="inline-block bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-xs font-medium">
                  {testimonial.service}
                </span>
              </div>

              {/* Author */}
              <div className="flex items-center space-x-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Ready to start your own transformation story?
          </p>
          <button className="bg-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-pink-600 transition-colors duration-200">
            Begin Your Journey
          </button>
        </div>
      </div>
    </section>
  );
}