import React from 'react';
import { Calendar, MapPin, Users, Clock, Diff as Difficulty, Camera } from 'lucide-react';

interface AdventuresProps {
  onBookAdventure: (adventure: string) => void;
}

export default function Adventures({ onBookAdventure }: AdventuresProps) {
  const upcomingAdventures = [
    {
      id: 'sunrise-peak',
      title: 'Sunrise Peak Challenge',
      date: 'March 15, 2024',
      time: '5:00 AM - 12:00 PM',
      location: 'Mount Wilson Trail',
      difficulty: 'Intermediate',
      duration: '7 hours',
      maxParticipants: 8,
      currentBookings: 5,
      price: '$85',
      image: 'https://images.pexels.com/photos/1624438/pexels-photo-1624438.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      description: 'Experience the magic of sunrise from one of the most spectacular viewpoints in the region.',
      highlights: ['Sunrise photography', 'Wildlife spotting', 'Professional guide', 'Light breakfast included']
    },
    {
      id: 'waterfall-trek',
      title: 'Hidden Waterfall Trek',
      date: 'March 22, 2024',
      time: '8:00 AM - 4:00 PM',
      location: 'Crystal Falls Trail',
      difficulty: 'Beginner',
      duration: '8 hours',
      maxParticipants: 12,
      currentBookings: 3,
      price: '$65',
      image: 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      description: 'Discover a hidden gem with cascading waterfalls and pristine natural pools.',
      highlights: ['Swimming opportunity', 'Picnic lunch', 'Nature photography', 'Easy trail access']
    },
    {
      id: 'night-hike',
      title: 'Stargazing Night Hike',
      date: 'March 29, 2024',
      time: '7:00 PM - 11:00 PM',
      location: 'Observatory Ridge',
      difficulty: 'Easy',
      duration: '4 hours',
      maxParticipants: 10,
      currentBookings: 7,
      price: '$55',
      image: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      description: 'A magical evening under the stars with telescope viewing and constellation guidance.',
      highlights: ['Telescope provided', 'Hot cocoa', 'Astronomy guide', 'Headlamps included']
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'beginner': return 'bg-blue-100 text-blue-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section id="adventures" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Camera className="w-4 h-4" />
            <span>Upcoming Adventures</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Explore Nature's Wonders
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our expertly guided adventures and discover breathtaking landscapes, 
            hidden gems, and unforgettable experiences in nature.
          </p>
        </div>

        {/* Adventures Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {upcomingAdventures.map((adventure) => (
            <div
              key={adventure.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={adventure.image}
                  alt={adventure.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                {/* Difficulty Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(adventure.difficulty)}`}>
                    {adventure.difficulty}
                  </span>
                </div>

                {/* Price */}
                <div className="absolute top-4 right-4">
                  <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {adventure.price}
                  </span>
                </div>

                {/* Availability */}
                <div className="absolute bottom-4 left-4">
                  <div className="flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <Users className="w-3 h-3 text-gray-600" />
                    <span className="text-xs text-gray-700">
                      {adventure.currentBookings}/{adventure.maxParticipants} spots
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{adventure.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{adventure.description}</p>

                {/* Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 text-emerald-600" />
                    <span>{adventure.date}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    <span>{adventure.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    <span>{adventure.location}</span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">What's Included:</h4>
                  <ul className="space-y-1">
                    {adventure.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-center space-x-2 text-xs text-gray-600">
                        <div className="w-1 h-1 bg-emerald-500 rounded-full"></div>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <button
                  onClick={() => onBookAdventure(adventure.id)}
                  className={`w-full py-3 rounded-lg font-semibold transition-colors duration-200 ${
                    adventure.currentBookings >= adventure.maxParticipants
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700'
                  }`}
                  disabled={adventure.currentBookings >= adventure.maxParticipants}
                >
                  {adventure.currentBookings >= adventure.maxParticipants ? 'Fully Booked' : 'Reserve Your Spot'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Don't See What You're Looking For?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            We offer custom adventures tailored to your group's interests and skill level. 
            From corporate team building to family-friendly excursions, we can create the perfect experience.
          </p>
          <button className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors duration-200">
            Plan Custom Adventure
          </button>
        </div>
      </div>
    </section>
  );
}