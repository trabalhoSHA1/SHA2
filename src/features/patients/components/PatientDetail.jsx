// src/features/patients/components/PatientDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { patientsMock } from '../../../data/patientsMock';

export default function PatientDetail() {
  const { siape } = useParams();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    // Simula fetch do paciente pelo SIAPE ou ID
    const fetchedPatient = patientsMock.find(p => p.siape === siape || p.matricula === siape || p.cpf === siape);

    if (fetchedPatient) {
      setPatient(fetchedPatient);
    } else {
      // Paciente não encontrado
      setPatient({
        name: 'Paciente não encontrado',
        birthDate: '-',
        address: '-',
        contact: '-',
        emergencyContact: '-',
        status: 'Inativo',
        cargo: '-',
        unit: '-',
        matricula: '-',
        level: '-',
        course: '-',
        cpf: '-',
      });
    }
  }, [siape]);

  if (!patient) return <p>Carregando...</p>;

  return (
    <div className="space-y-6">
      {/* Header */}
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

      {/* Card de detalhes */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold">
            {patient.name ? patient.name.split(' ').map(n => n[0]).join('').substring(0, 2) : '--'}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{patient.name || '-'}</h2>
            {patient.siape && <p className="text-gray-600">SIAPE: {patient.siape}</p>}
            {patient.matricula && <p className="text-gray-600">Matrícula: {patient.matricula}</p>}
            {patient.cpf && <p className="text-gray-600">CPF: {patient.cpf}</p>}
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {patient.status || '-'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Informações Pessoais */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Informações Pessoais</h3>
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-500">Data de Nascimento</p>
              <p className="text-sm font-semibold">{patient.birthDate}</p>

              <p className="text-sm font-medium text-gray-500">Endereço</p>
              <p className="text-sm font-semibold">{patient.address}</p>

              <p className="text-sm font-medium text-gray-500">Telefone</p>
              <p className="text-sm font-semibold">{patient.contact}</p>

              <p className="text-sm font-medium text-gray-500">Contato de Emergência</p>
              <p className="text-sm font-semibold">{patient.emergencyContact}</p>
            </div>
          </div>

          {/* Informações Profissionais / Acadêmicas */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Informações Adicionais</h3>
            <div className="space-y-3">
              {patient.cargo && (
                <>
                  <p className="text-sm font-medium text-gray-500">Cargo</p>
                  <p className="text-sm font-semibold">{patient.cargo}</p>
                </>
              )}

              {patient.unit && (
                <>
                  <p className="text-sm font-medium text-gray-500">Unidade</p>
                  <p className="text-sm font-semibold">{patient.unit}</p>
                </>
              )}

              {patient.level && (
                <>
                  <p className="text-sm font-medium text-gray-500">Nível</p>
                  <p className="text-sm font-semibold">{patient.level}</p>
                </>
              )}

              {patient.course && (
                <>
                  <p className="text-sm font-medium text-gray-500">Curso</p>
                  <p className="text-sm font-semibold">{patient.course}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
