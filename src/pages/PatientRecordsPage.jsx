// src/pages/PatientRecordsPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import PatientRecordList from '../features/patients/components/PatientRecordList';

export default function PatientRecordsPage() {
  const { siape } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Prontuários do Paciente</h1>
      <PatientRecordList patientSiape={siape} />
    </div>
  );
}