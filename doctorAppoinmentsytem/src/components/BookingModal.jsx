import React from 'react';

const BookingModal = ({ 
  selectedDoctor, 
  selectedSlot, 
  setSelectedSlot, 
  setSelectedDoctor, 
  bookAppointment, 
  formatSlot,
  isDarkMode 
}) => {
  if (!selectedDoctor) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`rounded-lg max-w-md w-full p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Book Appointment</h2>
        <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          You're about to book an appointment with <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedDoctor.name}</span>
        </p>
        
        <div className="mb-4">
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Specialty: {selectedDoctor.specialization || selectedDoctor.specialty}</p>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Fee: ${selectedDoctor.fee || "100"}</p>
          
          {selectedDoctor.availableSlots && selectedDoctor.availableSlots.length > 0 && (
            <div className="mt-4">
              <label className={`block mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Select appointment slot:</label>
              <select
                className={`w-full p-2 border rounded-md appearance-none bg-transparent
                  ${isDarkMode ? 
                    'border-gray-600 bg-gray-700 text-gray-200 focus:border-blue-500' : 
                    'border-gray-300 text-gray-900 focus:border-blue-500'
                  }
                  focus:outline-none focus:ring-1 focus:ring-blue-500`}
                value={selectedSlot || ''}
                onChange={(e) => setSelectedSlot(e.target.value)}
              >
                <option value="" className={isDarkMode ? 'bg-gray-700' : 'bg-white'}>-- Select a time slot --</option>
                {selectedDoctor.availableSlots.map((slot, index) => (
                  <option 
                    key={index} 
                    value={slot} 
                    className={isDarkMode ? 'bg-gray-700' : 'bg-white'}
                  >
                    {formatSlot(slot)}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        
        <div className="flex justify-end space-x-3">
          <button 
            onClick={() => {
              setSelectedDoctor(null);
              setSelectedSlot(null);
            }}
            className={`px-4 py-2 rounded-md border transition-colors
              ${isDarkMode ? 
                'border-gray-600 text-gray-300 hover:bg-gray-700' : 
                'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
          >
            Cancel
          </button>
          <button 
            onClick={() => bookAppointment(selectedDoctor)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal; 