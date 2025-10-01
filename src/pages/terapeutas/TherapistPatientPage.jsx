// src/pages/therapist/TherapistPatientPage.jsx
import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import PatientList from '@/features/patients/components/PatientList';
import { patientsMock } from '@/data/patientsMock';

export default function TherapistPatientPage() {
  const loggedTherapist = 'Dr. João';
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const myPatients = patientsMock.filter(
      (p) => p.therapistName === loggedTherapist || !p.therapistName
    );
    setPatients(myPatients);
  }, []);

  const handleAddPatient = () => {
    alert('Abrir modal para cadastrar novo paciente');
  };

  return (
    <div className="p-6 space-y-6 min-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Plus className="w-6 h-6 text-green-600" /> Meus Pacientes
        </h1>
        <button
          onClick={handleAddPatient}
          className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600 transition-all"
        >
          <Plus className="w-5 h-5" /> Novo Paciente
        </button>
      </div>

      <PatientList
        patients={patients}
        canEdit={false}
        showRecordsButton={true}
      />
    </div>
  );
}
