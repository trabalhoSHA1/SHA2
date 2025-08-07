// src/components/schedule/MonthlySchedule.jsx
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock, User } from 'lucide-react';

export default function MonthlySchedule({ onSelectDate }) {
  console.log('рендерizando Calendário Mensal');
  
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Simulando dados das consultas
  const appointments = [
    {
      id: 1,
      date: '2025-07-15',
      time: '09:00',
      patient: 'Maria Silva Santos',
      type: 'presencial'
    },
    {
      id: 2,
      date: '2025-07-15',
      time: '10:30',
      patient: 'João Santos Lima',
      type: 'presencial'
    },
    {
      id: 3,
      date: '2025-07-17',
      time: '11:30',
      patient: 'Ana Costa Pereira',
      type: 'presencial'
    },
    {
      id: 4,
      date: '2025-07-20',
      time: '14:00',
      patient: 'Carlos Mendes Almeida',
      type: 'presencial'
    }
  ];

  const getMonthDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const days = [];
    
    // Dias do mês anterior (para preencher a grade)
    const prevMonthDays = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
    for (let i = prevMonthDays; i > 0; i--) {
      const prevDate = new Date(year, month, -i + 1);
      days.push({
        date: prevDate,
        isCurrentMonth: false
      });
    }
    
    // Dias do mês atual
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const currentDate = new Date(year, month, i);
      days.push({
        date: currentDate,
        isCurrentMonth: true
      });
    }
    
    // Dias do próximo mês (para preencher a grade)
    const nextMonthDays = 42 - days.length; // 6 semanas * 7 dias
    for (let i = 1; i <= nextMonthDays; i++) {
      const nextDate = new Date(year, month + 1, i);
      days.push({
        date: nextDate,
        isCurrentMonth: false
      });
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

  const formatDate = (date) => {
    return date.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    });
  };

  const getDayAppointments = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return appointments.filter(apt => apt.date === dateStr);
  };

  const monthDays = getMonthDays(currentMonth);

  return (
    <div className="space-y-4">
      {/* Controles do calendário */}
      <div className="flex items-center justify-between bg-white rounded-lg shadow-sm p-3">
        <button 
          onClick={() => navigateMonth(-1)}
          className="p-1.5 text-gray-500 hover:text-green-600 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        
        <h2 className="text-sm font-semibold text-gray-800">
          {currentMonth.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
        </h2>
        
        <button 
          onClick={() => navigateMonth(1)}
          className="p-1.5 text-gray-500 hover:text-green-600 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Calendário COMPACTO */}
      <div className="bg-white rounded-lg shadow-sm p-3">
        {/* Dias da semana */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].map((day) => (
            <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
              {day}
            </div>
          ))}
        </div>

        {/* Grade do calendário MENOR */}
        <div className="grid grid-cols-7 gap-1">
          {monthDays.map((dayObj, index) => {
            const { date, isCurrentMonth } = dayObj;
            const dayAppointments = getDayAppointments(date);
            const hasAppointments = dayAppointments.length > 0;
            
            return (
              <div
                key={index}
                className={`min-h-8 border rounded p-1 cursor-pointer hover:bg-gray-50 transition-colors text-center ${
                  isCurrentMonth ? 'bg-white border-gray-200' : 'bg-gray-50 border-gray-100 text-gray-400'
                } ${isToday(date) ? 'border-green-500 bg-green-50' : ''} ${
                  hasAppointments ? 'bg-blue-50' : ''
                }`}
                onClick={() => onSelectDate && onSelectDate(date.toISOString().split('T')[0])}
              >
                <div className={`text-xs font-medium ${
                  isToday(date) ? 'text-green-800' : 'text-gray-700'
                }`}>
                  {date.getDate()}
                </div>
                {hasAppointments && (
                  <div className="text-[8px] text-blue-600 mt-0.5">
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