// src/pages/administradores/AdminAppointmentsPage.jsx
import React, { useState, useEffect } from 'react';
import { Calendar, Filter, Search, Plus } from 'lucide-react';
import AppointmentList from '../../features/appointments/components/AppointmentList';
import { appointmentsMock } from '../../data/appointmentsMock';
import { Button } from '../../components/ui/button';

export default function AdminAppointmentsPage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Futuramente: buscar todos os compromissos do banco de dados
    setAppointments(appointmentsMock);
  }, []);

  // Filtrar compromissos por data, tipo e busca
  const filteredAppointments = appointments.filter((apt) => {
    const matchesDate = apt.date === selectedDate;
    const matchesType = filterType === 'all' || apt.type === filterType;
    const matchesSearch =
      apt.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.therapist.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDate && matchesType && matchesSearch;
  });

  const handleNewAppointment = () => {
    // Futuramente abrir modal ou página para criar nova consulta
    alert('Abrir modal ou página para criar nova consulta');
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
            Gerenciamento de Consultas
          </h1>
          <p className="text-gray-600">
            Visualize e gerencie todos os compromissos
          </p>
        </div>
        <Button
          onClick={handleNewAppointment}
          className="mt-4 sm:mt-0 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          <Plus className="w-4 h-4" />
          Nova Consulta
        </Button>
      </div>

      {/* Controles de filtro */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Seletor de Data */}
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-blue-600" />
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Selecionar Data
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Campo de busca */}
        <div className="flex items-center gap-3">
          <Search className="w-5 h-5 text-gray-400" />
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Buscar
            </label>
            <input
              type="text"
              placeholder="Paciente ou Terapeuta..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Filtro de tipo de consulta */}
        <div className="flex items-center gap-3">
          <Filter className="w-5 h-5 text-gray-400" />
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Consulta
            </label>
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

      {/* Lista de consultas */}
      <AppointmentList appointments={filteredAppointments} showTherapist />
    </div>
  );
}
