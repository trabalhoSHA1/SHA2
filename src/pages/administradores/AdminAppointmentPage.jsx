// src/pages/administradores/AdminAppointmentsPage.jsx
import React, { useState, useEffect } from 'react';
import { Calendar, Filter, Search, Plus, X } from 'lucide-react';
import AppointmentList from '../../features/appointments/components/AppointmentList';
import { appointmentsMock } from '../../data/appointmentsMock';
import { Button } from '../../components/ui/button';
import ViewAppointmentModal from '../../components/modals/ViewAppointmentModal';
import EditAppointmentModal from '../../components/modals/EditAppointmentModal';

export default function AdminAppointmentsPage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    patient: '',
    date: '',
    time: '',
    therapist: '',
    type: 'presencial',
  });
  const [viewAppointment, setViewAppointment] = useState(null);
  const [editAppointment, setEditAppointment] = useState(null); 

  useEffect(() => {
    setAppointments(appointmentsMock);
  }, []);

  const filteredAppointments = appointments.filter((apt) => {
    const matchesDate = !apt.date || apt.date === selectedDate;
    const matchesType = filterType === 'all' || apt.type === filterType;
    const matchesSearch =
      apt.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.therapist.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDate && matchesType && matchesSearch;
  });

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => {
    setNewAppointment({ ...newAppointment, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newApt = {
      ...newAppointment,
      id: Date.now(),
      status: 'pendente',
    };
    setAppointments([...appointments, newApt]);
    setNewAppointment({ patient: '', date: '', time: '', therapist: '', type: 'presencial' });
    handleCloseModal();
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

  const handleEdit = (appointment) => {
    setEditAppointment(appointment);
  };

  const handleSaveEditedAppointment = (updatedAppointment) => {
    setAppointments(
      appointments.map((apt) =>
        apt.id === updatedAppointment.id ? updatedAppointment : apt
      )
    );
    setEditAppointment(null);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
            Gerenciamento de Consultas
          </h1>
          <p className="text-gray-600">Visualize e gerencie todos os compromissos</p>
        </div>
        <Button
          onClick={handleOpenModal}
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
        isAdmin = {false}
        isTherapist = {true}
        onView={handleViewDetails}
        onEdit={handleEdit} 
        onChangeStatus={handleStatusChange}
        onDelete={handleDelete}
      />

      {/* Modal nova consulta */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold mb-4">Nova Consulta</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="patient"
                placeholder="Paciente"
                value={newAppointment.patient}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <input
                type="text"
                name="therapist"
                placeholder="Terapeuta"
                value={newAppointment.therapist}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <input
                type="date"
                name="date"
                value={newAppointment.date}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <input
                type="time"
                name="time"
                value={newAppointment.time}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <select
                name="type"
                value={newAppointment.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="presencial">Presencial</option>
                <option value="online">Online</option>
              </select>
              <button
                type="submit"
                className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Agendar Consulta
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal detalhes da consulta */}
      {viewAppointment && (
        <ViewAppointmentModal
          appointment={viewAppointment}
          onClose={handleCloseView}
        />
      )}

      {/* Modal edição da consulta */}
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
