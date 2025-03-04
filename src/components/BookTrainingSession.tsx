import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

interface Trainer {
  _id: string;
  name: string;
  specialty: string;
}

const BookTrainingSession = () => {
  const navigate = useNavigate();
  const { token, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [formData, setFormData] = useState({
    trainerId: '',
    date: '',
    time: '',
    trainingType: ''
  });

  useEffect(() => {
    if (!isAuthenticated || !token) {
      navigate('/login');
      return;
    }

    // Fetch trainers when component mounts
    const fetchTrainers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/training/trainers', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setTrainers(response.data);
      } catch (err) {
        console.error('Failed to fetch trainers:', err);
        setError('Failed to load trainers. Please try again.');
      }
    };

    fetchTrainers();
  }, [token, isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setError('Please log in to book a session');
      navigate('/login');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        'http://localhost:5000/api/training/book',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data) {
        navigate('/dashboard', { state: { message: 'Training session booked successfully!' } });
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to book session');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated || !token) {
    return null; // Component will redirect in useEffect
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">Book a Training Session</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Select Trainer
            </label>
            <select
              name="trainerId"
              value={formData.trainerId}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">Select a Trainer</option>
              {trainers.map(trainer => (
                <option key={trainer._id} value={trainer._id}>
                  {trainer.name} - {trainer.specialty}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Training Type
            </label>
            <select
              name="trainingType"
              value={formData.trainingType}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">Select Training Type</option>
              <option value="strength">Strength & Conditioning</option>
              <option value="hiit">HIIT</option>
              <option value="functional">Functional Training</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Time
            </label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Booking...' : 'Book Session'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookTrainingSession;