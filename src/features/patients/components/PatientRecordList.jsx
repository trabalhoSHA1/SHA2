// src/components/patients/PatientRecordList.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Edit, Trash } from 'lucide-react';

export default function PatientRecordList({ patientSiape }) {
  // Simulando dados dos prontuários
  const records = [
    {
      id: 1,
      title: 'Maria Silva Santos',
      status: 'Ativo',
      createdAt: '09/01/2024',
      lastUpdate: '13/01/2024',
      mainComplaint: 'Ansiedade generalizada e dificuldades de concentração',
      therapist: 'Dr. João Santos',
      evolution: 'Positiva'
    },
    {
      id: 2,
      title: 'João Lima Souza',
      status: 'Ativo',
      createdAt: '15/01/2024',
      lastUpdate: '17/01/2024',
      mainComplaint: 'Dificuldades de relacionamento interpessoal',
      therapist: 'Dra. Ana Costa',
      evolution: 'Estável'
    }
  ];

  // Filtrar prontuários apenas do paciente específico
  const patientRecords = records.filter(record => record.title === patientSiape);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Cabeçalho com botão de novo prontuário */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Histórico de Prontuários</h2>
        <button className="flex items-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Novo Prontuário
        </button>
      </div>

      {/* Lista de prontuários */}
      <div className="space-y-4">
        {patientRecords.map((record) => (
          <div key={record.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-100 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Paciente</p>
                <p className="text-sm">{record.title}</p>
              </div>
              <div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  record.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {record.status}
                </span>
              </div>
            </div>
            <div className="mt-2">
              <p className="text-sm font-medium">Última Evolução:</p>
              <p className="text-sm"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">{record.evolution}</span></p>
            </div>
            <div className="mt-2">
              <p className="text-sm font-medium">Terapeuta Responsável:</p>
              <p className="text-sm">{record.therapist}</p>
            </div>
            <div className="mt-2 flex justify-end space-x-2">
              <Link to={`/patients/${patientSiape}/records/${record.id}`}>
                <Eye className="w-5 h-5 text-gray-500 hover:text-green-500 cursor-pointer" />
              </Link>
              <button onClick={() => alert('Editar prontuário')}>
                <Edit className="w-5 h-5 text-gray-500 hover:text-blue-500 cursor-pointer" />
              </button>
              <button onClick={() => alert('Excluir prontuário')}>
                <Trash className="w-5 h-5 text-red-500 hover:text-red-700 cursor-pointer" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}