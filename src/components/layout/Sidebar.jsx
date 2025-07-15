// src/components/layout/Sidebar.jsx
import React from 'react';
import { 
  Home,
  Users as User,
  Calendar,
  FileText,
  Users,
  Clock,
  UserCheck,
  Building,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const Sidebar = ({ isOpen, onToggle, activeSection, onSectionChange, userType }) => {
  const getMenuItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Dashboard', icon: Home, allowed: ['therapist', 'admin', 'assistant'] },
      { id: 'my-schedule', label: 'Minha Agenda', icon: Calendar, allowed: ['therapist'] },
      { id: 'profile', label: 'Meu Perfil', icon: UserCheck, allowed: ['therapist', 'admin', 'assistant'] },
      { id: 'appointments', label: 'Agendamentos', icon: Calendar, allowed: ['therapist', 'admin', 'assistant'] },
      { id: 'therapist-schedules', label: 'Agenda dos Terapeutas', icon: Clock, allowed: ['admin', 'assistant'] },
      { id: 'patients', label: 'Pacientes', icon: Users, allowed: ['admin', 'assistant'] },
      { id: 'medical-records', label: 'Prontuários', icon: FileText, allowed: ['therapist', 'admin'] },
    ];

    const adminItems = [
      { id: 'therapists', label: 'Terapeutas', icon: UserCheck, allowed: ['admin'] },
      { id: 'rooms', label: 'Salas', icon: Building, allowed: ['admin'] },
      { id: 'reports', label: 'Relatórios', icon: BarChart3, allowed: ['admin'] },
      { id: 'settings', label: 'Configurações', icon: Settings, allowed: ['admin', 'therapist', 'assistant'] },
    ];

    return [...baseItems, ...adminItems].filter(item => 
      item.allowed.includes(userType)
    );
  };

  const menuItems = getMenuItems();

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      <div className={`fixed left-0 top-0 h-full bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700 transition-all duration-300 z-40 ${
        isOpen ? 'w-64 translate-x-0' : 'w-16 -translate-x-full lg:translate-x-0'
      }`}>
        <div className="p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            {isOpen && (
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Menu</h2>
            )}
            <button
              onClick={onToggle}
              className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {isOpen ? <ChevronLeft /> : <ChevronRight />}
            </button>
          </div>
        </div>

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
                className={`w-full flex items-center gap-3 px-2 sm:px-3 py-2 sm:py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-md'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
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
    </>
  );
};

export default Sidebar;