// src/pages/AllMedicalRecordsPage.jsx
import React, { useState } from 'react';
import MedicalRecordList from "../../features/records/MedicalRecordList";


export default function AllMedicalRecordsPage() {
  console.log('рендерizando Página de Todos os Prontuários');
  
  return (
      <div className="p-6 h-full">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Todos os Prontuários</h1>
          <p className="text-gray-600">Visualize todos os prontuários dos seus pacientes</p>
        </div>
        <MedicalRecordList />
      </div>
  );
}