// src/shared/components/appointments/AppointmentCard.jsx
import React from 'react';
import { Clock, User, MapPin, Video, Phone, Mail, Eye, Edit, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AppointmentCard({ appointment, showTherapist, isAdmin, isTherapist = false }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmado': return 'bg-green-100 text-green-800 border-green-300';
      case 'pendente': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'cancelado': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const isOnline = appointment.type === 'online';

  const handleView = () => {
    alert(`Visualizar detalhes da consulta de ${appointment.patient}`);
  };

  const handleEdit = () => {
    alert(`Editar consulta de ${appointment.patient}`);
  };

  const handleChangeStatus = () => {
    const newStatus = prompt(
      `Mudar status da consulta de ${appointment.patient}`,
      appointment.status
    );
    if (newStatus) {
      alert(`Status alterado para: ${newStatus}`);
      // Futuramente atualizar no banco
    }
  };

  return (
    <div className="p-4 sm:p-6 hover:bg-gray-50 transition-colors border-b border-gray-200 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
      
      {/* Informações principais */}
      <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Horário */}
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-blue-600" />
          <div>
            <p className="font-medium text-gray-900">{appointment.time}</p>
            <p className="text-sm text-gray-500">{appointment.duration} min</p>
          </div>
        </div>

        {/* Paciente e terapeuta */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <User className="w-4 h-4 text-gray-400" />
            <span className="font-medium text-gray-900">{appointment.patient}</span>
            {showTherapist && (
              <span className="ml-4 text-sm text-gray-600">Terapeuta: {appointment.therapist}</span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            {isOnline ? (
              <div className="flex items-center gap-1">
                <Video className="w-4 h-4" />
                <span>Online</span>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{appointment.room}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span>{appointment.contact}</span>
            </div>
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              <span>{appointment.email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Status e ações administrativas */}
      <div className="flex items-center gap-3 mt-2 sm:mt-0">
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(appointment.status)}`}>
          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
        </span>

        {isOnline && appointment.status === 'confirmado' && (
          <Button className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm">
            <Video className="w-4 h-4" />
            Entrar
          </Button>
        )}

        {isAdmin && (
          <div className="flex items-center gap-2">
            <button onClick={handleView} title="Visualizar" className="p-2 text-gray-500 hover:text-green-600 rounded-full hover:bg-gray-100">
              <Eye className="w-5 h-5" />
            </button>
            <button onClick={handleEdit} title="Editar" className="p-2 text-gray-500 hover:text-green-600 rounded-full hover:bg-gray-100">
              <Edit className="w-5 h-5 text-black-600" />
            </button>
            <button onClick={handleChangeStatus} title="Mudar Status" className="p-2 text-gray-500 hover:text-green-600 rounded-full hover:bg-gray-100">
              <Check className="w-5 h-5 text-black-600" />
            </button>
          </div>
        )}

         {isTherapist && (
          <div className="flex items-center gap-2">
            <button onClick={handleView} title="Visualizar" className="p-2 text-gray-500 hover:text-green-600 rounded-full hover:bg-gray-100">
              <Eye className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
