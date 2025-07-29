// src/components/layout/Sidebar.jsx
import React, { useState } from 'react';
import { 
  Home,
  Calendar,
  FileText,
} from 'lucide-react';

const Sidebar = ({ isOpen = true, onToggle, activeSection = 'dashboard', onSectionChange }) => {
  const userType = 'therapist'; // Deve vir de useAuth() em projetos reais

  const getMenuItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Visão Geral', icon: Home, allowed: ['therapist'] },
      { id: 'my-schedule', label: 'Minha Agenda', icon: Calendar, allowed: ['therapist'] },
      { id: 'patients', label: 'Pacientes', icon: FileText, allowed: ['therapist'] },
    ];

    return baseItems.filter(item => item.allowed.includes(userType));
  };

  const menuItems = getMenuItems();

  return (
    <div className={`fixed left-0 top-0 h-full bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700 transition-all duration-300 z-40 ${
      isOpen ? 'w-64 translate-x-0' : 'w-16 -translate-x-full lg:translate-x-0'
    }`}>
      {/* Cabeçalho do sidebar */}
      <div className="p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          {isOpen && (
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Menu</h2>
          )}
          <button
            onClick={onToggle}
            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle Sidebar"
          >
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Navegação */}
      <nav className="p-2 sm:p-4 space-y-1 sm:space-y-2 overflow-y-auto h-[calc(100vh-80px)]">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                onSectionChange(item.id);
                if (window.innerWidth < 1024) {
                  onToggle();
                }
              }}
              className={`flex-1 flex items-center gap-3 px-2 sm:px-3 py-2 sm:py-3 rounded-md text-sm font-medium transition-all ${
                isActive
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              title={!isOpen ? item.label : ''}
            >
              <Icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              {isOpen && (
                <span className="font-medium text-sm sm:text-base">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;