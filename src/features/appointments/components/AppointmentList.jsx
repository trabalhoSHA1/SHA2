// src/features/appointments/components/AppointmentList.jsx
import React from "react";
import AppointmentCard from "./AppointmentCard";
import { Calendar } from "lucide-react";

export default function AppointmentList({
  appointments,
  showTherapist = false,
  isAdmin = false,
  isTherapist = false,
  onView,
  onEdit,
  onChangeStatus,
  onDelete,
}) {
  if (!appointments || appointments.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Nenhum compromisso encontrado
        </h3>
        <p className="text-gray-500">
          Nenhum compromisso agendado para esta data ou filtros aplicados.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 divide-y divide-gray-200">
      {appointments.map((apt) => (
        <AppointmentCard
          key={apt.id}
          appointment={apt}
          showTherapist={showTherapist}
          // Flags de permissões
          isAdmin={isAdmin}
          isTherapist={isTherapist}
          // Ações (cada tipo de usuário só usa as que precisa)
          onView={onView}
          onEdit={isAdmin ? onEdit : undefined}
          onChangeStatus={isAdmin ? onChangeStatus : undefined}
          onDelete={isAdmin ? onDelete : undefined}
        />
      ))}
    </div>
  );
}
