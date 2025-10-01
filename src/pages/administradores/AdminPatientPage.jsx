// src/pages/admin/AdminPatientPage.jsx
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import PatientList from '@/features/patients/components/PatientList';
import { patientsMock } from '@/data/patientsMock';

export default function AdminPatientPage() {
  const [patients, setPatients] = useState(patientsMock);

  const handleAddPatient = () => {
    alert('Abrir modal para cadastrar novo paciente');
  };

  return (
    <div className="p-6 space-y-6 min-h-screen">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Plus className="w-6 h-6 text-green-600" /> Gerenciamento de Pacientes
        </h1>
        <button
          onClick={handleAddPatient}
          className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600 transition-all"
        >
          <Plus className="w-5 h-5" /> Novo Paciente
        </button>
      </div>

      {/* Lista de pacientes */}
      <PatientList
        patients={patients}
        canEdit={true}
        showDeleteButton={true}
        showTherapistColumn={true}
      />
    </div>
  );
}
