// src/pages/PatientsPage.jsx
import React from 'react';
import Layout from '../components/layout/Layout';
import PatientList from '../features/patients/components/PatientList';

export default function PatientPage() {
  console.log('рендерizando PatientsPage');
  
  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Pacientes</h1>
          <p className="text-gray-600">Lista completa de pacientes ativos</p>
        </div>
        <PatientList />
        
      </div>
    </Layout>
  );
}