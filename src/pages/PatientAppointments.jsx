// src/pages/PatientAppointments.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

export default function PatientAppointments() {
  const { siape } = useParams();
  
  // Dados simulados de agendamentos
  const appointments = [
    {
      id: 1,
      date: '15/01/2024',
      time: '09:00',
      type: 'Presencial',
      status: 'Confirmado',
      patient: 'Maria Silva'
    },
    {
      id: 2,
      date: '18/01/2024',
      time: '10:30',
      type: 'Online',
      status: 'Pendente',
      patient: 'João Santos'
    },
    {
      id: 3,
      date: '20/01/2024',
      time: '14:00',
      type: 'Presencial',
      status: 'Confirmado',
      patient: 'Ana Costa'
    }
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Agendamentos do Paciente</h1>
      <p className="text-gray-600 mb-4">Paciente: {siape}</p>
      
      <div className="space-y-4">
        {appointments.map((appointment) => (
          <div 
            key={appointment.id} 
            className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-gray-900">{appointment.patient}</h3>
                <p className="text-sm text-gray-500">
                  {appointment.date} às {appointment.time}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  appointment.type === 'Presencial' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-purple-100 text-purple-800'
                }`}>
                  {appointment.type}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  appointment.status === 'Confirmado' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {appointment.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6">
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors">
          + Novo Agendamento
        </button>
      </div>
    </div>
  );
}