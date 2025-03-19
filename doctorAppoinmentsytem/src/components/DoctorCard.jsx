import React from 'react';
import { MapPin, Star, ChevronDown, ChevronUp, Calendar as CalendarIcon } from 'lucide-react';
import dctrimg from "../image.png"

const DoctorCard = ({ 
  doctor, 
  isDarkMode, 
  expandedDoctor, 
  toggleDoctorDetails, 
  selectedDoctor, 
  setSelectedDoctor, 
  selectedSlot, 
  setSelectedSlot,
  formatSlot 
}) => {
  return (
    <div className={`rounded-lg shadow-md overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-start">
          <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
            <img 
              src={dctrimg} 
              alt={doctor.name} 
              className="w-24 h-24 rounded-lg object-cover"
            />
          </div>
          <div className="flex-grow">
            <div className="flex flex-wrap justify-between items-start">
              <div>
                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{doctor.name}</h3>
                <p className="text-blue-600">{doctor.specialization || doctor.specialty}</p>
                <div className="flex items-center mt-2 text-gray-500 text-sm">
                  <MapPin size={16} className="mr-1" />
                  <span>{doctor.clinicAddress || "Address not available"}</span>
                </div>
              </div>
              
              <div className="mt-2 md:mt-0">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={i < Math.floor(doctor.rating || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                    />
                  ))}
                  <span className={`ml-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{doctor.rating || "N/A"}</span>
                </div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>{doctor.experience || 0} years experience</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-6">
              <div>
                <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} font-semibold`}>${doctor.fee || "100"}</span>
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}> / consultation</span>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => toggleDoctorDetails(doctor.id)}
                  className="flex items-center text-blue-600 hover:text-blue-800"
                >
                  {expandedDoctor === doctor.id ? (
                    <>
                      <span>Show less</span>
                      <ChevronUp size={20} className="ml-1" />
                    </>
                  ) : (
                    <>
                      <span>Show more</span>
                      <ChevronDown size={20} className="ml-1" />
                    </>
                  )}
                </button>
                
                <button
                  onClick={() => setSelectedDoctor(doctor)}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-200"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Expanded details */}
        {expandedDoctor === doctor.id && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className={`font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Available Slots</h4>
            {doctor.availableSlots && doctor.availableSlots.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                {doctor.availableSlots.map((slot, index) => (
                  <div 
                    key={index} 
                    className="border rounded-md p-2 flex items-center cursor-pointer hover:bg-blue-50"
                    onClick={() => {
                      if (selectedDoctor && selectedDoctor.id === doctor.id) {
                        setSelectedSlot(slot);
                      }
                    }}
                  >
                    <CalendarIcon size={16} className="mr-2 text-blue-600" />
                    <span className="text-sm">{formatSlot(slot)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className={`mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>No available slots</p>
            )}
            
            <h4 className={`font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>About Doctor</h4>
            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
              {doctor.about || `Dr. ${doctor.name.split(' ')[1]} is a ${doctor.experience || 0} year experienced ${doctor.specialization || doctor.specialty} practicing at ${doctor.clinicAddress || 'local clinics'}.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorCard; 