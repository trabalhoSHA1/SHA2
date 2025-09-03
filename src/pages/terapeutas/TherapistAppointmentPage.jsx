// src/pages/therapist/TherapistAppointmentPage.jsx
import React, { useState } from 'react';
import { Calendar, Clock, User, MapPin, Video, Phone, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { appointmentsMock } from '@/data/appointmentsMock';

export default function TherapistAppointmentPage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrar compromissos
  const filteredAppointments = appointmentsMock.filter(apt => {
    const matchesType = filterType === 'all' || apt.type === filterType;
    const matchesSearch =
      apt.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (apt.room?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    const matchesDate = apt.date === selectedDate;

    return matchesType && matchesSearch && matchesDate;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmado': return 'bg-green-100 text-green-800 border-green-300';
      case 'pendente': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'cancelado': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Cabeçalho alinhado à esquerda */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Minhas Consultas</h1>
        <p className="text-gray-600">Visualize seus compromissos e consultas agendadas</p>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Seletor de data */}
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-blue-600" />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Selecionar Data</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Busca */}
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-gray-400" />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Buscar Paciente</label>
              <input
                type="text"
                placeholder="Nome do paciente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filtro tipo */}
          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-gray-400" />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Consulta</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Todas</option>
                <option value="presencial">Presencial</option>
                <option value="online">Online</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de compromissos */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {filteredAppointments.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum compromisso encontrado</h3>
            <p className="text-gray-500">
              {searchTerm || filterType !== 'all' 
                ? 'Nenhum compromisso corresponde aos filtros selecionados.' 
                : 'Nenhum compromisso agendado para esta data.'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredAppointments.map((apt) => (
              <div key={apt.id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  {/* Horário */}
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">{apt.time}</p>
                      <p className="text-sm text-gray-500">{apt.duration} min</p>
                    </div>
                  </div>

                  {/* Paciente */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-900">{apt.patient}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      {apt.type === 'presencial' ? (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{apt.room}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <Video className="w-4 h-4" />
                          <span>Online</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        <span>{apt.contact}</span>
                      </div>
                    </div>
                  </div>

                  {/* Status e botão entrar */}
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(apt.status)}`}>
                      {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                    </span>

                    {apt.type === 'online' && apt.status === 'confirmado' && (
                      <Button className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm">
                        <Video className="w-4 h-4" />
                        Entrar
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
