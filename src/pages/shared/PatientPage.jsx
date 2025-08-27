// src/pages/PatientPage.jsx
import React, { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import AdminPatients from '@/features/patients/components/AdminPatients';
import TherapistPatients from '@/features/patients/components/TherapistPatients';
import AssistantPatients from '@/features/patients/components/AssistantPatients';

export default function PatientPage() {
  const { user } = useContext(AuthContext);

  if (!user) return <p>Carregando...</p>;

  switch (user.role) {
    case 'admin':
      return <AdminPatients />;
    case 'therapist':
      return <TherapistPatients />;
    case 'assistant':
      return <AssistantPatients />;
    default:
      return <p>Acesso não autorizado</p>;
  }
}
