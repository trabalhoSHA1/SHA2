// src/components/dashboards/TherapistMedicalRecords.jsx
import React from 'react';
import { FileText } from 'lucide-react';

export default function TherapistMedicalRecords() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Prontuários</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-4">
          <FileText className="w-5 h-5 text-green-600" />
          <div>
            <p className="text-sm text-gray-600">Pacientes Ativos</p>
            <p className="text-2xl font-bold text-gray-900">12</p>
          </div>
        </div>
      </div>
      {/* Aqui você pode listar os pacientes e permitir CRUD nos prontuários */}
    </div>
  );
}