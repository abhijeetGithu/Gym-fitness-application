import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Clock, Users, ChevronRight, Calendar, Sun, Moon, CheckCircle } from 'lucide-react';
import Footer from '../components/Footer';

interface Slot {
  _id: string;
  name: string;
  startTime: string;
  endTime: string;
  capacity: number;
  currentMembers: string[];
  trainer: {
    name: string;
  };
}

const Slots = () => {
  const { user } = useAuth();
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [activeTab, setActiveTab] = useState<'morning' | 'evening'>('morning');
  const [isAdmin, setIsAdmin] = useState(true);

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/slots');
      setSlots(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch slots');
      setLoading(false);
    }
  };

  const initializeSlots = async () => {
    try {
      await axios.post('http://localhost:5000/api/slots/initialize');
      fetchSlots(); // Refresh the slots after initialization
    } catch (err) {
      setError('Failed to initialize slots');
    }
  };

  const bookSlot = async (slot: Slot) => {
    if (!user) {
      setError('Please login to book a slot');
      return;
    }

    try {
      setSelectedSlot(slot);
      setBookingStatus('loading');
      await axios.post(`http://localhost:5000/api/slots/${slot._id}/book`, {
        userId: user?._id
      });
      setBookingStatus('success');
      fetchSlots();
      setTimeout(() => {
        setBookingStatus('idle');
        setSelectedSlot(null);
      }, 2000);
    } catch (err) {
      setBookingStatus('error');
      setTimeout(() => setBookingStatus('idle'), 2000);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    );
  }

  const morningSlots = slots.filter(slot => {
    const hour = parseInt(slot.startTime.split(':')[0]);
    return hour < 12;
  });

  const eveningSlots = slots.filter(slot => {
    const hour = parseInt(slot.startTime.split(':')[0]);
    return hour >= 12;
  });

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 mb-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Flexible Training Slots</h1>
        <p className="text-indigo-100">Choose your preferred training time that fits your schedule</p>
      </div>
      
      {/* Initialize Button */}
      {isAdmin && (
        <button
          onClick={initializeSlots}
          className="mb-4 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
        >
          Initialize Slots
        </button>
      )}
      {/* Session Tabs */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setActiveTab('morning')}
          className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all ${activeTab === 'morning'
            ? 'bg-orange-100 text-orange-600'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
        >
          <Sun className="w-5 h-5 mr-2" />
          Morning Sessions
        </button>
        <button
          onClick={() => setActiveTab('evening')}
          className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all ${activeTab === 'evening'
            ? 'bg-indigo-100 text-indigo-600'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
        >
          <Moon className="w-5 h-5 mr-2" />
          Evening Sessions
        </button>
      </div>

      {/* Slots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(activeTab === 'morning' ? morningSlots : eveningSlots).map(slot => (
          <div key={slot._id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{slot.name}</h3>
                <div className="flex items-center text-gray-600 mt-1">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{slot.startTime} - {slot.endTime}</span>
                </div>
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="w-4 h-4 mr-1" />
                <span>{slot.currentMembers.length}/{slot.capacity}</span>
              </div>
            </div>
            <button
              onClick={() => bookSlot(slot)}
              disabled={bookingStatus === 'loading' || slot.currentMembers.length >= slot.capacity}
              className={`w-full py-2 px-4 rounded-lg font-medium transition-all ${slot.currentMembers.length >= slot.capacity
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
            >
              {slot.currentMembers.length >= slot.capacity ? 'Full' : 'Book Slot'}
            </button>
          </div>
        ))}
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Slots;
