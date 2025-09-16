// src/pages/administradores/AdminAppointmentsPage.jsx
import React, { useState, useEffect, useContext } from 'react';
import { Calendar, Filter, Search, Plus } from 'lucide-react';
import AppointmentList from '../../features/appointments/components/AppointmentList';
import { appointmentsMock } from '../../data/appointmentsMock';
import { Button } from '../../components/ui/button';
import ViewAppointmentModal from '../../components/modals/ViewAppointmentModal';
import EditAppointmentModal from '../../components/modals/EditAppointmentModal';
import NewAppointmentModal from '../../components/modals/NewAppointmentModal';
import { ThemeContext } from '@/context/ThemeContext';

export default function AdminAppointmentsPage() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

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
  const handleDelete = (id) => setAppointments(appointments.filter((apt) => apt.id !== id));
  const handleStatusChange = (appointment) =>
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

  // classes dinâmicas dark/light
  const bgCard = isDark ? 'bg-[#1F1F1F] border-[#2C2C2C] text-gray-200' : 'bg-white border-gray-200 text-gray-900';
  const bgFilter = isDark ? 'bg-[#1F1F1F] border-[#2C2C2C] text-gray-200' : 'bg-white border-gray-300 text-gray-900';
  const inputBg = isDark ? 'bg-[#2A2A2A] text-gray-200 border-[#2C2C2C]' : 'bg-white text-gray-900 border-gray-300';
  const pageBg = isDark ? 'bg-[#121212]' : 'bg-gray-50';

  return (
    <div className={`w-full p-6 transition-colors duration-300 ${pageBg}`}>
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className={`text-2xl sm:text-3xl font-bold mb-1 ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
            Gerenciamento de Consultas
          </h1>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            Visualize e gerencie todos os compromissos
          </p>
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
      <div className={`rounded-lg shadow-sm border p-4 sm:p-6 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 transition-colors ${bgFilter}`}>
        <div className="flex items-center gap-3">
          <Calendar className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className={`w-full px-3 py-2 rounded-lg border ${inputBg}`}
          />
        </div>
        <div className="flex items-center gap-3">
          <Search className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
          <input
            type="text"
            placeholder="Paciente ou Terapeuta..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full px-3 py-2 rounded-lg border ${inputBg}`}
          />
        </div>
        <div className="flex items-center gap-3">
          <Filter className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className={`w-full px-3 py-2 rounded-lg border ${inputBg}`}
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
        isDark={isDark}
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
