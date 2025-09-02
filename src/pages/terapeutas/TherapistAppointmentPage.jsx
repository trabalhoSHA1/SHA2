// src/pages/terapeutas/TherapistAppointmentsPage.jsx
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, MapPin, Video, Phone, Search, Filter } from 'lucide-react';
import AppointmentList from '../../features/appointments/components/AppointmentList';
import { appointmentsMock } from '../../data/appointmentsMock';

export default function TherapistAppointmentsPage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Futuramente: buscar só os compromissos deste terapeuta
    setAppointments(appointmentsMock);
  }, []);

  const filteredAppointments = appointments.filter((apt) => {
    const matchesDate = apt.date === selectedDate;
    const matchesType = filterType === 'all' || apt.type === filterType;
    const matchesSearch = apt.patient.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDate && matchesType && matchesSearch;
  });

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Minhas Consultas</h1>
        <p className="text-gray-600">Visualize seus compromissos agendados</p>
      </div>

      {/* Controles de filtro */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-blue-600" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex items-center gap-3">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar paciente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex items-center gap-3">
          <Filter className="w-5 h-5 text-gray-400" />
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

      {/* Lista de consultas */}
      <AppointmentList appointments={filteredAppointments} showTherapist={false} />
    </div>
  );
}
