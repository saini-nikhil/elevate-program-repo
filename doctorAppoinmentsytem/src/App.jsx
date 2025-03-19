import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, Filter, Search, User, Bell, Home, CheckCircle, MapPin, Star, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Sun, Moon } from 'lucide-react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Navigation from './components/Navigation';
import Pagination from './components/Pagination';
import DoctorCard from './components/DoctorCard';
import Calendar from './components/Calendar';
import BookingModal from './components/BookingModal';
import AppointmentOverview from './components/AppointmentOverview';

function AppContent() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [expandedDoctor, setExpandedDoctor] = useState(null);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 5;
  
  // Calendar states
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showAppointmentDetails, setShowAppointmentDetails] = useState(false);
  const [dateAppointments, setDateAppointments] = useState([]);

  // Fetch doctors data
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('https://mediabook-387a8-default-rtdb.asia-southeast1.firebasedatabase.app/Doctors.json');
        const data = await response.json();
        const doctorsList = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setDoctors(doctorsList);
        setFilteredDoctors(doctorsList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Fetch appointments data
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('https://mediabook-387a8-default-rtdb.asia-southeast1.firebasedatabase.app/Appointments.json');
        const data = await response.json();
        if (data) {
          const appointmentsList = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          }));
          setAppointments(appointmentsList);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  // Filter doctors based on search term and specialty
  useEffect(() => {
    let filtered = doctors;
    
    if (searchTerm) {
      filtered = filtered.filter(doctor => 
        doctor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialization?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (specialtyFilter) {
      filtered = filtered.filter(doctor => 
        doctor.specialization === specialtyFilter || doctor.specialty === specialtyFilter
      );
    }
    
    setFilteredDoctors(filtered);
  }, [searchTerm, specialtyFilter, doctors]);

  // Update appointments for selected date
  useEffect(() => {
    if (selectedDate) {
      const startOfDay = new Date(selectedDate);
      startOfDay.setHours(0, 0, 0, 0);
      
      const endOfDay = new Date(selectedDate);
      endOfDay.setHours(23, 59, 59, 999);
      
      const filteredAppointments = appointments.filter(appointment => {
        const appointmentDate = new Date(appointment.date);
        return appointmentDate >= startOfDay && appointmentDate <= endOfDay;
      });
      
      setDateAppointments(filteredAppointments);
      if (filteredAppointments.length > 0) {
        setShowAppointmentDetails(true);
      }
    }
  }, [selectedDate, appointments]);

  // Calendar functions
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const getPreviousMonth = () => {
    const date = new Date(currentDate);
    date.setMonth(date.getMonth() - 1);
    setCurrentDate(date);
  };

  const getNextMonth = () => {
    const date = new Date(currentDate);
    date.setMonth(date.getMonth() + 1);
    setCurrentDate(date);
  };

  const handleDateClick = (date) => {
    const selectedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      date
    );
    setSelectedDate(selectedDate);
  };

  const hasAppointmentsOnDate = (date) => {
    const checkDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      date
    );
    checkDate.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(checkDate);
    endOfDay.setHours(23, 59, 59, 999);
    
    return appointments.some(appointment => {
      const appointmentDate = new Date(appointment.date);
      return appointmentDate >= checkDate && appointmentDate <= endOfDay;
    });
  };

  // Get unique specialties for filter
  const specialties = [...new Set(doctors.map(doctor => doctor.specialization || doctor.specialty))].filter(Boolean);

  // Toggle doctor details
  const toggleDoctorDetails = (doctorId) => {
    if (expandedDoctor === doctorId) {
      setExpandedDoctor(null);
    } else {
      setExpandedDoctor(doctorId);
    }
  };

  // Format appointment slot
  const formatSlot = (slotString) => {
    if (!slotString) return '';
    const date = new Date(slotString);
    return `${date.toLocaleDateString()} at ${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
  };

  // Book appointment function
  const bookAppointment = async (doctor) => {
    if (!selectedSlot && doctor.availableSlots && doctor.availableSlots.length > 0) {
      alert("Please select an appointment slot");
      return;
    }
    
    setSelectedDoctor(null);
    
    // Create new appointment
    const newAppointment = {
      doctorId: doctor.id,
      doctorName: doctor.name,
      specialty: doctor.specialization || doctor.specialty,
      date: selectedSlot || new Date().toISOString(),
      status: 'booked'
    };
    
    try {
      const response = await fetch('https://mediabook-387a8-default-rtdb.asia-southeast1.firebasedatabase.app/Appointments.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAppointment),
      });
      
      if (response.ok) {
        const data = await response.json();
        setAppointments([...appointments, { id: data.name, ...newAppointment }]);
        setSuccessMessage(`Appointment booked successfully with Dr. ${doctor.name}`);
        setTimeout(() => setSuccessMessage(''), 3000);
        setSelectedSlot(null);
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
    }
  };

  // Pagination logic
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);
  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Render loading state
  if (loading) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className={`mt-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Loading doctor data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Navigation 
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setShowAppointmentDetails={setShowAppointmentDetails}
      />

      {/* Success message */}
      {successMessage && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 max-w-7xl mx-auto mt-4">
          <div className="flex items-center">
            <CheckCircle className="mr-2" size={20} />
            <p>{successMessage}</p>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'home' && (
          <>
            {/* Hero section */}
            <div className="bg-blue-600 rounded-lg p-8 mb-8 text-white">
              <h1 className="text-3xl font-bold mb-2">Find Your Doctor & Book Appointment</h1>
              <p className="text-blue-100 mb-6">Book appointments with the best doctors in your area</p>
              
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 bg-white rounded-md overflow-hidden flex items-center">
                  <div className="pl-3">
                    <Search size={20} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search by doctor name or specialty"
                    className="w-full p-3 text-gray-700 focus:outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="bg-white rounded-md overflow-hidden flex items-center">
                  <div className="pl-3">
                    <Filter size={20} className="text-gray-400" />
                  </div>
                  <select
                    className="w-full p-3 text-gray-700 focus:outline-none appearance-none"
                    value={specialtyFilter}
                    onChange={(e) => setSpecialtyFilter(e.target.value)}
                  >
                    <option value="">All Specialties</option>
                    {specialties.map((specialty, index) => (
                      <option key={index} value={specialty}>{specialty}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            {/* Doctors list */}
            <div className="mb-8">
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Available Doctors</h2>
              
              {currentDoctors.length === 0 ? (
                <div className={`p-8 rounded-lg shadow text-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-500'}>No doctors found matching your criteria.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  {currentDoctors.map(doctor => (
                    <DoctorCard
                      key={doctor.id}
                      doctor={doctor}
                      isDarkMode={isDarkMode}
                      expandedDoctor={expandedDoctor}
                      toggleDoctorDetails={toggleDoctorDetails}
                      selectedDoctor={selectedDoctor}
                      setSelectedDoctor={setSelectedDoctor}
                      selectedSlot={selectedSlot}
                      setSelectedSlot={setSelectedSlot}
                      formatSlot={formatSlot}
                    />
                  ))}
                </div>
              )}
              
              {/* Pagination */}
              {filteredDoctors.length > doctorsPerPage && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          </>
        )}
        
        {activeTab === 'appointments' && !showAppointmentDetails && (
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Calendar
                currentDate={currentDate}
                selectedDate={selectedDate}
                appointments={appointments}
                getPreviousMonth={getPreviousMonth}
                getNextMonth={getNextMonth}
                handleDateClick={handleDateClick}
                hasAppointmentsOnDate={hasAppointmentsOnDate}
                isDarkMode={isDarkMode}
              />
            </div>
            <div className={`rounded-lg shadow-md p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Appointment Overview</h2>
              <div className="space-y-4">
                <div className={`flex justify-between items-center p-3 rounded-md ${isDarkMode ? 'bg-blue-900/50' : 'bg-blue-50'}`}>
                  <div className="flex items-center">
                    <CalendarIcon size={20} className={`mr-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                    <span className={isDarkMode ? 'text-gray-200' : 'text-gray-700'}>Total Appointments</span>
                  </div>
                  <span className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>{appointments.length}</span>
                </div>
                <div className={`flex justify-between items-center p-3 rounded-md ${isDarkMode ? 'bg-green-900/50' : 'bg-green-50'}`}>
                  <div className="flex items-center">
                    <CheckCircle size={20} className={`mr-2 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                    <span className={isDarkMode ? 'text-gray-200' : 'text-gray-700'}>Upcoming Appointments</span>
                  </div>
                  <span className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    {appointments.filter(app => new Date(app.date) > new Date()).length}
                  </span>
                </div>
                <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Select a date on the calendar to view appointments for that day.
                </p>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'appointments' && showAppointmentDetails && (
          <AppointmentOverview
            appointments={appointments}
            selectedDate={selectedDate}
            dateAppointments={dateAppointments}
            setShowAppointmentDetails={setShowAppointmentDetails}
            isDarkMode={isDarkMode}
          />
        )}
      </main>
      
      <BookingModal
        selectedDoctor={selectedDoctor}
        selectedSlot={selectedSlot}
        setSelectedSlot={setSelectedSlot}
        setSelectedDoctor={setSelectedDoctor}
        bookAppointment={bookAppointment}
        formatSlot={formatSlot}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;