import React, { useState, useEffect } from "react";
import { Calendar, Search, Filter } from "lucide-react";
import AppointmentList from "../../features/appointments/components/AppointmentList";
import ViewAppointmentModal from "../../components/modals/ViewAppointmentModal";
import { appointmentsMock } from "../../data/appointmentsMock";

export default function TherapistAppointmentPage() {
  const loggedTherapist = "Dr. João";

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [filterType, setFilterType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [viewAppointment, setViewAppointment] = useState(null);

  useEffect(() => {
    setAppointments(appointmentsMock);
  }, []);

  const filteredAppointments = appointments.filter((apt) => {
    const matchesTherapist = apt.therapist === loggedTherapist;
    const matchesDate = !apt.date || apt.date === selectedDate;
    const matchesType = filterType === "all" || apt.type === filterType;
    const matchesSearch = apt.patient
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesTherapist && matchesDate && matchesType && matchesSearch;
  });

  const handleViewDetails = (appointment) => setViewAppointment(appointment);
  const handleCloseView = () => setViewAppointment(null);

  return (
    <div className="w-full p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Minhas Consultas</h1>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-blue-600" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        <div className="flex items-center gap-3">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar paciente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        <div className="flex items-center gap-3">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="all">Todas</option>
            <option value="presencial">Presencial</option>
            <option value="online">Online</option>
          </select>
        </div>
      </div>

      {/* Lista */}
      <AppointmentList
        appointments={filteredAppointments}
        isTherapist={true}
        onView={handleViewDetails}
        showTherapist={true} // mostra terapeuta no card se quiser
      />

      {/* Modal detalhes */}
      {viewAppointment && (
        <ViewAppointmentModal
          showModal={!!viewAppointment}
          appointment={viewAppointment}
          onClose={handleCloseView}
        />
      )}
    </div>
  );
}
