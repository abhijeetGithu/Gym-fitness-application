import React from 'react';
import { DumbbellIcon, HeartPulse, Scale, Timer, Home, LayoutDashboard, Dumbbell, Calendar, Bot, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

const exercises = [
  {
    category: 'Strength Training',
    icon: DumbbellIcon,
    exercises: [
      {
        name: 'Bench Press',
        description: 'Lie on a flat bench and press the barbell upward',
        sets: '3-4',
        reps: '8-12'
      },
      {
        name: 'Squats',
        description: 'Stand with feet shoulder-width apart and lower your body',
        sets: '3-4',
        reps: '8-12'
      },
      {
        name: 'Deadlift',
        description: 'Lift a barbell from the ground while keeping your back straight',
        sets: '3-4',
        reps: '6-10'
      },
      {
        name: 'Pull-ups',
        description: 'Hang from a bar and pull your body up until your chin is over the bar',
        sets: '3',
        reps: '8-12'
      },
      {
        name: 'Shoulder Press',
        description: 'Press dumbbells or a barbell overhead from shoulder height',
        sets: '3-4',
        reps: '8-12'
      },
      {
        name: 'Dumbbell Rows',
        description: 'Bend over and row dumbbells to work your back muscles',
        sets: '3',
        reps: '10-15'
      }
    ]
  },
  {
    category: 'Cardio',
    icon: HeartPulse,
    exercises: [
      {
        name: 'Treadmill',
        description: 'Start with a brisk walk, then increase to running',
        duration: '20-30 mins',
        intensity: 'Moderate to High'
      },
      {
        name: 'Cycling',
        description: 'Indoor cycling or stationary bike workout',
        duration: '25-45 mins',
        intensity: 'Moderate to High'
      },
      {
        name: 'Jump Rope',
        description: 'High-intensity cardio using a jump rope',
        duration: '10-20 mins',
        intensity: 'High'
      },
      {
        name: 'Elliptical',
        description: 'Low-impact full-body cardio workout',
        duration: '20-40 mins',
        intensity: 'Moderate'
      },
      {
        name: 'HIIT',
        description: 'High-intensity interval training with alternating work and rest periods',
        duration: '15-25 mins',
        intensity: 'Very High'
      },
      {
        name: 'Swimming',
        description: 'Full-body workout that builds endurance and muscle while being easy on joints',
        duration: '30-45 mins',
        intensity: 'Moderate to High'
      }
    ]
  }
];

const Footer = () => {
  return (
    <footer className="bg-indigo-600 text-white mt-12 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-indigo-200 flex items-center gap-2"><Home size={16} /> Home</Link></li>
              <li><Link to="/dashboard" className="hover:text-indigo-200 flex items-center gap-2"><LayoutDashboard size={16} /> Dashboard</Link></li>
              <li><Link to="/expert-training" className="hover:text-indigo-200 flex items-center gap-2"><Dumbbell size={16} /> Expert Training</Link></li>
              <li><Link to="/flexible-slots" className="hover:text-indigo-200 flex items-center gap-2"><Calendar size={16} /> Flexible Slots</Link></li>
              <li><Link to="/ai-assistant" className="hover:text-indigo-200 flex items-center gap-2"><Bot size={16} /> AI Assistant</Link></li>
            </ul>
          </div>
          
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>Email: info@fithub.com</li>
              <li>Phone: (555) 123-4567</li>
              <li>Address: 123 Fitness Street</li>
            </ul>
          </div>
          
          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-indigo-200">Facebook</a></li>
              <li><a href="#" className="hover:text-indigo-200">Instagram</a></li>
              <li><a href="#" className="hover:text-indigo-200">Twitter</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-indigo-500 mt-8 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} FitHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

const Exercises = () => {
  return (
    <div>
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Exercise Guide</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {exercises.map((category) => (
            <div key={category.category} className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <category.icon className="w-6 h-6 text-indigo-600 mr-2" />
                <h2 className="text-xl font-semibold">{category.category}</h2>
              </div>
              
              <div className="space-y-4">
                {category.exercises.map((exercise) => (
                  <div key={exercise.name} className="border-t pt-4">
                    <h3 className="font-semibold mb-2">{exercise.name}</h3>
                    <p className="text-gray-600 mb-2">{exercise.description}</p>
                    <div className="flex space-x-4 text-sm text-gray-500">
                      {'sets' in exercise && (
                        <>
                          <span>Sets: {exercise.sets}</span>
                          <span>Reps: {exercise.reps}</span>
                        </>
                      )}
                      {'duration' in exercise && (
                        <>
                          <span>Duration: {exercise.duration}</span>
                          <span>Intensity: {exercise.intensity}</span>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Exercises;