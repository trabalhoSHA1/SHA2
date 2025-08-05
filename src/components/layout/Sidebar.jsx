// src/components/layout/Sidebar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  console.log('рендерizando Sidebar');
  
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside className={`${isExpanded ? 'w-48' : 'w-20'} bg-gray-800 text-white flex flex-col items-center py-6 space-y-8 h-screen transition-all duration-300 relative`}>
      {/* Botão de toggle */}
      <button
        className={`absolute top-4 ${isExpanded ? 'left-30' : 'left-6'} bg-gray-700 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-gray-600 transition-all duration-300 z-10`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? '>' : '<'}
      </button>

      {/* Ícones do menu */}
      <div className="flex flex-col space-y-2 mt-8">
        <Link to="/dashboard/therapist" className="flex items-center p-2 hover:bg-green-500 rounded-lg transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7m-9 7v-14a1 1 0 011-1h3m-6 0a1 1 0 001 1v14a1 1 0 001 1h3" />
          </svg>
          {isExpanded && <span className="ml-3 text-sm">Dashboard</span>}
        </Link>
        
        <Link to="/profile" className="flex items-center p-2 hover:bg-green-500 rounded-lg transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          {isExpanded && <span className="ml-3 text-sm">Meu Perfil</span>}
        </Link>
        
        <Link to="/appointments" className="flex items-center p-2 hover:bg-green-500 rounded-lg transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {isExpanded && <span className="ml-3 text-sm">Agendamentos</span>}
        </Link>
        
        <Link to="/prontuarios" className="flex items-center p-2 hover:bg-green-500 rounded-lg transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          {isExpanded && <span className="ml-3 text-sm">Prontuários</span>}
        </Link>
        
        <Link to="/settings" className="flex items-center p-2 hover:bg-green-500 rounded-lg transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {isExpanded && <span className="ml-3 text-sm">Configurações</span>}
        </Link>
        <Link to="/patients" className="flex items-center p-2 hover:bg-green-500 rounded-lg transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {isExpanded && <span className="ml-3 text-sm">Pacientes</span>}
        </Link>
  
      </div>
    </aside>
  );
}
