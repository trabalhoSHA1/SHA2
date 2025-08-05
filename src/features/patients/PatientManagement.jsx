import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Edit, Trash, FileText } from 'lucide-react'; 

export default function PatientManagement() {
  console.log('рендерizando Gerenciamento de Pacientes');

  // Simulando dados de pacientes
  const [patients, setPatients] = useState([
    {
      name: 'Dr. João Santos Silva',
      siape: '123456789',
      contact: '(11) 99999-9999',
      email: 'joao.santos@universidade.edu.br',
      specializations: ['Psicoterapia', 'Terapia Familiar'],
      firstVisitDuration: '90min',
      normalVisitDuration: '60min',
      activePatients: 8,
      status: 'Ativo',
    },
    {
      name: 'Dra. Ana Costa Pereira',
      siape: '987654321',
      contact: '(11) 88888-8888',
      email: 'ana.costa@email.com',
      specializations: ['Psicologia Clínica', 'Terapia Cognitiva'],
      firstVisitDuration: '90min',
      normalVisitDuration: '60min',
      activePatients: 5,
      status: 'Ativo',
    },
  ]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* Barra de navegação superior */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Seus Pacientes</h1>
      </div>

      {/* Seção de busca */}
      <div className="mb-4 flex items-center space-x-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7 7 0 103 12a7 7 0 0014 0z" />
        </svg>
        <input
          type="text"
          placeholder="Buscar pacientes por nome, email ou especialidade..."
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
        />
        <select className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500">
          <option value="all">Todos os tipos</option>
          <option value="active">Ativos</option>
          <option value="inactive">Inativos</option>
        </select>
      </div>

      {/* Cards de pacientes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {patients.map((patient, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center">
                </div>
                <div>
                  <h2 className="text-lg font-medium">{patient.name}</h2>
                  <p className="text-sm text-gray-500">CPF: {patient.siape}</p>
                </div>
              </div>
              {/* Ícones de ação */}
              <div className="flex items-center space-x-2">
                {/* Ícone de papel (prontuários) */}
                <Link to={`/patients/${patient.siape}/records`}>
                  <FileText className="w-5 h-5 text-gray-500 hover:text-green-500 cursor-pointer" />
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <p className="text-sm font-medium">Contato:</p>
              <p className="text-sm">{patient.contact}</p>
              <p className="text-sm">{patient.email}</p>
            </div>
            <div className="mt-2">
              <p className="text-sm font-medium">Especialidades:</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {patient.specializations.map((specialization, idx) => (
                  <span
                    key={idx}
                    className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs"
                  >
                    {specialization}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-2">
              <p className="text-sm font-medium">Tempo por atendimento:</p>
              <p className="text-sm">
                Primeira vez: {patient.firstVisitDuration} | Normal: {patient.normalVisitDuration}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}