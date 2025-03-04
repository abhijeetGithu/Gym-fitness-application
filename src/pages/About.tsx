import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="bg-indigo-600 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">About FitHub</h1>
          <p className="text-xl">Transforming lives through innovative fitness solutions</p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Mission</h2>
          <p className="text-lg text-gray-700 mb-8">
            At FitHub, we believe that fitness is not just about physical transformation—it's about 
            empowering individuals to lead healthier, happier lives. Our AI-powered platform combines 
            cutting-edge technology with expert guidance to create personalized fitness experiences 
            that deliver real results.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose FitHub</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              title="Expert Trainers"
              description="Work with certified professionals who are passionate about helping you achieve your goals"
              icon="👨‍🏫"
            />
            <FeatureCard 
              title="Smart Technology"
              description="AI-powered workout plans that adapt to your progress and preferences"
              icon="🤖"
            />
            <FeatureCard 
              title="Flexible Schedule"
              description="Train on your terms with 24/7 access to workouts and support"
              icon="⏰"
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-indigo-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <StatCard number="10,000+" label="Active Members" />
            <StatCard number="500+" label="Expert Trainers" />
            <StatCard number="95%" label="Success Rate" />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Life?</h2>
          <p className="mb-8 text-xl">Join FitHub today and start your fitness journey</p>
          <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ title, description, icon }: { title: string; description: string; icon: string }) => (
  <div className="p-6 bg-gray-50 rounded-lg text-center">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

// Stat Card Component
const StatCard = ({ number, label }: { number: string; label: string }) => (
  <div className="p-6">
    <div className="text-4xl font-bold text-indigo-600 mb-2">{number}</div>
    <div className="text-gray-600">{label}</div>
  </div>
);

export default About;