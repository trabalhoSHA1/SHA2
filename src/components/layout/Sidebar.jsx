// src/components/layout/Sidebar.jsx
import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';
import {
  Home, User, Calendar, Clock, Users, FileText, LayoutDashboard, Settings, ChevronRight, ChevronLeft
} from 'lucide-react';

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false); 
  const location = useLocation();
  const { user } = useContext(AuthContext); // Pega usuário logado

  if (!user) return null; // Se não houver usuário, não mostra sidebar

  const role = user.role; // role = 'admin', 'therapist' ou 'assistant'

  // Define os itens de navegação dependendo do role
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
        // therapist
        { label: 'Dashboard', icon: <Home size={20} />, to: '/dashboard/therapist' },
        { label: 'Consultas', icon: <Calendar size={20} />, to: '/appointments' },
        { label: 'Pacientes', icon: <Users size={20} />, to: '/patients' },
        { label: 'Prontuários', icon: <FileText size={20} />, to: '/prontuarios' },
        { label: 'Configurações', icon: <Settings size={20} />, to: '/settings' },
      ];

  return (
    <aside className={`h-screen bg-green-100 border-r border-green-200 shadow-md transition-all duration-300 flex flex-col ${isExpanded ? 'w-56' : 'w-20'}`}>
      {/* Botão da setinha */}
      <div className="flex items-center justify-end p-2">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-green-200 hover:bg-green-300 text-green-900 rounded-full p-1 transition"
        >
          {isExpanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>

      {/* Navegação */}
      <nav className="flex-1 space-y-1 px-2">
        {navItems.map(({ label, icon, to }) => {
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

      {/* Card do usuário logado */}
      {isExpanded && user && (
        <div className="p-4 mt-auto flex flex-col items-center border-t border-green-200">
          <User size={30} className="text-green-900 mb-2" />
          <span className="font-medium text-green-900">{user.name}</span>
          <span className="text-sm text-green-800">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span>
        </div>
      )}
    </aside>
  );
}
