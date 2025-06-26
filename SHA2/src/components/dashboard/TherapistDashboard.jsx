// src/components/dashboards/TherapistDashboard.jsx
import React, { useState } from 'react';

export default function TherapistDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const todayAppointments = [
    { id: 1, patient: 'Maria Silva', time: '09:00', type: 'presencial', isFirst: false },
    { id: 2, patient: 'João Santos', time: '10:30', type: 'online', isFirst: true },
    { id: 3, patient: 'Ana Costa', time: '14:00', type: 'presencial', isFirst: false },
    { id: 4, patient: 'Pedro Lima', time: '15:30', type: 'online', isFirst: false }
  ];

  const activePatients = [
    { id: 1, name: 'Maria Silva', nextSession: '2024-01-15', progress: 'Positiva' },
    { id: 2, name: 'João Santos', nextSession: '2024-01-16', progress: 'Estável' },
    { id: 3, name: 'Ana Costa', nextSession: '2024-01-17', progress: 'Positiva' },
  ];

  if (activeTab === 'schedule') {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-4">📅 Minha Agenda</h2>
        <p>Aqui vai sua agenda completa (diária/semanal/mensal)</p>
        <button onClick={() => setActiveTab('overview')} className="mt-4 text-sm bg-blue-500 text-white px-4 py-2 rounded">
          Voltar para Visão Geral
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard do Terapeuta</h1>
        <div className="text-sm text-gray-500">
          {new Date().toLocaleDateString('pt-BR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      </div>

      {/* Abas de navegação */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-1">
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md text-sm font-medium transition-all ${
              activeTab === 'overview' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {/* Ícone de gráfico */}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
            Visão Geral
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md text-sm font-medium transition-all ${
              activeTab === 'schedule' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {/* Ícone de calendário */}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            Minha Agenda
          </button>
        </div>
      </div>

      {/* Cards de métricas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Consultas Hoje */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">Consultas Hoje</p>
              <p className="text-2xl font-bold text-gray-900">4</p>
            </div>
          </div>
        </div>

        {/* Pacientes Ativos */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.95"></path>
                <path d="M23 14H20"></path>
                <path d="M17 17H20"></path>
                <path d="M20 21h-3"></path>
                <path d="M17 17v-3"></path>
                <path d="M23 14v3"></path>
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">Pacientes Ativos</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
        </div>

        {/* Online Hoje */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 16.88A4 4 0 0 0 19 10h-1.26A8 8 0 0 1 9 20h-2c-3.3 0-6-2.7-6-6 0-3.22 2.6-5.9 5.74-5.9a4.01 4.01 0 0 0 0 8H1"></path>
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">Online Hoje</p>
              <p className="text-2xl font-bold text-gray-900">2</p>
            </div>
          </div>
        </div>

        {/* Primeira Vez */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="bg-orange-100 p-3 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4L18 5L12 9L6 5M22 12H2"></path>
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">Primeira Vez</p>
              <p className="text-2xl font-bold text-gray-900">1</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Consultas do Dia */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <h2 className="text-lg font-semibold text-gray-900">📅 Consultas de Hoje</h2>
          </div>
          
          <div className="space-y-4">
            {todayAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  {/* Bolinha de status */}
                  <div className={`w-3 h-3 rounded-full ${
                    appointment.type === 'online' ? 'bg-purple-500' : 'bg-green-500'
                  }`} />
                  <div>
                    <p className="font-medium">{appointment.patient}</p>
                    <p className="text-sm text-gray-500">
                      {appointment.time && `${appointment.time} • `}
                      {appointment.type === 'online' ? 'Online' : 'Presencial'}
                      {appointment.isFirst && ' • Primeira consulta'}
                    </p>
                  </div>
                </div>

                {appointment.type === 'online' && (
                  <button className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors">
                    Iniciar
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Pacientes Ativos */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.95"></path>
              <path d="M23 14H20"></path>
              <path d="M17 17H20"></path>
              <path d="M20 21h-3"></path>
              <path d="M17 17v-3"></path>
              <path d="M23 14v3"></path>
            </svg>
            <h2 className="text-lg font-semibold text-gray-900">👥 Pacientes Ativos</h2>
          </div>
          
          <div className="space-y-4">
            {activePatients.map((patient) => (
              <div key={patient.id} className="p-4 bg-gray-50 rounded-lg border-l-4 border-blue-400">
                <p className="font-medium">{patient.name}</p>
                <p className="text-sm text-gray-600">Próxima sessão: {new Date(patient.nextSession).toLocaleDateString('pt-BR')}</p>
                <span className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-semibold ${getBadgeClass(patient.progress)}`}>
                  {patient.progress}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Acesso rápido à agenda */}
      <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between text-white">
          <div>
            <h3 className="text-lg font-semibold mb-2">Gerencie sua Agenda</h3>
            <p className="text-sm">Defina seus horários disponíveis para agendamentos</p>
          </div>
          <button
            onClick={() => setActiveTab('schedule')}
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            Abrir Agenda
          </button>
        </div>
      </div>
    </div>
  );
}

// Função pra badge colorida
function getBadgeClass(status) {
  switch (status) {
    case "Positiva":
      return "bg-green-100 text-green-800";
    case "Estável":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}