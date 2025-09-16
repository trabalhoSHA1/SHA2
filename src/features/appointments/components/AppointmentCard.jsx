import React from 'react';
import { Clock, User, MapPin, Video, Phone, Mail, Eye, Edit, Trash, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AppointmentCard({
  appointment,
  showTherapist,
  isAdmin,
  isTherapist = false,
  onView,
  onEdit,
  onDelete,
  onChangeStatus,
  isDark = false, // tema escuro
}) {
  const getStatusColor = (status) => {
    if (isDark) {
      switch (status) {
        case 'confirmado':
          return 'bg-green-700/20 text-green-400 border-green-700';
        case 'pendente':
          return 'bg-yellow-700/20 text-yellow-400 border-yellow-700';
        case 'cancelado':
          return 'bg-red-700/20 text-red-400 border-red-700';
        default:
          return 'bg-[#1F1F1F] text-gray-200 border-[#2C2C2C]';
      }
    } else {
      switch (status) {
        case 'confirmado':
          return 'bg-green-100 text-green-800 border-green-300';
        case 'pendente':
          return 'bg-yellow-100 text-yellow-800 border-yellow-300';
        case 'cancelado':
          return 'bg-red-100 text-red-800 border-red-300';
        default:
          return 'bg-gray-100 text-gray-800 border-gray-300';
      }
    }
  };

  const isOnline = appointment.type === 'online';

  return (
    <div
      className={`p-4 sm:p-6 transition-colors border-b flex flex-col sm:flex-row sm:items-center gap-4 justify-between
        ${isDark 
          ? 'bg-[#1F1F1F] border-[#2C2C2C] hover:bg-[#2A2A2A] text-gray-200'
          : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-900'}
      `}
    >
      {/* Informações principais */}
      <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Horário */}
        <div className="flex items-center gap-3">
          <Clock className={isDark ? 'w-5 h-5 text-blue-400' : 'w-5 h-5 text-blue-600'} />
          <div>
            <p className="font-medium">{appointment.time}</p>
            <p className={isDark ? 'text-gray-400 text-sm' : 'text-gray-500 text-sm'}>
              {appointment.duration} min
            </p>
          </div>
        </div>

        {/* Paciente e terapeuta */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <User className={isDark ? 'w-4 h-4 text-gray-400' : 'w-4 h-4 text-gray-400'} />
            <span className="font-medium">{appointment.patient}</span>
            {showTherapist && (
              <span className={isDark ? 'ml-4 text-sm text-gray-400' : 'ml-4 text-sm text-gray-600'}>
                Terapeuta: {appointment.therapist}
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm">
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

      {/* Status e ações */}
      <div className="flex items-center gap-3 mt-2 sm:mt-0">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
            appointment.status
          )}`}
        >
          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
        </span>

        {isOnline && appointment.status === 'confirmado' && (
          <Button className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm">
            <Video className="w-4 h-4" />
            Entrar
          </Button>
        )}

        {/* Botões Admin */}
        {isAdmin && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => onView?.(appointment)}
              title="Visualizar"
              className={`p-2 rounded-full hover:text-green-500 ${isDark ? 'text-gray-300 hover:bg-[#2A2A2A]' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              <Eye className="w-5 h-5" />
            </button>
            <button
              onClick={() => onEdit?.(appointment)}
              title="Editar"
              className={`p-2 rounded-full hover:text-green-500 ${isDark ? 'text-gray-300 hover:bg-[#2A2A2A]' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              <Edit className="w-5 h-5" />
            </button>
            <button
              onClick={() => onDelete?.(appointment.id)}
              title="Excluir"
              className={`p-2 rounded-full hover:text-red-500 ${isDark ? 'text-gray-300 hover:bg-[#2A2A2A]' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              <Trash className="w-5 h-5" />
            </button>
            <button
              onClick={() => onChangeStatus?.(appointment)}
              title="Mudar Status"
              className={`p-2 rounded-full hover:text-green-500 ${isDark ? 'text-gray-300 hover:bg-[#2A2A2A]' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              <Check className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Botões Terapeuta */}
        {isTherapist && !isAdmin && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => onView?.(appointment)}
              title="Visualizar"
              className={`p-2 rounded-full hover:text-green-500 ${isDark ? 'text-gray-300 hover:bg-[#2A2A2A]' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              <Eye className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
