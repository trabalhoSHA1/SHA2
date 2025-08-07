// src/components/schedule/WeeklySchedule.jsx
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock, User, MapPin } from 'lucide-react';

export default function WeeklySchedule({ onSelectDate }) {
  console.log('рендерizando Agenda Semanal');
  
  const [currentWeek, setCurrentWeek] = useState(new Date());
  
  // Simulando dados das consultas
  const appointments = [
    {
      id: 1,
      date: '2025-07-15',
      time: '09:00',
      patient: 'Maria Silva Santos',
      type: 'presencial',
      room: 'Sala 101',
      status: 'Confirmado'
    },
    {
      id: 2,
      date: '2025-07-15',
      time: '10:30',
      patient: 'João Santos Lima',
      type: 'presencial',
      room: 'Sala 102',
      status: 'Confirmado'
    },
    {
      id: 3,
      date: '2025-07-17',
      time: '11:30',
      patient: 'Ana Costa Pereira',
      type: 'presencial',
      room: 'Sala 103',
      status: 'Pendente'
    }
  ];

  const getWeekDays = (date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay() + 1); // Começa na segunda-feira
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    
    return days;
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(currentWeek);
    newDate.setDate(currentWeek.getDate() + (direction * 7));
    setCurrentWeek(newDate);
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'short',
      day: 'numeric'
    });
  };

  const getDayAppointments = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return appointments.filter(apt => apt.date === dateStr);
  };

  const weekDays = getWeekDays(currentWeek);

  return (
    <div className="space-y-4">
      {/* Controles da semana */}
      <div className="flex items-center justify-between bg-white rounded-lg shadow-sm p-3">
        <button 
          onClick={() => navigateWeek(-1)}
          className="p-1.5 text-gray-500 hover:text-green-600 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        
        <h2 className="text-sm font-semibold text-gray-800">
          Semana de {currentWeek.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
        </h2>
        
        <button 
          onClick={() => navigateWeek(1)}
          className="p-1.5 text-gray-500 hover:text-green-600 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Grade semanal COMPACTA */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
        {weekDays.map((day, index) => {
          const dayAppointments = getDayAppointments(day);
          
          return (
            <div 
              key={index} 
              className={`border rounded-lg p-2 ${
                isToday(day) ? 'border-green-500 bg-green-50' : 'border-gray-200'
              }`}
            >
              <div className={`text-center text-xs font-medium mb-2 ${
                isToday(day) ? 'text-green-800' : 'text-gray-700'
              }`}>
                {formatDate(day)}
              </div>
              
              <div className="space-y-1">
                {dayAppointments.slice(0, 3).map((apt) => (
                  <div 
                    key={apt.id} 
                    className="text-xs bg-gray-50 p-1 rounded truncate hover:bg-gray-100 cursor-pointer"
                    onClick={() => onSelectDate && onSelectDate(apt.date)}
                    title={`${apt.time} - ${apt.patient}`}
                  >
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gray-500" />
                      <span>{apt.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3 text-gray-500" />
                      <span className="truncate">{apt.patient}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-gray-500" />
                      <span>{apt.room}</span>
                    </div>
                  </div>
                ))}
                
                {dayAppointments.length > 3 && (
                  <div className="text-[8px] text-gray-500 text-center">
                    +{dayAppointments.length - 3} mais
                  </div>
                )}
                
                {dayAppointments.length === 0 && (
                  <div className="text-[8px] text-gray-400 text-center py-1">
                    Sem consultas
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}