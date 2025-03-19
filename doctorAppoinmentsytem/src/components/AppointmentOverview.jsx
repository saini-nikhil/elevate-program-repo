import React from 'react';
import { Calendar as CalendarIcon, CheckCircle, Clock, ChevronLeft, User } from 'lucide-react';

const AppointmentOverview = ({ 
  appointments, 
  selectedDate, 
  dateAppointments, 
  setShowAppointmentDetails,
  isDarkMode 
}) => {
  return (
    <div>
      <button 
        onClick={() => setShowAppointmentDetails(false)}
        className={`mb-4 flex items-center ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
      >
        <ChevronLeft size={20} className="mr-1" />
        Back to Calendar
      </button>
      
      <div className={`rounded-lg shadow-md p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          Appointments for {selectedDate?.toLocaleDateString()}
        </h2>
        
        {dateAppointments.length === 0 ? (
          <div className="text-center py-8">
            <CalendarIcon size={40} className={`mx-auto ${isDarkMode ? 'text-gray-600' : 'text-gray-400'} mb-3`} />
            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>No appointments scheduled for this date.</p>
          </div>
        ) : (
          <div className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
            {dateAppointments.map(appointment => (
              <div key={appointment.id} className="py-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div>
                      <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        {appointment.doctorName}
                      </h3>
                      <p className={`text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                        {appointment.specialty}
                      </p>
                    </div>
                    
                    <div className="flex items-center text-sm space-x-4">
                      <div className="flex items-center">
                        <Clock size={16} className={`mr-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                        <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                          {appointment.time || new Date(appointment.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </span>
                      </div>
                      
                      <div className="flex items-center">
                        <User size={16} className={`mr-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                        <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                          {appointment.userName || 'Patient'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium
                      ${isDarkMode ? 
                        'bg-green-900/50 text-green-400' : 
                        'bg-green-100 text-green-800'
                      }`}>
                      {appointment.status}
                    </span>
                    {appointment.userId && (
                      <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        ID: {appointment.userId}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentOverview; 