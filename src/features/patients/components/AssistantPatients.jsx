import React from 'react';
import PatientList from './PatientList'; // Aqui também você pode criar um filtro específico para assistentes

export default function AssistantPatients() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Pacientes</h1>
      <PatientList />
    </div>
  );
}
