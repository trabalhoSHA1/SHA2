// src/pages/SchedulePage.jsx
import React, { useState, useContext } from 'react';
import ScheduleTabs from '../../components/schedule/ScheduleTabs';
import DailySchedule from '../../components/schedule/DailySchedule';
import WeeklySchedule from '../../components/schedule/WeeklySchedule';
import MonthlySchedule from '../../components/schedule/MonthlySchedule';
import { ThemeContext } from '../../context/ThemeContext';

export default function SchedulePage() {
  console.log('рендерizando Página da Agenda');
  
  const [activeTab, setActiveTab] = useState('daily');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  const pageBg = isDark ? 'bg-[#121212]' : 'bg-gray-50';
  const titleColor = isDark ? 'text-gray-200' : 'text-gray-800';
  const textColor = isDark ? 'text-gray-400' : 'text-gray-600';

  return (
    <div className={`p-6 h-full flex flex-col transition-colors duration-300 ${pageBg}`}>
      <div className="mb-6">
        <h1 className={`text-2xl font-bold ${titleColor}`}>
          Minha Agenda
        </h1>
        <p className={`${textColor}`}>
          Acompanhe suas consultas organizadas por dia, semana e mês
        </p>
      </div>
      
      <ScheduleTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="mt-6 flex-1">
        {activeTab === 'daily' && (
          <DailySchedule 
            selectedDate={selectedDate} 
            onDateChange={setSelectedDate}
            isDark={isDark} // passa dark mode pros componentes internos
          />
        )}
        {activeTab === 'weekly' && (
          <WeeklySchedule 
            selectedDate={selectedDate} 
            onDateChange={setSelectedDate}
            isDark={isDark}
          />
        )}
        {activeTab === 'monthly' && (
          <MonthlySchedule 
            selectedDate={selectedDate} 
            onDateChange={setSelectedDate}
            isDark={isDark}
          />
        )}
      </div>
    </div>
  );
}
