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
        <h2 className="text-xl font-semibold mb-4">Book Appointment</h2>
        <p className="mb-4">You're about to book an appointment with <span className="font-medium">{selectedDoctor.name}</span></p>
        
        <div className="mb-4">
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Specialty: {selectedDoctor.specialization || selectedDoctor.specialty}</p>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Fee: ${selectedDoctor.fee || "100"}</p>
          
          {selectedDoctor.availableSlots && selectedDoctor.availableSlots.length > 0 && (
            <div className="mt-4">
              <label className={`block mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Select appointment slot:</label>
              <select
                className="w-full p-2 border rounded-md"
                value={selectedSlot || ''}
                onChange={(e) => setSelectedSlot(e.target.value)}
              >
                <option value="">-- Select a time slot --</option>
                {selectedDoctor.availableSlots.map((slot, index) => (
                  <option key={index} value={slot}>{formatSlot(slot)}</option>
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
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
            onClick={() => bookAppointment(selectedDoctor)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal; 