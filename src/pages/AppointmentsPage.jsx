import React, { useState } from 'react';
import { Calendar, Clock, User, MapPin, Video, Phone, Filter, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AppointmenstPage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  console.log('рендерizando AppointmentsPage');

  // Mock data - em um app real viria de uma API
  const appointments = [
    {
      id: 1,
      time: '09:00',
      duration: 60,
      patient: 'Maria Silva Santos',
      type: 'presencial',
      room: 'Sala 101',
      status: 'confirmado',
      contact: '(11) 99999-9999',
      email: 'maria.silva@email.com'
    },
    {
      id: 2,
      time: '10:30',
      duration: 60,
      patient: 'João Santos Lima',
      type: 'online',
      status: 'confirmado',
      contact: '(11) 88888-8888',
      email: 'joao.santos@email.com'
    },
    {
      id: 3,
      time: '11:30',
      duration: 60,
      patient: 'Ana Costa Pereira',
      type: 'presencial',
      room: 'Sala 102',
      status: 'pendente',
      contact: '(11) 77777-7777',
      email: 'ana.costa@email.com'
    },
    {
      id: 4,
      time: '14:00',
      duration: 90,
      patient: 'Carlos Mendes Almeida',
      type: 'online',
      status: 'cancelado',
      contact: '(11) 66666-6666',
      email: 'carlos.mendes@email.com'
    },
    {
      id: 5,
      time: '15:30',
      duration: 60,
      patient: 'Fernanda Almeida Rocha',
      type: 'presencial',
      room: 'Sala 103',
      status: 'confirmado',
      contact: '(11) 55555-5555',
      email: 'fernanda.almeida@email.com'
    }
  ];

  // Filtrar compromissos
  const filteredAppointments = appointments.filter(apt => {
    const matchesType = filterType === 'all' || apt.type === filterType;
    const matchesSearch = apt.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         apt.room?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesType && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmado': return 'bg-green-100 text-green-800 border-green-300';
      case 'pendente': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'cancelado': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getTypeIcon = (type) => {
    return type === 'presencial' ? 
      <MapPin className="w-4 h-4" /> : 
      <Video className="w-4 h-4" />;
  };

  const getTypeColor = (type) => {
    return type === 'presencial' ? 
      'text-blue-600' : 
      'text-purple-600';
  };

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      {/* Cabeçalho */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Minha Agenda</h1>
        <p className="text-gray-600">Visualize seus compromissos e consultas agendadas</p>
      </div>

      {/* Controles Superiores */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

          {/* Busca */}
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-gray-400" />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Buscar Paciente
              </label>
              <input
                type="text"
                placeholder="Nome do paciente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filtros */}
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
      </div>

      {/* Lista de Compromissos */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Compromissos do Dia ({filteredAppointments.length})
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                Presencial: {filteredAppointments.filter(a => a.type === 'presencial').length}
              </span>
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                Online: {filteredAppointments.filter(a => a.type === 'online').length}
              </span>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
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
            filteredAppointments.map((appointment) => (
              <div key={appointment.id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">{appointment.time}</p>
                      <p className="text-sm text-gray-500">{appointment.duration} min</p>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-900">{appointment.patient}</span>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      {appointment.type === 'presencial' ? (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{appointment.room}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <Video className="w-4 h-4" />
                          <span>Online</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        <span>{appointment.contact}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>{appointment.email}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(appointment.status)}`}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </span>
                    
                    {appointment.type === 'online' && appointment.status === 'confirmado' && (
                      <Button className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm">
                        <Video className="w-4 h-4" />
                        Entrar
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}