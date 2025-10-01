// src/components/patients/PatientCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';

export default function PatientCard({ patient, isDark }) {
  const bgCard = isDark
    ? 'bg-[#1F1F1F] border border-[#2C2C2C] text-gray-200'
    : 'bg-white border border-gray-200 text-gray-900';
  const hoverBg = isDark ? 'hover:bg-[#2A2A2A]' : 'hover:bg-gray-100';
  const textGray = isDark ? 'text-gray-400' : 'text-gray-500';
  const textGrayBold = isDark ? 'text-gray-200' : 'text-gray-900';

  return (
    <div className={`rounded-lg shadow-md p-4 transition-shadow ${bgCard} ${hoverBg}`}>
      {/* Header do Card */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">
            {patient.name.charAt(0)}
          </div>
          <div>
            <h3 className={`font-semibold ${textGrayBold}`}>{patient.name}</h3>
            <p className={`text-sm ${textGray}`}>CPF: {patient.siape}</p>
          </div>
        </div>

        {/* Apenas ícone de visualização */}
        <Link
          to={`/patients/${patient.siape}`}
          className={`p-2 ${textGray} hover:text-green-500 rounded-full ${hoverBg}`}
        >
          <Eye className="w-4 h-4" />
        </Link>
      </div>

      {/* Contato */}
      <div className="mt-3">
        <p className={`text-sm ${textGray}`}>
          <span className="font-medium">Contato:</span> {patient.contact || 'Não informado'}
        </p>
        <p className={`text-sm ${textGray}`}>
          <span className="font-medium">Email:</span> {patient.email || 'Não informado'}
        </p>
      </div>

      {/* Especialidades */}
      {patient.specializations?.length > 0 && (
        <div className="mt-3">
          <p className={`text-sm font-medium ${textGrayBold}`}>Especialidades:</p>
          <div className="flex flex-wrap gap-1 mt-1">
            {patient.specializations.map((spec, idx) => (
              <span
                key={idx}
                className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Tempo de atendimento */}
      {patient.firstVisitDuration && patient.normalVisitDuration && (
        <div className="mt-3 text-sm">
          <p className={`${textGray}`}>Primeira vez: {patient.firstVisitDuration}</p>
          <p className={`${textGray}`}>Normal: {patient.normalVisitDuration}</p>
        </div>
      )}
    </div>
  );
}
