// src/components/layout/Header.jsx
import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Bell } from 'lucide-react';

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex items-center justify-between flex-shrink-0">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-md bg-gradient-to-r from-green-400 to-teal-500 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-bold text-gray-900 leading-none">SHA</span>
          <span className="text-sm text-gray-500 -mt-0.5">Sistema de Humanização e Acolhimento</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <span className="text-sm text-gray-500 hidden sm:block">
          {new Date().toLocaleDateString('pt-BR', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })}
        </span>

        <div className="relative">
          <Bell className="w-5 h-5 text-gray-500" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            2
          </span>
        </div>

        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-xl shadow-sm">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-green-500 text-white flex items-center justify-center font-semibold text-sm">
            {user?.name?.charAt(0).toUpperCase() || '?'}
          </div>
          <div className="text-sm">
            <p className="text-gray-800 font-medium">{user?.name || 'Usuário'}</p>
            <p className="text-xs text-gray-500 -mt-1">Terapeuta</p>
          </div>
        </div>
      </div>
    </header>
  );
}
