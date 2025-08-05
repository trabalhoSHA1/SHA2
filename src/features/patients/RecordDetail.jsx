// src/components/patients/RecordDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { FileText, Calendar, User, Heart, Stethoscope, Download, X } from 'lucide-react';

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
      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <FileText className="w-6 h-6 mr-2 text-blue-500" />
            Prontuário Médico
          </h1>
          <p className="text-gray-600">Detalhes completos do paciente</p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <Download className="w-4 h-4" />
            Exportar PDF
          </button>
          <button className="flex items-center gap-2 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <X className="w-4 h-4" />
            Fechar
          </button>
        </div>
      </div>

      {/* Informações Básicas */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
          <User className="w-5 h-5 mr-2 text-green-500" />
          Informações Básicas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Paciente</p>
            <p className="text-sm font-semibold">{record.title}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Terapeuta</p>
            <p className="text-sm font-semibold">Dr. João Santos</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Status</p>
            <p className="text-sm font-semibold">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                {record.status}
              </span>
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Sessões Realizadas</p>
            <p className="text-sm font-semibold">{record.sessions}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Criado em</p>
            <p className="text-sm font-semibold">{record.createdAt}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Última Atualização</p>
            <p className="text-sm font-semibold">{record.lastUpdate}</p>
          </div>
        </div>
      </div>

      {/* Queixa Principal */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
          <Heart className="w-5 h-5 mr-2 text-red-500" />
          Queixa Principal
        </h2>
        <p className="text-sm text-gray-700">{record.mainComplaint}</p>
      </div>

      {/* Plano Terapêutico */}
      <div className="mb-6 p-4 bg-green-50 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
          <Stethoscope className="w-5 h-5 mr-2 text-purple-500" />
          Plano Terapêutico
        </h2>
        <p className="text-sm text-gray-700">{record.therapyPlan}</p>
      </div>

      {/* Última Evolução */}
      <div className="mb-6 p-4 bg-purple-50 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-yellow-500" />
          Última Evolução
        </h2>
        <p className="text-sm text-gray-700">
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
            {record.evolution}
          </span>
        </p>
      </div>

      {/* Anexos */}
      <div className="mb-6 p-4 bg-yellow-50 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-orange-500" />
          Anexos
        </h2>
        <p className="text-sm text-gray-700">
          {record.attachments ? 'Possui anexos' : 'Nenhum anexo'}
        </p>
      </div>
    </div>
  );
}