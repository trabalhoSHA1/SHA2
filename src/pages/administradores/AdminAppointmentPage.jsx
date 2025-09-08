// src/pages/administradores/AdminAppointmentsPage.jsx
import React, { useState, useEffect } from 'react';
import { Calendar, Filter, Search, Plus } from 'lucide-react';
import AppointmentList from '../../features/appointments/components/AppointmentList';
import { appointmentsMock } from '../../data/appointmentsMock';
import { Button } from '../../components/ui/button';
import ViewAppointmentModal from '../../components/modals/ViewAppointmentModal';
import EditAppointmentModal from '../../components/modals/EditAppointmentModal';
import NewAppointmentModal from '../../components/modals/NewAppointmentModal';

export default function AdminAppointmentsPage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [appointments, setAppointments] = useState([]);

  // modais
  const [showNewModal, setShowNewModal] = useState(false);
  const [viewAppointment, setViewAppointment] = useState(null);
  const [editAppointment, setEditAppointment] = useState(null);

  useEffect(() => {
    setAppointments(appointmentsMock);
  }, []);

  // --- filtros ---
  const filteredAppointments = appointments.filter((apt) => {
    const matchesDate = !apt.date || apt.date === selectedDate;
    const matchesType = filterType === 'all' || apt.type === filterType;
    const matchesSearch =
      apt.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.therapist.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDate && matchesType && matchesSearch;
  });

  // --- CRUD ---
  const handleSaveNewAppointment = (appointment) => {
    setAppointments((prev) => [...prev, appointment]);
  };

  const handleDelete = (id) => {
    setAppointments(appointments.filter((apt) => apt.id !== id));
  };

  const handleStatusChange = (appointment) => {
    setAppointments(
      appointments.map((apt) =>
        apt.id === appointment.id
          ? {
              ...apt,
              status:
                apt.status === 'pendente'
                  ? 'confirmado'
                  : apt.status === 'confirmado'
                  ? 'cancelado'
                  : 'pendente',
            }
          : apt
      )
    );
  };

  const handleViewDetails = (appointment) => setViewAppointment(appointment);
  const handleCloseView = () => setViewAppointment(null);

  const handleEdit = (appointment) => setEditAppointment(appointment);
  const handleSaveEditedAppointment = (updatedAppointment) => {
    setAppointments(
      appointments.map((apt) =>
        apt.id === updatedAppointment.id ? updatedAppointment : apt
      )
    );
    setEditAppointment(null);
  };

  return (
    <div className="w-full p-6">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
            Gerenciamento de Consultas
          </h1>
          <p className="text-gray-600">Visualize e gerencie todos os compromissos</p>
        </div>
        <Button
          onClick={() => setShowNewModal(true)}
          className="mt-4 sm:mt-0 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          <Plus className="w-4 h-4" />
          Nova Consulta
        </Button>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-blue-600" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex items-center gap-3">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Paciente ou Terapeuta..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex items-center gap-3">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="all">Todas</option>
            <option value="presencial">Presencial</option>
            <option value="online">Online</option>
          </select>
        </div>
      </div>

      {/* Lista de consultas */}
      <AppointmentList
        appointments={filteredAppointments}
        showTherapist
        isAdmin={true}
        onView={handleViewDetails}
        onEdit={handleEdit}
        onChangeStatus={handleStatusChange}
        onDelete={handleDelete}
      />

      {/* Modal nova consulta */}
      <NewAppointmentModal
        showModal={showNewModal}
        onClose={() => setShowNewModal(false)}
        onSave={handleSaveNewAppointment}
      />

      {/* Modal detalhes */}
      {viewAppointment && (
        <ViewAppointmentModal
          appointment={viewAppointment}
          onClose={handleCloseView}
        />
      )}

      {/* Modal edição */}
      {editAppointment && (
        <EditAppointmentModal
          appointment={editAppointment}
          onClose={() => setEditAppointment(null)}
          onSave={handleSaveEditedAppointment}
        />
      )}
    </div>
  );
}
