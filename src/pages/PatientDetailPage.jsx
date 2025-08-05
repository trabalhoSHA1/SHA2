// src/pages/PatientDetailPage.jsx
import React from 'react';
import Layout from '../components/layout/Layout';
import PatientDetail from '../features/patients/components/PatientDetail';

export default function PatientDetailPage() {
  console.log('рендерizando PatientDetailPage');
  
  return (
    <Layout>
      <div className="p-6">
        <PatientDetail />
      </div>
    </Layout>
  );
}