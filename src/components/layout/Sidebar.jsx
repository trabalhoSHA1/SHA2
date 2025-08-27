// src/components/layout/Sidebar.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home, User, Calendar, Clock, Users, FileText, LayoutDashboard, Settings, ChevronRight, ChevronLeft
} from 'lucide-react';

function capitalize(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}

export default function Sidebar({ user, loading }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();
<<<<<<< HEAD
  const { user } = useContext(AuthContext);

  if (!user) return null;

  const role = user.role;

  // Map para traduzir os roles para português
  const roleNames = {
    admin: 'Administrador',
    therapist: 'Terapeuta',
    assistant: 'Assistente Administrativo'
  };

  const navItems = role === 'admin'
    ? [
        { label: 'Dashboard', icon: <Home size={20} />, to: '/dashboard/admin' },
        { label: 'Meu Perfil', icon: <User size={20} />, to: '/perfil' },
        { label: 'Agendamentos', icon: <Calendar size={20} />, to: '/appointments' },
        { label: 'Agenda dos Terapeutas', icon: <Clock size={20} />, to: '/schedule' },
        { label: 'Pacientes', icon: <Users size={20} />, to: '/patients' },
        { label: 'Prontuários', icon: <FileText size={20} />, to: '/prontuarios' },
        { label: 'Terapeutas', icon: <User size={20} />, to: '/therapists' },
        { label: 'Salas', icon: <LayoutDashboard size={20} />, to: '/rooms' },
        { label: 'Relatórios', icon: <FileText size={20} />, to: '/reports' },
        { label: 'Configurações', icon: <Settings size={20} />, to: '/settings' },
      ]
    : role === 'assistant'
      ? [
          { label: 'Dashboard', icon: <Home size={20} />, to: '/dashboard/assistant' },
          { label: 'Meu Perfil', icon: <User size={20} />, to: '/perfil' },
          { label: 'Agendamentos', icon: <Calendar size={20} />, to: '/appointments' },
          { label: 'Pacientes', icon: <Users size={20} />, to: '/patients' },
          { label: 'Prontuários', icon: <FileText size={20} />, to: '/prontuarios' },
          { label: 'Relatórios', icon: <FileText size={20} />, to: '/reports' },
        ]
      : [
          { label: 'Dashboard', icon: <Home size={20} />, to: '/dashboard/therapist' },
          { label: 'Consultas', icon: <Calendar size={20} />, to: '/appointments' },
          { label: 'Pacientes', icon: <Users size={20} />, to: '/patients' },
          { label: 'Prontuários', icon: <FileText size={20} />, to: '/prontuarios' },
          { label: 'Configurações', icon: <Settings size={20} />, to: '/settings' },
        ];
=======

  // Menu padrão (fallback) enquanto user não carrega
  const defaultRole = 'therapist';
  const role = user?.role || defaultRole;

  const navItems = {
    admin: [
      { label: 'Dashboard', icon: <Home size={20} />, to: '/dashboard/admin' },
      { label: 'Meu Perfil', icon: <User size={20} />, to: '/perfil' },
      { label: 'Agendamentos', icon: <Calendar size={20} />, to: '/appointments' },
      { label: 'Agenda dos Terapeutas', icon: <Clock size={20} />, to: '/schedule' },
      { label: 'Pacientes', icon: <Users size={20} />, to: '/patients' },
      { label: 'Prontuários', icon: <FileText size={20} />, to: '/prontuarios' },
      { label: 'Terapeutas', icon: <User size={20} />, to: '/therapists' },
      { label: 'Salas', icon: <LayoutDashboard size={20} />, to: '/rooms' },
      { label: 'Relatórios', icon: <FileText size={20} />, to: '/reports' },
      { label: 'Configurações', icon: <Settings size={20} />, to: '/settings' },
    ],
    assistant: [
      { label: 'Dashboard', icon: <Home size={20} />, to: '/dashboard/assistant' },
      { label: 'Meu Perfil', icon: <User size={20} />, to: '/perfil' },
      { label: 'Agendamentos', icon: <Calendar size={20} />, to: '/appointments' },
      { label: 'Pacientes', icon: <Users size={20} />, to: '/patients' },
      { label: 'Prontuários', icon: <FileText size={20} />, to: '/prontuarios' },
      { label: 'Relatórios', icon: <FileText size={20} />, to: '/reports' },
    ],
    therapist: [
      { label: 'Dashboard', icon: <Home size={20} />, to: '/dashboard/therapist' },
      { label: 'Consultas', icon: <Calendar size={20} />, to: '/appointments' },
      { label: 'Pacientes', icon: <Users size={20} />, to: '/patients' },
      { label: 'Prontuários', icon: <FileText size={20} />, to: '/prontuarios' },
      { label: 'Configurações', icon: <Settings size={20} />, to: '/settings' },
    ]
  };

  const items = navItems[role] || [];
>>>>>>> 8aca77de771e6f1adf5fd0d576c73ff1bbfcd954

  return (
    <aside className={`h-screen bg-green-100 border-r border-green-200 shadow-md transition-all duration-300 flex flex-col ${isExpanded ? 'w-56' : 'w-20'}`}>
      <div className="flex items-center justify-end p-2">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-green-200 hover:bg-green-300 text-green-900 rounded-full p-1 transition"
        >
          {isExpanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>

      <nav className="flex-1 space-y-1 px-2">
        {items.map(({ label, icon, to }) => {
          const isActive = location.pathname === to;
          return (
            <Link
              key={label}
              to={to}
              className={`flex items-center gap-3 p-2 rounded-md transition-all 
                ${isActive 
                  ? 'bg-green-300 text-green-900 font-semibold' 
                  : 'hover:bg-green-200 text-green-900'}`}
            >
              {icon}
              {isExpanded && <span className="text-sm">{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Card usuário */}
      {isExpanded && (
        <div className="p-4 mt-auto flex flex-col items-center border-t border-green-200">
          <User size={30} className="text-green-900 mb-2" />
<<<<<<< HEAD
          <span className="font-medium text-green-900">{user.name}</span>
          <span className="text-sm text-green-800">{roleNames[user.role]}</span>
=======
          <span className="font-medium text-green-900">{user?.name || 'Carregando...'}</span>
          <span className="text-sm text-green-800">{capitalize(user?.role) || '...'}</span>
>>>>>>> 8aca77de771e6f1adf5fd0d576c73ff1bbfcd954
        </div>
      )}
    </aside>
  );
}
