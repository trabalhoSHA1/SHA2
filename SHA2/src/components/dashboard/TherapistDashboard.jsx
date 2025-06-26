// src/components/dashboards/TherapistDashboard.jsx
import React from 'react';

export default function TherapistDashboard() {
  const [activeTab, setActiveTab] = React.useState('overview');

  // Consultas do dia
  const todayAppointments = [
    {
      id: 1,
      patient: "Maria Silva",
      time: "09:00",
      type: "Presencial",
      status: "regular"
    },
    {
      id: 2,
      patient: "João Santos",
      time: "10:30",
      type: "Online",
      isFirst: true
    },
    {
      id: 3,
      patient: "Ana Costa",
      time: "",
      type: "Presencial",
      isFirst: false
    }
  ];

  // Pacientes Ativos
  const activePatients = [
    { name: "Maria Silva", nextAppointment: "14/01/2025", progress: "Positiva" },
    { name: "João Santos", nextAppointment: "15/01/2025", progress: "Estável" },
    { name: "Ana Costa", nextAppointment: "16/01/2025", progress: "Positiva" }
  ];

  // Função pra badge colorida
  const getBadgeClass = (status) => {
    switch (status) {
      case "Positiva": return "bg-green-100 text-green-800";
      case "Estável": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (activeTab !== 'overview') {
    return (
      <div>
        <h2>📅 Minha Agenda</h2>
        <p>Aqui vai a agenda completa (diária/semanal/mensal)</p>
        <button onClick={() => setActiveTab('overview')}>
          Voltar para Visão Geral
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard space-y-6">
      {/* Cabeçalho da página */}
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard do Terapeuta</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            {new Date().toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </span>

          {/* Ícone de notificação */}
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M12 22v-4m-6 0h12"></path>
            </svg>
            <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
          </div>

          {/* Avatar do usuário */}
          <div className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full font-semibold">
            A
          </div>
        </div>
      </header>

      {/* Navegação por abas */}
      <nav className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            activeTab === 'overview'
              ? 'bg-blue-100 text-blue-700 font-medium'
              : 'hover:bg-gray-100'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span>Visão Geral</span>
        </button>

        <button
          onClick={() => setActiveTab('schedule')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            activeTab === 'schedule'
              ? 'bg-blue-100 text-blue-700 font-medium'
              : 'hover:bg-gray-100'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <span>Minha Agenda</span>
        </button>
      </nav>

      {/* Resumo Rápido - Métricas */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {/* Consultas Hoje */}
        <div className="bg-white p-4 rounded-xl shadow border border-gray-200 flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

        {/* Pacientes Ativos */}
        <div className="bg-white p-4 rounded-xl shadow border border-gray-200 flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.95"></path>
              <path d="M23 14H20"></path>
              <path d="M17 17H20"></path>
              <path d="M20 21h-3"></path>
              <path d="M17 17V14"></path>
              <path d="M23 14V17"></path>
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-600">Pacientes Ativos</p>
            <p className="text-2xl font-bold text-gray-900">12</p>
          </div>
        </div>

        {/* Online Hoje */}
        <div className="bg-white p-4 rounded-xl shadow border border-gray-200 flex items-center gap-4">
          <div className="bg-purple-100 p-3 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="2" ry="2"></rect>
              <path d="M10 16h4"></path>
              <path d="M12 12v4"></path>
              <path d="M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10 10 10 0 0 1-10-10z"></path>
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-600">Online Hoje</p>
            <p className="text-2xl font-bold text-gray-900">2</p>
          </div>
        </div>

        {/* Primeira Vez */}
        <div className="bg-white p-4 rounded-xl shadow border border-gray-200 flex items-center gap-4">
          <div className="bg-orange-100 p-3 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-600">Primeira Vez</p>
            <p className="text-2xl font-bold text-gray-900">1</p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Consultas do Dia */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <h2 className="text-lg font-semibold text-gray-900">Consultas de Hoje</h2>
          </div>

          <div className="space-y-4">
            {todayAppointments.map((app) => (
              <div key={app.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  {/* Bolinha de status */}
                  <div className={`w-3 h-3 rounded-full ${
                    app.type === 'Online' ? 'bg-purple-500' : 'bg-green-500'
                  }`}></div>
                  <div>
                    <p className="font-medium text-gray-900">{app.patient}</p>
                    <p className="text-sm text-gray-500">
                      {app.time && `${app.time} • `}
                      {app.type}
                      {app.isFirst && ' • Primeira consulta'}
                    </p>
                  </div>
                </div>

                {app.type === 'Online' && (
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
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.95"></path>
              <path d="M23 14H20"></path>
              <path d="M17 17H20"></path>
              <path d="M20 21h-3"></path>
              <path d="M17 17v-3"></path>
              <path d="M23 14V17"></path>
            </svg>
            <h2 className="text-lg font-semibold text-gray-900">Pacientes Ativos</h2>
          </div>

          <div className="space-y-4">
            {activePatients.map((patient, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{patient.name}</p>
                  <p className="text-sm text-gray-500">Próxima sessão: {patient.nextAppointment}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeClass(patient.progress)}`}>
                  {patient.progress}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Bloco de acesso rápido à agenda */}
      <section className="mt-6 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between text-white">
          <div>
            <h3 className="text-lg font-semibold mb-2">Gerencie sua Agenda</h3>
            <p className="text-blue-100">Defina seus horários disponíveis para agendamentos</p>
          </div>
          <button
            onClick={() => setActiveTab('schedule')}
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            Abrir Agenda
          </button>
        </div>
      </section>
    </div>
  );
}

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