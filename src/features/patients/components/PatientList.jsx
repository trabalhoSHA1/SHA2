// src/features/patients/components/PatientList.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { patientsMock } from '../../../data/patientsMock';

export default function PatientList({ patients = patientsMock, isDark = false }) {
  const cardBg = isDark ? 'bg-[#1F1F1F] text-gray-200' : 'bg-white text-gray-900';
  const hoverBg = isDark ? 'hover:bg-[#2A2A2A]' : 'hover:bg-gray-100';
  const textGray = isDark ? 'text-gray-400' : 'text-gray-500';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {patients.map((patient) => (
        <div key={patient.siape || patient.id} className={`p-4 rounded-lg shadow-md ${cardBg} ${hoverBg} transition`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold text-lg">{patient.name || '-'}</h2>
              <p className={`text-sm ${textGray}`}>{patient.profileType?.toUpperCase() || 'OUTRO'}</p>
            </div>

            <Link
              to={`/patients/${patient.siape}`}
              className={`p-2 ${textGray} hover:text-green-500 rounded-full ${hoverBg}`}
              title="Visualizar"
            >
              <Eye className="w-5 h-5" />
            </Link>
          </div>

          <div className="text-sm space-y-1">
            {/* Campos comuns */}
            {patient.birthDate && <p><span className="font-medium">Nascimento:</span> {patient.birthDate}</p>}
            {patient.contact && <p><span className="font-medium">Telefone:</span> {patient.contact}</p>}
            {patient.emergencyContact && <p><span className="font-medium">Emergência:</span> {patient.emergencyContact}</p>}
            {patient.address && <p><span className="font-medium">Endereço:</span> {patient.address}</p>}

            {/* Campos específicos por perfil */}
            {patient.profileType === 'professor' && <p><span className="font-medium">Unidade:</span> {patient.unit}</p>}
            {patient.profileType === 'tecnico' && (
              <>
                <p><span className="font-medium">Cargo:</span> {patient.cargo}</p>
                <p><span className="font-medium">Unidade:</span> {patient.unit}</p>
              </>
            )}
            {patient.profileType === 'aluno' && (
              <>
                <p><span className="font-medium">Matrícula DRE:</span> {patient.matricula}</p>
                <p><span className="font-medium">Nível:</span> {patient.level}</p>
                <p><span className="font-medium">Curso:</span> {patient.course}</p>
              </>
            )}
            {patient.profileType === 'outro' && (
              <>
                {patient.name && <p><span className="font-medium">Nome:</span> {patient.name}</p>}
                {patient.cpf && <p><span className="font-medium">CPF:</span> {patient.cpf}</p>}
                {patient.cargo && <p><span className="font-medium">Cargo:</span> {patient.cargo}</p>}
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
