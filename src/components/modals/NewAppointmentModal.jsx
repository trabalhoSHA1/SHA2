// src/components/modals/EditAppointmentModal.jsx
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function EditAppointmentModal({ appointment, onClose, onSave }) {
  const [formData, setFormData] = useState({
    patient: "",
    therapist: "",
    date: "",
    time: "",
    duration: 50,
    type: "presencial",
    room: "",
    contact: "",
    email: "",
    status: "pendente",
  });

  useEffect(() => {
    if (appointment) {
      setFormData(appointment);
    }
  }, [appointment]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, id: appointment.id });
    onClose();
  };

  if (!appointment) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative">
        
        {/* Botão fechar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Cabeçalho */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          Editar Consulta
        </h2>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Paciente e Terapeuta */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="patient"
              placeholder="Paciente"
              value={formData.patient}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              name="therapist"
              placeholder="Terapeuta"
              value={formData.therapist}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Data e Hora */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Duração */}
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            placeholder="Duração (minutos)"
          />

          {/* Tipo de consulta */}
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
          >
            <option value="presencial">Presencial</option>
            <option value="online">Online</option>
          </select>

          {/* Sala só se presencial */}
          {formData.type === "presencial" && (
            <input
              type="text"
              name="room"
              placeholder="Sala"
              value={formData.room}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
          )}

          {/* Contato e Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="contact"
              placeholder="Contato"
              value={formData.contact}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Status */}
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
          >
            <option value="pendente">Pendente</option>
            <option value="confirmado">Confirmado</option>
            <option value="cancelado">Cancelado</option>
          </select>

          {/* Botão salvar */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Salvar Alterações
          </button>
        </form>
      </div>
    </div>
  );
}
