// src/features/patients/components/PatientList.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Edit, Trash, FileText } from 'lucide-react';

export default function PatientList({
  patients = [],
  canEdit = false,
  showTherapistColumn = false,
  showRecordsButton = true,
  showDeleteButton = false,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {patients.map((patient, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
        >
          {/* Header do Card */}
          <div className="flex items-center justify-between">
            {/* Avatar + Nome */}
            <div className="flex items-center space-x-2">
              <div className="bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                {patient.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
              </div>
              <div>
                <h2 className="text-lg font-medium">{patient.name}</h2>
                <p className="text-sm text-gray-500">CPF: {patient.siape}</p>
                {showTherapistColumn && (
                  <p className="text-sm text-gray-500">
                    Terapeuta: {patient.therapistName}
                  </p>
                )}
              </div>
            </div>

            {/* Ações */}
            <div className="flex items-center space-x-3">
              {/* Visualizar */}
              <Link to={`/patients/${patient.siape}`} title="Visualizar">
                <Eye className="w-5 h-5 text-gray-500 hover:text-green-500 cursor-pointer transition" />
              </Link>

              {/* Prontuário */}
              {showRecordsButton && (
                <Link
                  to={`/patients/${patient.siape}/records`}
                  title="Prontuário"
                >
                  <FileText className="w-5 h-5 text-gray-500 hover:text-green-500 cursor-pointer transition" />
                </Link>
              )}

              {/* Editar */}
              {canEdit && (
                <Link
                  to={`/patients/edit/${patient.siape}`}
                  title="Editar"
                >
                  <Edit className="w-5 h-5 text-gray-500 hover:text-green-500 cursor-pointer transition" />
                </Link>
              )}

              {/* Excluir */}
              {showDeleteButton && (
                <button
                  onClick={() =>
                    confirm(`Tem certeza que deseja excluir ${patient.name}?`)
                  }
                  title="Excluir"
                  className="bg-transparent border-none p-0 hover:bg-transparent focus:outline-none"
                >
                  <Trash className="w-5 h-5 text-gray-500 hover:text-green-500 cursor-pointer transition" />
                </button>
              )}
            </div>
          </div>

          {/* Contato */}
          <div className="mt-3 text-sm">
            <p className="font-medium">Contato:</p>
            <p>{patient.contact}</p>
            <p>{patient.email}</p>
          </div>

          {/* Especialidades */}
          {patient.specializations?.length > 0 && (
            <div className="mt-3">
              <p className="text-sm font-medium">Especialidades:</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {patient.specializations.map((spec, idx) => (
                  <span
                    key={idx}
                    className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs"
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
              <p className="font-medium">Tempo por atendimento:</p>
              <p>
                Primeira vez: {patient.firstVisitDuration} | Normal:{' '}
                {patient.normalVisitDuration}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
