import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home, User, Calendar, Clock, Users, FileText, LayoutDashboard, Settings, ChevronRight, ChevronLeft,
} from 'lucide-react';

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false); 
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', icon: <Home size={20} />, to: '/dashboard/therapist' },
    { label: 'Consultas', icon: <Calendar size={20} />, to: '/appointments' },
    { label: 'Pacientes', icon: <Users size={20} />, to: '/patients' },
    { label: 'Prontuários', icon: <FileText size={20} />, to: '/prontuarios' },
    { label: 'Meu Perfil', icon: <User size={20} />, to: '/profile' },
    { label: 'Configurações', icon: <Settings size={20} />, to: '/settings' },
  ];

  return (
    <aside className={`h-screen bg-green-50 border-r shadow-md transition-all duration-300 flex flex-col ${isExpanded ? 'w-56' : 'w-20'}`}>
      
      {/* Botão da setinha */}
      <div className="flex items-center justify-end p-2">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-green-200 hover:bg-green-300 text-green-800 rounded-full p-1 transition"
        >
          {isExpanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>

      <nav className="flex-1 space-y-1 px-2">
        {navItems.map(({ label, icon, to }) => {
          const isActive = location.pathname === to;
          return (
            <Link
              key={label}
              to={to}
              className={`flex items-center gap-3 p-2 rounded-md transition-all 
                ${isActive ? 'bg-green-100 text-green-700 font-semibold' : 'hover:bg-green-100 text-gray-700'}
              `}
            >
              {icon}
              {isExpanded && <span className="text-sm">{label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
