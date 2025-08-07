// src/pages/SchedulePage.jsx
import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import ScheduleTabs from '../components/schedule/ScheduleTabs';
import DailySchedule from '../components/schedule/DailySchedule';
import WeeklySchedule from '../components/schedule/WeeklySchedule';
import MonthlySchedule from '../components/schedule/MonthlySchedule';

export default function SchedulePage() {
  console.log('рендерizando Página da Agenda');
  
  const [activeTab, setActiveTab] = useState('daily');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  return (
      <div className="p-6 h-full flex flex-col">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Minha Agenda</h1>
          <p className="text-gray-600">Acompanhe suas consultas organizadas por dia, semana e mês</p>
        </div>
        
        <ScheduleTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="mt-6 flex-1">
          {activeTab === 'daily' && (
            <DailySchedule 
              selectedDate={selectedDate} 
              onDateChange={setSelectedDate}
            />
          )}
          {activeTab === 'weekly' && (
            <WeeklySchedule 
              selectedDate={selectedDate} 
              onDateChange={setSelectedDate}
            />
          )}
          {activeTab === 'monthly' && (
            <MonthlySchedule 
              selectedDate={selectedDate} 
              onDateChange={setSelectedDate}
            />
          )}
        </div>
      </div>
  );
}