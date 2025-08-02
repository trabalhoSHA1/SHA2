// src/components/patients/PatientRecordList.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Edit, Trash } from 'lucide-react';

export default function PatientRecordList({ patientSiape }) {
  // Simulando dados de prontuários
  const records = [
    {
      id: 1,
      title: 'Maria Silva Santos',
      status: 'Ativo',
      lastUpdate: '13/01/2024',
      mainComplaint: 'Ansiedade generalizada e dificuldades de concentração',
      therapist: 'Dr. João Santos',
      sessions: 8,
      evolution: 'Positiva'
    },
    {
      id: 2,
      title: 'João Lima Souza',
      status: 'Ativo',
      lastUpdate: '15/01/2024',
      mainComplaint: 'Histórico de ansiedade social',
      therapist: 'Dra. Ana Costa',
      sessions: 5,
      evolution: 'Estável'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Lista de prontuários */}
      <div className="space-y-4">
        {records.map((record) => (
          <div 
            key={record.id} 
            className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div>
                  <h3 className="font-medium text-gray-900">{record.title}</h3>
                  <p className="text-sm text-gray-500">
                    Terapeuta: {record.therapist}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  record.status === 'Ativo' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {record.status}
                </span>
                <div className="flex items-center gap-2">
                  <Link 
                    to={`/patients/${patientSiape}/records/${record.id}`}
                    className="p-2 text-gray-500 hover:text-green-600 rounded-full hover:bg-gray-100"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                  <button className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-gray-100">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-red-600 rounded-full hover:bg-gray-100">
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}