import { Bot, Calendar, Dumbbell, HomeIcon, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';

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
  
export default Footer;