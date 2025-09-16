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
  isDark = false,
}) {
  if (!appointments || appointments.length === 0) {
    return (
      <div className={`p-8 text-center rounded-lg border ${
        isDark ? "bg-[#1F1F1F] border-[#2C2C2C] text-gray-200" : "bg-white border-gray-200 text-gray-900"
      }`}>
        <Calendar className={`w-12 h-12 mx-auto mb-4 ${isDark ? "text-gray-400" : "text-gray-300"}`} />
        <h3 className="text-lg font-medium mb-2">Nenhum compromisso encontrado</h3>
        <p className={isDark ? "text-gray-400" : "text-gray-500"}>
          Nenhum compromisso agendado para esta data ou filtros aplicados.
        </p>
      </div>
    );
  }

  return (
    <div className={`rounded-lg shadow-sm border divide-y transition-colors ${
      isDark ? "bg-[#1F1F1F] border-[#2C2C2C] divide-[#2C2C2C]" : "bg-white border-gray-200 divide-gray-200"
    }`}>
      {appointments.map((apt) => (
        <AppointmentCard
          key={apt.id}
          appointment={apt}
          showTherapist={showTherapist}
          isAdmin={isAdmin}
          isTherapist={isTherapist}
          onView={onView}
          onEdit={isAdmin ? onEdit : undefined}
          onChangeStatus={isAdmin ? onChangeStatus : undefined}
          onDelete={isAdmin ? onDelete : undefined}
          isDark={isDark}
        />
      ))}
    </div>
  );
}
