import React from 'react';
import { Dumbbell, Mountain, Heart, Users, Clock, Award } from 'lucide-react';

interface ServicesProps {
  onBookService: (service: string) => void;
}

export default function Services({ onBookService }: ServicesProps) {
  const services = [
    {
      id: 'personal-training',
      icon: Dumbbell,
      title: 'Personal Training',
      description: 'One-on-one fitness coaching tailored to your goals and fitness level.',
      features: ['Customized workout plans', 'Nutrition guidance', 'Progress tracking', 'Flexible scheduling'],
      price: 'From $75/session',
      image: 'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
    },
    {
      id: 'group-training',
      icon: Users,
      title: 'Group Training',
      description: 'High-energy group sessions that build community while achieving fitness goals.',
      features: ['Small group sizes', 'Motivating environment', 'Cost-effective', 'Social connections'],
      price: 'From $35/session',
      image: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
    },
    {
      id: 'guided-hikes',
      icon: Mountain,
      title: 'Guided Adventures',
      description: 'Explore breathtaking trails with experienced guides who know the best routes.',
      features: ['Expert local guides', 'Safety equipment provided', 'All skill levels', 'Photography included'],
      price: 'From $45/person',
      image: 'https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
    },
    {
      id: 'wellness',
      icon: Heart,
      title: 'Wellness Programs',
      description: 'Holistic approach to health including yoga, meditation, and nutrition coaching.',
      features: ['Stress management', 'Mindfulness training', 'Nutritional counseling', 'Recovery sessions'],
      price: 'From $60/session',
      image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-pink-100 text-pink-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Award className="w-4 h-4" />
            <span>Our Services</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Fitness & Adventure Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you're looking to build strength, explore nature, or find inner peace, 
            we have the perfect program to help you achieve your goals.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <span className="bg-white/90 backdrop-blur-sm text-pink-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {service.price}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    onClick={() => onBookService(service.id)}
                    className="w-full bg-pink-500 text-white py-3 rounded-lg font-semibold hover:bg-pink-600 transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <Clock className="w-4 h-4" />
                    <span>Book Now</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Not sure which service is right for you?</p>
          <button className="bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200">
            Schedule Free Consultation
          </button>
        </div>
      </div>
    </section>
  );
}