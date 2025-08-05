// src/components/patients/PatientDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, Edit, FileText } from 'lucide-react';

export default function PatientDetail() {
  const { siape } = useParams();
  
  console.log('рендерizando PatientDetail para SIAPE:', siape);
  
  // Dados simulados do paciente
  const patient = {
    name: '',
    siape: siape,
    age: 35,
    contact: '(11) 99999-9999',
    email: 'joao.santos@universidade.edu.br',
    specializations: ['Psicoterapia', 'Terapia Familiar'],
    firstVisit: '15/01/2024',
    lastVisit: '25/01/2024',
    status: 'Ativo',
    address: 'Rua das Flores, 123 - São Paulo/SP',
    emergencyContact: '(11) 98888-8888',
    bloodType: 'O+',
    allergies: 'Penicilina',
    observations: 'Paciente com histórico de ansiedade generalizada'
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center text-green-600 hover:text-green-800"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Detalhes do Paciente</h1>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold">
            {patient.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{patient.name}</h2>
            <p className="text-gray-600">SIAPE: {patient.siape}</p>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {patient.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Informações Pessoais</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-500">Idade</p>
                <p className="text-sm font-semibold">{patient.age} anos</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Gênero</p>
                <p className="text-sm font-semibold">{patient.gender}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Tipo Sanguíneo</p>
                <p className="text-sm font-semibold">{patient.bloodType}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Alergias</p>
                <p className="text-sm font-semibold">{patient.allergies}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Contato</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-500">Telefone</p>
                <p className="text-sm font-semibold">{patient.contact}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-sm font-semibold">{patient.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Endereço</p>
                <p className="text-sm font-semibold">{patient.address}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Contato de Emergência</p>
                <p className="text-sm font-semibold">{patient.emergencyContact}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Informações Profissionais</h3>
            <div className="space-y-3">
              <div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Primeira Visita</p>
                <p className="text-sm font-semibold">{patient.firstVisit}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Última Visita</p>
                <p className="text-sm font-semibold">{patient.lastVisit}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Observações</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-500">Notas</p>
                <p className="text-sm font-semibold">{patient.observations}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}