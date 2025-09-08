// src/components/Header.jsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Bell, LogOut } from 'lucide-react';
import { ThemeContext } from '@/context/ThemeContext';

const roleLabels = {
  therapist: 'Terapeuta',
  assistant: 'Assistente',
  admin: 'Administrador',
};

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const formattedRole = roleLabels[user?.role] || 'Usuário';

  const handleLogout = async () => {
    try {
      await logout(); 
      navigate('/login'); 
    } catch (error) {
      console.error('Erro ao deslogar:', error);
    }
  };

  // Cores dinâmicas para dark/light mode
  const bg = theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';
  const text = theme === 'dark' ? 'text-gray-100' : 'text-gray-900';
  const textSecondary = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';
  const bgProfile = theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200';
  const bgAvatar = theme === 'dark' ? 'bg-green-600' : 'bg-green-300';
  const btnLogoutBg = theme === 'dark' ? 'bg-red-700 hover:bg-red-600' : 'bg-red-100 hover:bg-red-200';
  const btnLogoutText = theme === 'dark' ? 'text-red-200' : 'text-red-600';
  const bellColor = theme === 'dark' ? 'text-gray-200' : 'text-gray-700';

  return (
    <header className={`${bg} shadow-sm border-b px-6 py-4 flex items-center justify-between flex-shrink-0 transition-colors duration-300`}>
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-md ${bgAvatar} flex items-center justify-center`}>
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
          <span className={`text-lg font-bold leading-none ${text}`}>SHA</span>
          <span className={`text-sm -mt-0.5 ${textSecondary}`}>
            Setor de Humanização e Acolhimento
          </span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <span className={`text-sm hidden sm:block ${textSecondary}`}>
          {new Date().toLocaleDateString('pt-BR', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })}
        </span>

        <div className="relative">
          <Bell className={`w-5 h-5 ${bellColor}`} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            2
          </span>
        </div>

        <Link
          to="/perfil"
          className={`flex items-center gap-2 px-3 py-1 rounded-xl shadow-sm transition-colors ${bgProfile}`}
        >
          <div className={`w-8 h-8 rounded-full ${bgAvatar} text-white flex items-center justify-center font-semibold text-sm`}>
            {user?.name?.charAt(0).toUpperCase() || '?'}
          </div>
          <div className="text-sm">
            <p className={`${text} font-medium`}>{user?.name || 'Usuário'}</p>
            <p className={`text-xs -mt-1 ${textSecondary}`}>{formattedRole}</p>
          </div>
        </Link>

        <button
          onClick={handleLogout}
          className={`p-2 rounded-full transition ${btnLogoutBg}`}
          title="Sair"
        >
          <LogOut className={`w-5 h-5 ${btnLogoutText}`} />
        </button>
      </div>
    </header>
  );
}
