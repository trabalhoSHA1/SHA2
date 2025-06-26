// src/components/dashboards/TherapistSchedule.jsx
import React from 'react';

export default function TherapistSchedule() {
  const schedule = [
    { date: '2025-04-05', appointments: [
      { time: '09:00', patient: 'Maria Silva', type: 'online' },
      { time: '10:30', patient: 'João Santos', type: 'presencial' }
    ]},
    { date: '2025-04-06', appointments: [
      { time: '14:00', patient: 'Ana Costa', type: 'presencial' }
    ]}
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">📅 Minha Agenda</h2>

      {/* Visualização por período */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex gap-2 mb-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Diária</button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">Semanal</button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">Mensal</button>
        </div>

        {/* Agenda diária */}
        {schedule.map((day, dayIndex) => (
          <div key={dayIndex} className="mb-6">
            <h3 className="text-lg font-medium text-gray-700 mb-3">
              {new Date(day.date).toLocaleDateString('pt-BR')}
            </h3>
            <div className="space-y-3">
              {day.appointments.map((app, appIndex) => (
                <div key={appIndex} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-medium">{app.time}</p>
                    <p className="text-sm text-gray-600">{app.patient}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    app.type === 'online' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {app.type === 'online' ? 'Online' : 'Presencial'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}