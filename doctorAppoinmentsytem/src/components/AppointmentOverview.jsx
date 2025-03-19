import React from 'react';
import { Calendar as CalendarIcon, CheckCircle, Clock, ChevronLeft } from 'lucide-react';

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
        className="mb-4 flex items-center text-blue-600 hover:text-blue-800"
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
            <CalendarIcon size={40} className="mx-auto text-gray-400 mb-3" />
            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>No appointments scheduled for this date.</p>
          </div>
        ) : (
          <div className="divide-y">
            {dateAppointments.map(appointment => (
              <div key={appointment.id} className="py-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{appointment.doctorName}</h3>
                    <p className="text-sm text-blue-600">{appointment.specialty}</p>
                    <div className="flex items-center mt-1 text-gray-500 text-sm">
                      <Clock size={16} className="mr-1" />
                      <span>{new Date(appointment.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    {appointment.status}
                  </span>
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