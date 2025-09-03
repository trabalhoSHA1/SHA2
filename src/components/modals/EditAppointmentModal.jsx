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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
        
        {/* Botão fechar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Cabeçalho */}
        <h2 className="text-xl font-bold mb-6 text-gray-900">Editar Consulta</h2>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="patient"
            placeholder="Paciente"
            value={formData.patient}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          />

          <input
            type="text"
            name="therapist"
            placeholder="Terapeuta"
            value={formData.therapist}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          />

          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          />

          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Duração (minutos)"
          />

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="presencial">Presencial</option>
            <option value="online">Online</option>
          </select>

          {formData.type === "presencial" && (
            <input
              type="text"
              name="room"
              placeholder="Sala"
              value={formData.room}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          )}

          <input
            type="text"
            name="contact"
            placeholder="Contato"
            value={formData.contact}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          />

          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="pendente">Pendente</option>
            <option value="confirmado">Confirmado</option>
            <option value="cancelado">Cancelado</option>
          </select>

          <button
            type="submit"
            className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Salvar Alterações
          </button>
        </form>
      </div>
    </div>
  );
}
