import React from 'react';

import { Dumbbell, Star, Shield, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';



const ExpertTraining = () => {
    const navigate = useNavigate();

    const trainers = [
        {
            name: "John Smith",
            specialty: "Strength & Conditioning",
            experience: "10+ years",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
            certifications: ["NASM-CPT", "CrossFit L2", "TRX Certified"]
        },
        {
            name: "Sarah Johnson",
            specialty: "HIIT & Functional Training",
            experience: "8 years",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
            certifications: ["ACE-CPT", "Precision Nutrition", "Kettlebell Specialist"]
        },
        // Add more trainers as needed
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold mb-4">Expert Training Programs</h1>
                <p className="text-xl text-gray-600">Transform your fitness journey with our certified professionals</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                {/* Training Features */}
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-xl text-white">
                    <Dumbbell className="w-12 h-12 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Personalized Plans</h3>
                    <p>Custom workout programs tailored to your goals</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-6 rounded-xl text-white">
                    <Star className="w-12 h-12 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Expert Guidance</h3>
                    <p>Learn proper form and technique from professionals</p>
                </div>
                <div className="bg-gradient-to-br from-pink-500 to-red-600 p-6 rounded-xl text-white">
                    <Shield className="w-12 h-12 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Certified Trainers</h3>
                    <p>Work with nationally certified fitness experts</p>
                </div>
                <div className="bg-gradient-to-br from-red-500 to-orange-600 p-6 rounded-xl text-white">
                    <Trophy className="w-12 h-12 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Goal Achievement</h3>
                    <p>Track progress and reach your fitness goals</p>
                </div>
            </div>

            <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Expert Trainers</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {trainers.map((trainer, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <img src={trainer.image} alt={trainer.name} className="w-full h-64 object-cover" />
                        <div className="p-6">
                            <h3 className="text-xl font-semibold mb-2">{trainer.name}</h3>
                            <p className="text-indigo-600 mb-2">{trainer.specialty}</p>
                            <p className="text-gray-600 mb-4">Experience: {trainer.experience}</p>
                            <div className="flex flex-wrap gap-2">
                                {trainer.certifications.map((cert, idx) => (
                                    <span key={idx} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                                        {cert}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-16 text-center">
                <button
                    onClick={() => navigate('/book-training')}
                    className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                >
                    Book a Training Session
                </button>
            </div>
        </div>
    );
};

export default ExpertTraining;