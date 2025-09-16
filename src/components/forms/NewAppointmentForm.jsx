// src/components/modals/NewAppointmentModal.jsx
import React, { useState, useContext } from "react";
import { X } from "lucide-react";
import { ThemeContext } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";

export default function NewAppointmentModal({ onClose, onSubmit }) {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const [form, setForm] = useState({
    patient: "",
    therapist: "",
    type: "presencial",
    date: new Date().toISOString().split("T")[0],
    time: "",
    duration: 60,
    room: "",
    contact: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className={`w-full max-w-lg p-6 rounded-xl shadow-lg transition-colors ${isDark ? "bg-[#1F1F1F] text-gray-200" : "bg-white text-gray-900"}`}>
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Nova Consulta</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200/20">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <div className="flex flex-col">
            <label>Paciente</label>
            <input
              type="text"
              name="patient"
              value={form.patient}
              onChange={handleChange}
              className={`px-3 py-2 rounded-lg border ${isDark ? "bg-[#2A2A2A] border-[#2C2C2C] text-gray-200" : "bg-white border-gray-300 text-gray-900"}`}
              required
            />
          </div>

          <div className="flex flex-col">
            <label>Terapeuta</label>
            <input
              type="text"
              name="therapist"
              value={form.therapist}
              onChange={handleChange}
              className={`px-3 py-2 rounded-lg border ${isDark ? "bg-[#2A2A2A] border-[#2C2C2C] text-gray-200" : "bg-white border-gray-300 text-gray-900"}`}
              required
            />
          </div>

          <div className="flex gap-2">
            <div className="flex-1 flex flex-col">
              <label>Data</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className={`px-3 py-2 rounded-lg border ${isDark ? "bg-[#2A2A2A] border-[#2C2C2C] text-gray-200" : "bg-white border-gray-300 text-gray-900"}`}
                required
              />
            </div>

            <div className="flex-1 flex flex-col">
              <label>Hora</label>
              <input
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                className={`px-3 py-2 rounded-lg border ${isDark ? "bg-[#2A2A2A] border-[#2C2C2C] text-gray-200" : "bg-white border-gray-300 text-gray-900"}`}
                required
              />
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex-1 flex flex-col">
              <label>Duração (min)</label>
              <input
                type="number"
                name="duration"
                value={form.duration}
                onChange={handleChange}
                className={`px-3 py-2 rounded-lg border ${isDark ? "bg-[#2A2A2A] border-[#2C2C2C] text-gray-200" : "bg-white border-gray-300 text-gray-900"}`}
              />
            </div>

            <div className="flex-1 flex flex-col">
              <label>Tipo</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className={`px-3 py-2 rounded-lg border ${isDark ? "bg-[#2A2A2A] border-[#2C2C2C] text-gray-200" : "bg-white border-gray-300 text-gray-900"}`}
              >
                <option value="presencial">Presencial</option>
                <option value="online">Online</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col">
            <label>Sala / Link</label>
            <input
              type="text"
              name="room"
              value={form.room}
              onChange={handleChange}
              className={`px-3 py-2 rounded-lg border ${isDark ? "bg-[#2A2A2A] border-[#2C2C2C] text-gray-200" : "bg-white border-gray-300 text-gray-900"}`}
            />
          </div>

          <div className="flex gap-2">
            <div className="flex-1 flex flex-col">
              <label>Contato</label>
              <input
                type="text"
                name="contact"
                value={form.contact}
                onChange={handleChange}
                className={`px-3 py-2 rounded-lg border ${isDark ? "bg-[#2A2A2A] border-[#2C2C2C] text-gray-200" : "bg-white border-gray-300 text-gray-900"}`}
              />
            </div>
            <div className="flex-1 flex flex-col">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className={`px-3 py-2 rounded-lg border ${isDark ? "bg-[#2A2A2A] border-[#2C2C2C] text-gray-200" : "bg-white border-gray-300 text-gray-900"}`}
              />
            </div>
          </div>

          <Button type="submit" className="mt-4 bg-green-500 hover:bg-green-600 text-white">
            Salvar Consulta
          </Button>
        </form>
      </div>
    </div>
  );
}
