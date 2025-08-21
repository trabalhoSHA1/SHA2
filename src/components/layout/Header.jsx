// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Bell } from 'lucide-react';

function capitalize(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}

export default function Header() {
  const { user } = useAuth();

  const formattedRole = capitalize(user?.role);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex items-center justify-between flex-shrink-0">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-md bg-green-300 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-bold text-gray-900 leading-none">SHA</span>
          <span className="text-sm text-gray-700 -mt-0.5">
            Sistema de Humanização e Acolhimento
          </span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <span className="text-sm text-gray-700 hidden sm:block">
          {new Date().toLocaleDateString('pt-BR', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })}
        </span>

        <div className="relative">
          <Bell className="w-5 h-5 text-gray-700" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            2
          </span>
        </div>

        <Link
          to="/perfil"
          className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-xl shadow-sm hover:bg-gray-200 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-green-300 text-white flex items-center justify-center font-semibold text-sm">
            {user?.name?.charAt(0).toUpperCase() || '?'}
          </div>
          <div className="text-sm">
            <p className="text-gray-900 font-medium">{user?.name || 'Usuário'}</p>
            <p className="text-xs text-gray-700 -mt-1">{formattedRole}</p>
          </div>
        </Link>
      </div>
    </header>
  );
}
