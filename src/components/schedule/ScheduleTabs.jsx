// src/components/schedule/ScheduleTabs.jsx
import React from 'react';
import { Calendar } from 'lucide-react';

export default function ScheduleTabs({ activeTab, setActiveTab }) {
  console.log('рендерizando Abas da Agenda');
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1 mb-6">
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setActiveTab('daily')}
          className={`flex items-center px-4 py-2 rounded-l-md text-sm font-medium transition-colors ${
            activeTab === 'daily' ? 'bg-white-500 text-white' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <Calendar className="w-4 h-4 mr-2" />
          Diário
        </button>
        <button
          onClick={() => setActiveTab('weekly')}
          className={`flex items-center px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'weekly' ? 'bg-green-500 text-white' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <Calendar className="w-4 h-4 mr-2" />
          Semanal
        </button>
        <button
          onClick={() => setActiveTab('monthly')}
          className={`flex items-center px-4 py-2 rounded-r-md text-sm font-medium transition-colors ${
            activeTab === 'monthly' ? 'bg-green-500 text-white' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <Calendar className="w-4 h-4 mr-2" />
          Mensal
        </button>
      </div>
    </div>
  );
}