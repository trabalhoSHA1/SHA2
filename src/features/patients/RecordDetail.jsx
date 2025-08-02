// src/components/patients/RecordDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

export default function RecordDetail() {
  const { siape, recordId } = useParams();
  
  // Simulando dados do prontuário
  const record = {
    title: 'Maria Silva Santos',
    status: 'Ativo',
    createdAt: '09/01/2024',
    lastUpdate: '13/01/2024',
    mainComplaint: 'Ansiedade generalizada e dificuldades de concentração',
    therapyPlan: 'Terapia cognitivo-comportamental com técnicas de relaxamento',
    evolution: 'Positiva',
    attachments: true,
    sessions: 8
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Detalhes do Prontuário</h2>

      <div className="mb-4">
        <p className="text-sm font-medium">Paciente: {record.title}</p>
        <p className="text-sm">Terapeuta: Dr. João Santos</p>
        <p className="text-sm">Status: <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Ativo</span></p>
        <p className="text-sm">Criado em: {record.createdAt}</p>
        <p className="text-sm">Última Atualização: {record.lastUpdate}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Queixa Principal</h3>
        <p className="text-sm">{record.mainComplaint}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Plano Terapêutico</h3>
        <p className="text-sm">{record.therapyPlan}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Última Evolução</h3>
        <p className="text-sm"><span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Positiva</span></p>
      </div>

      <div className="flex items-center space-x-4">
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors">
          Exportar Prontuário
        </button>
        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded transition-colors">
          Fechar
        </button>
      </div>
    </div>
  );
}