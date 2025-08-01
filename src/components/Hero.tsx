import React from 'react';
import { ArrowRight, Play, Star } from 'lucide-react';

interface HeroProps {
  onBookNow: () => void;
}

export default function Hero({ onBookNow }: HeroProps) {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
          alt="Mountain adventure"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center lg:text-left">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-pink-500/20 backdrop-blur-sm border border-pink-400/30 rounded-full px-4 py-2">
              <Star className="w-4 h-4 text-pink-300 fill-current" />
              <span className="text-pink-100 text-sm font-medium">Rated #1 Adventure Company</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Transform Your
                <span className="block text-pink-300">Adventure Journey</span>
              </h1>
              <p className="text-xl text-gray-200 max-w-2xl">
                Discover your potential through personalized fitness training, guided mountain adventures, 
                and holistic wellness programs designed to elevate your mind, body, and spirit.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onBookNow}
                className="group inline-flex items-center justify-center space-x-2 bg-pink-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <span>Book Your Adventure</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="group inline-flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-all duration-200 border border-white/20">
                <Play className="w-5 h-5" />
                <span>Watch Our Story</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-white">500+</div>
                <div className="text-gray-300 text-sm">Happy Clients</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="text-gray-300 text-sm">Adventures Led</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-white">5★</div>
                <div className="text-gray-300 text-sm">Average Rating</div>
              </div>
            </div>
          </div>

          {/* Right side - could be used for additional content or kept minimal */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-600/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}