// src/components/schedule/MonthlySchedule.jsx
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function MonthlySchedule({ onSelectDate, isDark }) {
  console.log('рендерizando Calendário Mensal');
  
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Simulação de dados das consultas
  const appointments = [
    { id: 1, date: '2025-07-15', time: '09:00', patient: 'Maria Silva Santos', type: 'presencial' },
    { id: 2, date: '2025-07-15', time: '10:30', patient: 'João Santos Lima', type: 'presencial' },
    { id: 3, date: '2025-07-17', time: '11:30', patient: 'Ana Costa Pereira', type: 'presencial' },
    { id: 4, date: '2025-07-20', time: '14:00', patient: 'Carlos Mendes Almeida', type: 'presencial' },
  ];

  const getMonthDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const days = [];
    
    const prevMonthDays = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
    for (let i = prevMonthDays; i > 0; i--) {
      const prevDate = new Date(year, month, -i + 1);
      days.push({ date: prevDate, isCurrentMonth: false });
    }
    
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const currentDate = new Date(year, month, i);
      days.push({ date: currentDate, isCurrentMonth: true });
    }
    
    const nextMonthDays = 42 - days.length;
    for (let i = 1; i <= nextMonthDays; i++) {
      const nextDate = new Date(year, month + 1, i);
      days.push({ date: nextDate, isCurrentMonth: false });
    }
    
    return days;
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newDate);
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const getDayAppointments = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return appointments.filter(apt => apt.date === dateStr);
  };

  const monthDays = getMonthDays(currentMonth);

  // Cores dinâmicas dark/light
  const cardBg = isDark ? 'bg-[#1F1F1F] border-[#2C2C2C] text-gray-200' : 'bg-white border-gray-200 text-gray-900';
  const cardHover = isDark ? 'hover:bg-[#2A2A2A]' : 'hover:bg-gray-50';
  const headerText = isDark ? 'text-gray-200' : 'text-gray-800';
  const subText = isDark ? 'text-gray-400' : 'text-gray-500';
  const dayText = isDark ? 'text-gray-200' : 'text-gray-700';
  const otherMonthDayText = isDark ? 'text-gray-500' : 'text-gray-400';

  return (
    <div className="space-y-4">
      {/* Controles do calendário */}
      <div className={`flex items-center justify-between rounded-lg shadow-sm p-3 ${cardBg} ${cardHover} transition-colors`}>
        <button 
          onClick={() => navigateMonth(-1)}
          className={`p-1.5 text-gray-500 hover:text-green-600 rounded-full ${cardHover} transition-colors`}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        
        <h2 className={`text-sm font-semibold ${headerText}`}>
          {currentMonth.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
        </h2>
        
        <button 
          onClick={() => navigateMonth(1)}
          className={`p-1.5 text-gray-500 hover:text-green-600 rounded-full ${cardHover} transition-colors`}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Calendário Compacto */}
      <div className={`rounded-lg shadow-sm p-3 ${cardBg} ${cardHover} transition-colors`}>
        {/* Dias da semana */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].map((day) => (
            <div key={day} className={`text-center text-xs font-medium py-1 ${subText}`}>
              {day}
            </div>
          ))}
        </div>

        {/* Grade do calendário */}
        <div className="grid grid-cols-7 gap-1">
          {monthDays.map((dayObj, index) => {
            const { date, isCurrentMonth } = dayObj;
            const dayAppointments = getDayAppointments(date);
            const hasAppointments = dayAppointments.length > 0;
            
            // Destaque do dia de hoje
            const todayClasses = isToday(date)
              ? isDark
                ? 'bg-green-700 text-white border-green-600'
                : 'bg-green-100 text-green-800 border-green-400'
              : '';

            return (
              <div
                key={index}
                className={`min-h-8 border rounded p-1 cursor-pointer transition-colors text-center ${
                  isCurrentMonth ? cardBg : cardHover
                } ${todayClasses} ${hasAppointments ? 'bg-blue-50 dark:bg-blue-900' : ''}`}
                onClick={() => onSelectDate && onSelectDate(date.toISOString().split('T')[0])}
              >
                <div className={`text-xs font-medium ${isCurrentMonth ? dayText : otherMonthDayText}`}>
                  {date.getDate()}
                </div>
                {hasAppointments && (
                  <div className="text-[8px] text-blue-600 dark:text-blue-400 mt-0.5">
                    {dayAppointments.length} consulta(s)
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
