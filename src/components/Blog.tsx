import React from 'react';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';

export default function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: '10 Essential Tips for Your First Mountain Hike',
      excerpt: 'Preparing for your first mountain adventure? Here are the essential tips every beginner should know to ensure a safe and enjoyable experience.',
      image: 'https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      category: 'Adventure',
      date: 'March 10, 2024',
      readTime: '5 min read',
      author: 'Sarah Johnson'
    },
    {
      id: 2,
      title: 'Building Strength: A Beginner\'s Guide to Weight Training',
      excerpt: 'Start your strength training journey with confidence. Learn proper form, essential exercises, and how to create an effective workout routine.',
      image: 'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      category: 'Fitness',
      date: 'March 8, 2024',
      readTime: '7 min read',
      author: 'Mike Chen'
    },
    {
      id: 3,
      title: 'Mindful Movement: Integrating Wellness into Daily Life',
      excerpt: 'Discover how to incorporate mindfulness and movement into your busy schedule for better physical and mental health.',
      image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      category: 'Wellness',
      date: 'March 5, 2024',
      readTime: '4 min read',
      author: 'Emily Rodriguez'
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'adventure': return 'bg-emerald-100 text-emerald-800';
      case 'fitness': return 'bg-blue-100 text-blue-800';
      case 'wellness': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section id="blog" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Tag className="w-4 h-4" />
            <span>Latest Insights</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Adventure & Fitness Blog
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert tips, inspiring stories, and practical advice to help you on your fitness 
            and adventure journey. Stay informed and motivated with our latest content.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(post.category)}`}>
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta Info */}
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Author & Read More */}
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    By {post.author}
                  </div>
                  <button className="group/btn flex items-center space-x-1 text-emerald-600 hover:text-emerald-700 font-medium text-sm">
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-gray-600 mb-6">
            Want to stay updated with our latest tips and adventures?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 w-full sm:w-auto"
            />
            <button className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors duration-200 w-full sm:w-auto">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}