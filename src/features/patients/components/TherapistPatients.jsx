import React from 'react';
import PatientList from './PatientList'; // Você pode criar um filtro depois só para os pacientes do terapeuta

export default function TherapistPatients() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Meus Pacientes</h1>
      <PatientList />
    </div>
  );
}
