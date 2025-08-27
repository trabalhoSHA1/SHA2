// src/pages/PatientDetailPage.jsx
import React from 'react';
import PatientDetail from '../../features/patients/components/PatientDetail'


export default function PatientDetailPage() {
  console.log('рендерizando PatientDetailPage');
  
  return (
      <div className="p-6">
        <PatientDetail />
      </div>
  );
}