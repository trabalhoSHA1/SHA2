// src/pages/PatientPage.jsx
import React from 'react';
import PatientManagement from '../features/patients/PatientManagement';

export default function PatientPage() {
  console.log('✅ PatientPage está sendo renderizado'); // Adicione esta linha
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Gerenciamento de Pacientes</h1>
      <PatientManagement />
    </div>
  );
}