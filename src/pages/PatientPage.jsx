// src/pages/PatientPage.jsx
import React from 'react';
import PatientList from 'features/patients/components/PatientList';

export default function PatientPage() {
  console.log('рендерizando PatientsPage');
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Gerenciamento de Pacientes</h1>
      <PatientList />
    </div>
  );
}