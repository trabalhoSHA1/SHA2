// src/components/layout/Header.jsx
import React from 'react';
import { useAuth } from '../../context/AuthContext'; // Acessa o contexto de autenticação

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
        <div>
          <h1 className="text-xl font-bold text-gray-900">SHA - Sistema de Humanização e Acolhimento</h1>
          <p className="text-sm text-gray-500">Dashboard do Terapeuta</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500">
          {new Date().toLocaleDateString('pt-BR', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </span>

        <div className="relative">
          <button className="p-2 rounded-full bg-blue-500 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            </svg>
          </button>
          <span className="absolute top-0 right-0 inline-block w-4 h-4 bg-red-500 rounded-full text-white text-xs">2</span>
        </div>

        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center text-white font-medium">
          {user?.name?.charAt(0).toUpperCase() || '?'}
        </div>
      </div>
    </header>
  );
};

export default Header;