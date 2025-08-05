// src/components/patients/PatientStats.jsx
import React from 'react';
import { User, Calendar, Video, TrendingUp } from 'lucide-react';

export default function PatientStats({ stats }) {
  console.log('рендерizando PatientStats:', stats);
  
  const defaultStats = {
    consultationsToday: 4,
    activePatients: 12,
    onlineToday: 2,
    firstTime: 1
  };
  
  const statistics = stats || defaultStats;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500">
        <div className="flex items-center">
          <Calendar className="w-8 h-8 text-green-500" />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-500">Consultas Hoje</p>
            <p className="text-2xl font-bold text-gray-900">{statistics.consultationsToday}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
        <div className="flex items-center">
          <User className="w-8 h-8 text-blue-500" />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-500">Pacientes Ativos</p>
            <p className="text-2xl font-bold text-gray-900">{statistics.activePatients}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-purple-500">
        <div className="flex items-center">
          <Video className="w-8 h-8 text-purple-500" />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-500">Online Hoje</p>
            <p className="text-2xl font-bold text-gray-900">{statistics.onlineToday}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-yellow-500">
        <div className="flex items-center">
          <TrendingUp className="w-8 h-8 text-yellow-500" />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-500">Primeira Vez</p>
            <p className="text-2xl font-bold text-gray-900">{statistics.firstTime}</p>
          </div>
        </div>
      </div>
    </div>
  );
}