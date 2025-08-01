import React from 'react';
import { Award, Users, Heart, Target, CheckCircle } from 'lucide-react';

export default function About() {
  const stats = [
    { number: '500+', label: 'Happy Clients', icon: Users },
    { number: '50+', label: 'Adventures Led', icon: Target },
    { number: '5', label: 'Years Experience', icon: Award },
    { number: '98%', label: 'Satisfaction Rate', icon: Heart }
  ];

  const values = [
    {
      title: 'Safety First',
      description: 'Every adventure is planned with safety as our top priority, using professional equipment and experienced guides.'
    },
    {
      title: 'Personal Growth',
      description: 'We believe in pushing boundaries while respecting individual limits to foster genuine personal development.'
    },
    {
      title: 'Environmental Respect',
      description: 'Our adventures promote Leave No Trace principles and environmental stewardship.'
    },
    {
      title: 'Community Building',
      description: 'We create lasting connections between adventurers who share a passion for fitness and exploration.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-pink-100 text-pink-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Heart className="w-4 h-4" />
            <span>About Dacal</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Your Adventure Begins Here
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Founded on the belief that everyone deserves to experience the transformative power of nature and fitness, 
            Dacal Fitness and Adventure has been guiding people toward their best selves since 2019.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Image */}
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/1552617/pexels-photo-1552617.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
              alt="Team adventure"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-lg">
              <div className="text-2xl font-bold text-pink-600">5★</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900">
              Transforming Lives Through Adventure
            </h3>
            <p className="text-gray-600 leading-relaxed">
              At Dacal Fitness and Adventure, we understand that true wellness comes from challenging yourself 
              in new environments. Our expert team combines years of fitness training experience with deep 
              knowledge of local trails and outdoor adventures.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Whether you're taking your first steps toward fitness or you're an experienced adventurer 
              looking for new challenges, we create personalized experiences that push your limits while 
              keeping you safe and supported every step of the way.
            </p>

            {/* Features */}
            <div className="space-y-3">
              {[
                'Certified personal trainers and adventure guides',
                'Customized programs for all fitness levels',
                'Small group sizes for personalized attention',
                'Comprehensive safety protocols and equipment'
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-pink-600 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="bg-white rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do, from planning adventures to training sessions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="flex space-x-4">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h4>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}