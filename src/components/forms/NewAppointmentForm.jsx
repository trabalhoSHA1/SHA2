// src/features/appointments/NewAppointmentForm.jsx
import React, { useState } from 'react';
import { Calendar, Clock, User } from 'lucide-react';

export default function NewAppointmentForm() {
  const [formData, setFormData] = useState({
    patientName: '',
    date: '',
    time: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode enviar os dados para o backend ou Supabase
    console.log('Formulário enviado:', formData);
    // Reset opcional
    setFormData({ patientName: '', date: '', time: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Nome do paciente */}
      <div>
        <label htmlFor="patientName" className="block text-sm font-medium text-gray-700">
          Nome do Paciente
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            name="patientName"
            id="patientName"
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
            placeholder="Digite o nome do paciente"
            value={formData.patientName}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Data */}
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          Data
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Calendar className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="date"
            name="date"
            id="date"
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
            value={formData.date}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Horário */}
      <div>
        <label htmlFor="time" className="block text-sm font-medium text-gray-700">
          Horário
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Clock className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="time"
            name="time"
            id="time"
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
            value={formData.time}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Botão de enviar */}
      <div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Agendar Consulta
        </button>
      </div>
    </form>
  );
}
