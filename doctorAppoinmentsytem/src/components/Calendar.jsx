import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Calendar = ({ 
  currentDate, 
  selectedDate, 
  appointments, 
  getPreviousMonth, 
  getNextMonth, 
  handleDateClick, 
  hasAppointmentsOnDate,
  isDarkMode 
}) => {
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const renderCalendar = () => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    
    const days = [];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    // Add empty cells for days before first day of month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div 
          key={`empty-${i}`} 
          className={`h-12 border p-1 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50'}`}
        ></div>
      );
    }
    
    // Add cells for days in month
    for (let day = 1; day <= daysInMonth; day++) {
      const hasAppointments = hasAppointmentsOnDate(day);
      const isToday = new Date().getDate() === day && 
                      new Date().getMonth() === month && 
                      new Date().getFullYear() === year;
      const isSelected = selectedDate && 
                        selectedDate.getDate() === day && 
                        selectedDate.getMonth() === month && 
                        selectedDate.getFullYear() === year;
      
      days.push(
        <div 
          key={day} 
          className={`h-12 border p-1 relative cursor-pointer transition-all
              ${isDarkMode ? 'border-gray-700' : ''}
              ${isToday ? isDarkMode ? 'bg-blue-900' : 'bg-blue-50' : ''} 
              ${isSelected ? isDarkMode ? 'bg-blue-800 border-blue-500' : 'bg-blue-100 border-blue-500' : ''}
              ${hasAppointments ? isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-blue-50' : isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
          onClick={() => handleDateClick(day)}
        >
          <div className="flex justify-between">
            <span className={`${isToday ? 'font-bold text-blue-400' : isDarkMode ? 'text-gray-200' : ''}`}>{day}</span>
            {hasAppointments && <div className="w-2 h-2 rounded-full bg-blue-500"></div>}
          </div>
        </div>
      );
    }
    
    return (
      <div className={`rounded-lg shadow-md overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="p-4 bg-blue-600 text-white flex justify-between items-center">
          <button onClick={getPreviousMonth} className="p-1 hover:bg-blue-500 rounded">
            <ChevronLeft size={20} />
          </button>
          <h3 className="font-medium text-lg">{monthNames[month]} {year}</h3>
          <button onClick={getNextMonth} className="p-1 hover:bg-blue-500 rounded">
            <ChevronRight size={20} />
          </button>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-7 gap-1 mb-1">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
              <div 
                key={i} 
                className={`text-center font-medium text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
              >
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {days}
          </div>
        </div>
      </div>
    );
  };

  return renderCalendar();
};

export default Calendar; 