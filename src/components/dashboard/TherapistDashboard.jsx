import React, { useState } from 'react';

export default function TherapistDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const todayAppointments = [
    { id: 1, patient: 'Maria Silva', time: '09:00', type: 'presencial' },
    { id: 2, patient: 'João Santos', time: '10:30', type: 'online' }
  ];

  const activePatients = [
    { id: 1, name: 'Ana Costa', progress: 'Positiva' },
    { id: 2, name: 'Carlos Souza', progress: 'Estável' }
  ];

  if (activeTab === 'schedule') {
    return (
      <div style={{ padding: '2rem' }}>
        <h2>Minha Agenda</h2>
        <p>Aqui vai sua agenda completa</p>
        <button 
          onClick={() => setActiveTab('overview')} 
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            borderRadius: '0.5rem'
          }}
        >
          Voltar para Visão Geral
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Dashboard do Terapeuta</h1>

      {/* Abas */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button 
          onClick={() => setActiveTab('overview')}
          style={{
            flex: 1,
            padding: '0.75rem',
            backgroundColor: activeTab === 'overview' ? '#3b82f6' : '#bfdbfe',
            color: activeTab === 'overview' ? 'white' : '#1e40af',
            fontWeight: activeTab === 'overview' ? 'bold' : 'normal',
            border: 'none',
            borderRadius: '0.5rem'
          }}
        >
          Visão Geral
        </button>
        <button 
          onClick={() => setActiveTab('schedule')}
          style={{
            flex: 1,
            padding: '0.75rem',
            backgroundColor: activeTab === 'schedule' ? '#3b82f6' : '#bfdbfe',
            color: activeTab === 'schedule' ? 'white' : '#1e40af',
            fontWeight: activeTab === 'schedule' ? 'bold' : 'normal',
            border: 'none',
            borderRadius: '0.5rem'
          }}
        >
          Minha Agenda
        </button>
      </div>

      {/* Cards de métricas rápidas */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Consultas Hoje */}
        <div style={{ border: '1px solid #e5e7eb', borderRadius: '0.75rem', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '2.5rem', height: '2.5rem', backgroundColor: '#bfdbfe', borderRadius: '0.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <div>
              <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Consultas Hoje</p>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>4</p>
            </div>
          </div>
        </div>

        {/* Pacientes Ativos */}
        <div style={{ border: '1px solid #e5e7eb', borderRadius: '0.75rem', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '2.5rem', height: '2.5rem', backgroundColor: '#bbf7d0', borderRadius: '0.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.95" />
                <path d="M23 14H20" />
              </svg>
            </div>
            <div>
              <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Pacientes Ativos</p>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>12</p>
            </div>
          </div>
        </div>
      </div>

      {/* Consultas do Dia */}
      <div style={{ border: '1px solid #e5e7eb', borderRadius: '0.75rem', padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h2 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Consultas de Hoje</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {todayAppointments.map((app) => (
            <div key={app.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <div style={{ width: '0.75rem', height: '0.75rem', backgroundColor: app.type === 'online' ? '#a78bfa' : '#10b981', borderRadius: '9999px' }}></div>
                <div>
                  <p>{app.patient}</p>
                  <small>{app.time} • {app.type === 'online' ? 'Online' : 'Presencial'}</small>
                </div>
              </div>
              {app.type === 'online' && (
                <button style={{ backgroundColor: '#d8b4fe', color: '#7c3aed', padding: '0.25rem 0.5rem', borderRadius: '9999px' }}>
                  Iniciar
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Pacientes Ativos */}
      <div style={{ border: '1px solid #e5e7eb', borderRadius: '0.75rem', padding: '1.5rem' }}>
        <h2 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>👥 Pacientes Ativos</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {activePatients.map((patient) => (
            <div key={patient.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem' }}>
              <div>{patient.name}</div>
              <span style={{
                backgroundColor: patient.progress === 'Positiva' ? '#dcfce7' : '#fef3c7',
                color: patient.progress === 'Positiva' ? '#166534' : '#92400e',
                padding: '0.25rem 0.5rem',
                borderRadius: '9999px',
                fontSize: '0.75rem'
              }}>{patient.progress}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}