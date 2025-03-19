import React from 'react';
import { Home, Calendar as CalendarIcon, Bell, Sun, Moon } from 'lucide-react';

const Navigation = ({ isDarkMode, toggleTheme, activeTab, setActiveTab, setShowAppointmentDetails }) => {
  return (
    <nav className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-blue-600">DocBook</span>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-md ${isDarkMode ? 'text-yellow-400' : 'text-gray-600'}`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              onClick={() => {
                setActiveTab('home');
                setShowAppointmentDetails(false);
              }}
              className={`p-2 rounded-md ${activeTab === 'home' ? 'bg-blue-100 text-blue-600' : isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
            >
              <Home size={20} />
            </button>
            <button 
              onClick={() => {
                setActiveTab('appointments');
                setShowAppointmentDetails(false);
              }}
              className={`p-2 rounded-md ${activeTab === 'appointments' ? 'bg-blue-100 text-blue-600' : isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
            >
              <CalendarIcon size={20} />
            </button>
            <button className={`p-2 rounded-md ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <Bell size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 