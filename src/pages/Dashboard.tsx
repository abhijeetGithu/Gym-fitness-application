import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { Calendar, Activity, TrendingUp, Award, Clock, CheckCircle, XCircle } from 'lucide-react';

interface Attendance {
  _id: string;
  date: string;
  status: 'present' | 'absent';
  slot: {
    name: string;
    startTime: string;
    endTime: string;
  };
}

const Dashboard = () => {
  const { user } = useAuth();
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [stats, setStats] = useState({
    totalSessions: 0,
    attendanceRate: 0,
    streak: 0,
    points: 0
  });

  useEffect(() => {
    if (user?._id) {
      fetchAttendance();
    }
  }, [user?._id]);

  const fetchAttendance = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/attendance/user/${user?._id}`);
      setAttendance(response.data);
      
      // Calculate stats
      const totalSessions = response.data.length;
      const presentSessions = response.data.filter((a: Attendance) => a.status === 'present').length;
      const attendanceRate = totalSessions ? (presentSessions / totalSessions) * 100 : 0;
      
      setStats({
        totalSessions,
        attendanceRate,
        streak: calculateStreak(response.data),
        points: presentSessions * 10 // Simple point system
      });
    } catch (error) {
      console.error('Error fetching attendance:', error);
    }
  };

  const calculateStreak = (attendanceData: Attendance[]): number => {
    let currentStreak = 0;
    const sortedAttendance = [...attendanceData]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    for (const record of sortedAttendance) {
      if (record.status === 'present') {
        currentStreak++;
      } else {
        break;
      }
    }

    return currentStreak;
  };

  return (
    <div className="p-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6 rounded-lg shadow-lg mb-6">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back {user?.name ? user.name.split(' ')[0].charAt(0).toUpperCase() + user.name.split(' ')[0].slice(1) : 'Member'}! 👋
        </h1>
        <p className="text-purple-100">
          Track your progress and stay motivated
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<Calendar className="w-6 h-6" />}
          label="Total Sessions"
          value={stats.totalSessions.toString()}
          color="bg-emerald-500"
        />
        <StatCard
          icon={<Activity className="w-6 h-6" />}
          label="Attendance Rate"
          value={`${Math.round(stats.attendanceRate)}%`}
          color="bg-blue-500"
        />
        <StatCard
          icon={<TrendingUp className="w-6 h-6" />}
          label="Current Streak"
          value={`${stats.streak} days`}
          color="bg-purple-500"
        />
        <StatCard
          icon={<Award className="w-6 h-6" />}
          label="Fitness Points"
          value={stats.points.toString()}
          color="bg-orange-500"
        />
      </div>

      {/* Recent Attendance Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center">
            <Clock className="w-5 h-5 mr-2 text-gray-600" />
            Recent Attendance
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Slot
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {attendance.map((record) => (
                <tr key={record._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(record.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.slot.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.slot.startTime} - {record.slot.endTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      record.status === 'present'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {record.status === 'present' ? (
                        <CheckCircle className="w-4 h-4 mr-1" />
                      ) : (
                        <XCircle className="w-4 h-4 mr-1" />
                      )}
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, color }: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className={`${color} rounded-full w-12 h-12 flex items-center justify-center text-white mb-4`}>
      {icon}
    </div>
    <div className="text-3xl font-bold mb-2">{value}</div>
    <div className="text-gray-600">{label}</div>
  </div>
);

export default Dashboard;