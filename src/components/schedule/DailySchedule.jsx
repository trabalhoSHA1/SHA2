// src/components/schedule/DailySchedule.jsx
import React, { useState } from 'react';
import { Calendar, Clock, User, MapPin } from 'lucide-react';

export default function DailySchedule({ selectedDate }) {
  console.log('рендерizando Agenda Diária para:', selectedDate);
  
  // Simulando dados das consultas
  const appointments = [
    {
      id: 1,
      time: '09:00',
      patient: 'Maria Silva Santos',
      type: 'presencial',
      room: 'Sala 101',
      status: 'Confirmado'
    },
    {
      id: 2,
      time: '10:30',
      patient: 'João Santos Lima',
      type: 'presencial',
      room: 'Sala 102',
      status: 'Confirmado'
    },
    {
      id: 3,
      time: '11:30',
      patient: 'Ana Costa Pereira',
      type: 'presencial',
      room: 'Sala 103',
      status: 'Pendente'
    },
    {
      id: 4,
      time: '14:00',
      patient: 'Carlos Mendes Almeida',
      type: 'presencial',
      room: 'Sala 101',
      status: 'Confirmado'
    }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-4">
      {/* Cabeçalho com data */}
      <div className="flex items-center justify-between bg-white rounded-lg shadow-sm p-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-green-600" />
          <span className="text-sm font-medium text-gray-800">
            {formatDate(selectedDate)}
          </span>
        </div>
        <div className="text-xs text-gray-500">
          {appointments.length} consulta(s)
        </div>
      </div>

      {/* Lista de consultas */}
      <div className="space-y-2">
        {appointments.map((appointment) => (
          <div 
            key={appointment.id} 
            className="bg-white rounded-lg shadow-sm p-3 border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium text-gray-900">
                    {appointment.time}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {appointment.patient}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin className="w-3 h-3" />
                    <span>{appointment.room}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {/* STATUS */}
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  appointment.status === 'Confirmado' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {appointment.status}
                </span>
            
                <button 
                  className="p-1.5 text-gray-500 hover:text-green-600 rounded-full hover:bg-gray-100 transition-colors"
                  onClick={() => alert(`Visualizar consulta: ${appointment.patient}`)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}