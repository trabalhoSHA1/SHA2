// src/components/layout/Sidebar.jsx
import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home, User, Calendar, Clock, Users, FileText, LayoutDashboard, Settings, ChevronRight, ChevronLeft
} from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '@/context/ThemeContext';

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  if (loading || !user) return null;

  const role = user.role || 'therapist';
  const roleNames = {
    admin: 'Administrador',
    therapist: 'Terapeuta',
    assistant: 'Assistente Administrativo'
  };

  const navItems = {
    admin: [
      { label: 'Dashboard', icon: <Home size={20} />, to: '/dashboard/admin' },
      { label: 'Agendamentos', icon: <Calendar size={20} />, to: '/appointments' },
      { label: 'Agenda dos Terapeutas', icon: <Clock size={20} />, to: '/schedule' },
      { label: 'Pacientes', icon: <Users size={20} />, to: '/patients' },
      { label: 'Prontuários', icon: <FileText size={20} />, to: '/prontuarios' },
      { label: 'Terapeutas', icon: <User size={20} />, to: '/terapeutas' },
      { label: 'Salas', icon: <LayoutDashboard size={20} />, to: '/rooms' },
      { label: 'Relatórios', icon: <FileText size={20} />, to: '/reports' },
      { label: 'Configurações', icon: <Settings size={20} />, to: '/settings' },
    ],
    assistant: [
      { label: 'Dashboard', icon: <Home size={20} />, to: '/dashboard/assistant' },
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

  // Escolher cores conforme tema
  const bg = theme === 'dark' ? 'bg-gray-900' : 'bg-green-100';
  const border = theme === 'dark' ? 'border-gray-700' : 'border-green-200';
  const text = theme === 'dark' ? 'text-gray-200' : 'text-green-900';
  const hoverBg = theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-green-200';
  const activeBg = theme === 'dark' ? 'bg-gray-800 font-semibold' : 'bg-green-300 font-semibold';
  const toggleBg = theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700 text-gray-200' : 'bg-green-200 hover:bg-green-300 text-green-900';

  return (
    <aside className={`h-screen shadow-md transition-all duration-300 flex flex-col ${isExpanded ? 'w-56' : 'w-20'} ${bg} ${border}`}>
      
      {/* Toggle alinhado à esquerda, mesma altura dos ícones */}
      <div className="flex items-center justify-start p-2 h-12">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`rounded-full p-1 flex items-center justify-center transition ml-2 ${toggleBg}`}
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
                ${isActive ? `${activeBg} ${text}` : `${hoverBg} ${text}`}`}
            >
              {icon}
              {isExpanded && <span className="text-sm">{label}</span>}
            </Link>
          );
        })}
      </nav>

      {isExpanded && (
        <div className={`p-4 mt-auto flex flex-col items-center border-t transition-colors ${theme === 'dark' ? 'border-gray-700' : 'border-green-200'}`}>
          <User size={30} className={`${text} mb-2`} />
          <span className={`font-medium ${text}`}>{user.name || 'Usuário'}</span>
          <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-green-800'}`}>{roleNames[user.role] || 'Cargo Desconhecido'}</span>
        </div>
      )}
    </aside>
  );
}
