import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Slots from './pages/Slots';
import Exercises from './pages/Exercises';
import Diet from './pages/Diet';
import Chatbot from './pages/Chatbot';
import ExpertTraining from './pages/ExpertTraining';
import About from './pages/About';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import BookTrainingSession from './components/BookTrainingSession';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/slots"
                element={
                  <PrivateRoute>
                    <Slots />
                  </PrivateRoute>
                }
              />
              <Route
                path="/exercises"
                element={
                  <PrivateRoute>
                    <Exercises />
                  </PrivateRoute>
                }
              />
              <Route
                path="/diet"
                element={
                  <PrivateRoute>
                    <Diet />
                  </PrivateRoute>
                }
              />
              <Route
                path="/chatbot"
                element={
                  <PrivateRoute>
                    <Chatbot />
                  </PrivateRoute>
                }
              />
              <Route
                path="/expert-training"
                element={
                  <PrivateRoute>
                    <ExpertTraining />
                  </PrivateRoute>
                }
              />
              <Route
                path="/book-training"
                element={
                  <PrivateRoute>
                    <BookTrainingSession />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;