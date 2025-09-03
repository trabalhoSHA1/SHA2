// src/shared/components/appointments/modals/ViewAppointmentModal.jsx
import React from "react";
import { X, User, Calendar, Clock, Video, MapPin, Phone, Mail } from "lucide-react";

export default function ViewAppointmentModal({ appointment, onClose }) {
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
        <h2 className="text-xl font-bold mb-6 text-gray-900">Detalhes da Consulta</h2>

        <div className="space-y-4 text-gray-700">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-gray-400" />
            <span><strong>Paciente:</strong> {appointment.patient}</span>
          </div>

          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-gray-400" />
            <span><strong>Terapeuta:</strong> {appointment.therapist}</span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-400" />
            <span><strong>Data:</strong> {appointment.date}</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-400" />
            <span><strong>Hora:</strong> {appointment.time} ({appointment.duration} min)</span>
          </div>

          {appointment.type === "online" ? (
            <div className="flex items-center gap-2">
              <Video className="w-5 h-5 text-gray-400" />
              <span><strong>Tipo:</strong> Online</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-400" />
              <span><strong>Sala:</strong> {appointment.room}</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-gray-400" />
            <span><strong>Contato:</strong> {appointment.contact}</span>
          </div>

          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-gray-400" />
            <span><strong>Email:</strong> {appointment.email}</span>
          </div>

          <div className="mt-4">
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 border border-gray-300">
              Status: {appointment.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
