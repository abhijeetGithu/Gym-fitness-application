import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Dumbbell, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Dumbbell className="h-8 w-8" />
            <span className="font-bold text-xl">FitHub</span>
          </Link>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-indigo-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4">
            <Link to="/" className="hover:text-indigo-200">Home</Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="hover:text-indigo-200">Dashboard</Link>
                <Link to="/expert-training" className="hover:text-indigo-200">Expert Training</Link>
                <Link to="/slots" className="hover:text-indigo-200">Flexible Slots</Link>
                <Link to="/chatbot" className="hover:text-indigo-200">AI Assistant</Link>
                <Link to="/diet" className="hover:text-indigo-200">Diet Plans</Link>
                <Link to="/exercises" className="hover:text-indigo-200">Exercises</Link>
                <button
                  onClick={logout}
                  className="hover:text-indigo-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-indigo-200">Login</Link>
                <Link to="/register" className="hover:text-indigo-200">Register</Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link to="/" className="block hover:text-indigo-200 py-2">Home</Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="block hover:text-indigo-200 py-2">Dashboard</Link>
                <Link to="/expert-training" className="block hover:text-indigo-200 py-2">Expert Training</Link>
                <Link to="/slots" className="block hover:text-indigo-200 py-2">Flexible Slots</Link>
                <Link to="/chatbot" className="block hover:text-indigo-200 py-2">AI Assistant</Link>
                <Link to="/diet" className="block hover:text-indigo-200 py-2">Diet Plans</Link>
                <Link to="/exercises" className="block hover:text-indigo-200 py-2">Exercises</Link>
                <button
                  onClick={logout}
                  className="block w-full text-left hover:text-indigo-200 py-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block hover:text-indigo-200 py-2">Login</Link>
                <Link to="/register" className="block hover:text-indigo-200 py-2">Register</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;