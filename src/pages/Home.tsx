import React from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, Clock, Brain, Utensils, Users, Award, Target, Sparkles, Home as HomeIcon, LayoutDashboard, Calendar, Bot } from 'lucide-react';

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="relative h-[600px] rounded-3xl overflow-hidden mb-16">
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
          alt="Gym"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        <div className="relative h-full flex flex-col justify-center px-8 sm:px-16">
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
            Transform Your Life<br />
            <span className="text-indigo-400">One Rep at a Time</span>
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl">
            Join FitHub and experience a revolutionary approach to fitness.
            Expert trainers, flexible schedules, and AI-powered guidance to help you
            achieve your fitness goals.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/register"
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Start Your Journey
            </Link>
            <Link
              to="/about"
              className="bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 px-4">
        <FeatureCard
          icon={<Dumbbell className="w-8 h-8" />}
          title="Expert Training"
          description="Get personalized workout plans from certified trainers with years of experience"
          gradient="from-purple-500 to-indigo-600"
        />
        <FeatureCard
          icon={<Clock className="w-8 h-8" />}
          title="Flexible Slots"
          description="Choose from multiple time slots that perfectly fit your busy schedule"
          gradient="from-blue-500 to-cyan-600"
        />
        <FeatureCard
          icon={<Brain className="w-8 h-8" />}
          title="AI Assistant"
          description="24/7 access to our AI-powered fitness assistant for instant guidance"
          gradient="from-emerald-500 to-teal-600"
        />
        <FeatureCard
          icon={<Utensils className="w-8 h-8" />}
          title="Diet Plans"
          description="Customized nutrition advice to complement your fitness journey"
          gradient="from-orange-500 to-red-600"
        />
      </div>
      <div className="bg-white rounded-3xl p-8 mb-16 shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose FitHub?</h2>
        <div className="grid md:grid-cols-4 gap-8">
          <StatCard
            icon={<Users className="w-6 h-6" />}
            number="5000+"
            label="Active Members"
          />
          <StatCard
            icon={<Award className="w-6 h-6" />}
            number="50+"
            label="Expert Trainers"
          />
          <StatCard
            icon={<Target className="w-6 h-6" />}
            number="98%"
            label="Success Rate"
          />
          <StatCard
            icon={<Sparkles className="w-6 h-6" />}
            number="100+"
            label="Success Stories"
          />
        </div>
      </div>
      {/* Testimonials */}
      <div className="px-4 mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <TestimonialCard
            image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
            name="Sarah Johnson"
            role="Member since 2023"
            quote="FitHub transformed my approach to fitness. The trainers are exceptional, and the AI assistant keeps me motivated!"
          />
          <TestimonialCard
            image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
            name="Michael Chen"
            role="Member since 2022"
            quote="The flexible scheduling and personalized workout plans make it easy to stay consistent with my fitness goals."
          />
          <TestimonialCard
            image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
            name="Emma Davis"
            role="Member since 2023"
            quote="The nutrition guidance and workout variety helped me achieve results I never thought possible."
          />
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

const FeatureCard = ({ icon, title, description, gradient }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}) => (
  <div className={`bg-gradient-to-br ${gradient} p-8 rounded-2xl text-white hover:scale-105 transition-transform duration-300`}>
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-white/90">{description}</p>
  </div>
);

const StatCard = ({ icon, number, label }: {
  icon: React.ReactNode;
  number: string;
  label: string;
}) => (
  <div className="text-center">
    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 mb-4">
      {icon}
    </div>
    <div className="text-3xl font-bold text-gray-900 mb-1">{number}</div>
    <div className="text-gray-600">{label}</div>
  </div>
);

const TestimonialCard = ({ image, name, role, quote }: {
  image: string;
  name: string;
  role: string;
  quote: string;
}) => (
  <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow">
    <div className="flex items-center mb-4">
      <img
        src={image}
        alt={name}
        className="w-12 h-12 rounded-full object-cover mr-4"
      />
      <div>
        <div className="font-semibold">{name}</div>
        <div className="text-sm text-gray-600">{role}</div>
      </div>
    </div>
    <p className="text-gray-700 italic">&ldquo;{quote}&rdquo;</p>
  </div>
);

const Footer = () => {
  return (
    <footer className="bg-indigo-600 text-white mt-12 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-indigo-200 flex items-center gap-2"><HomeIcon size={16} /> Home</Link></li>
              <li><Link to="/dashboard" className="hover:text-indigo-200 flex items-center gap-2"><LayoutDashboard size={16} /> Dashboard</Link></li>
              <li><Link to="/expert-training" className="hover:text-indigo-200 flex items-center gap-2"><Dumbbell size={16} /> Expert Training</Link></li>
              <li><Link to="/slots" className="hover:text-indigo-200 flex items-center gap-2"><Calendar size={16} /> Flexible Slots</Link></li>
              <li><Link to="/chatbot" className="hover:text-indigo-200 flex items-center gap-2"><Bot size={16} /> AI Assistant</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>Email: info@fithub.com</li>
              <li>Phone: (555) 123-4567</li>
              <li>Address: 123 Fitness Street</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-indigo-200">Facebook</a></li>
              <li><a href="#" className="hover:text-indigo-200">Instagram</a></li>
              <li><a href="#" className="hover:text-indigo-200">Twitter</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Home;
