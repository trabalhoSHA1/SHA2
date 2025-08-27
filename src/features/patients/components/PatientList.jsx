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
  console.log('рендерizando PatientList genérico');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {patients.map((patient, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center">
                {patient.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
              </div>
              <div>
                <h2 className="text-lg font-medium">{patient.name}</h2>
                <p className="text-sm text-gray-500">CPF: {patient.siape}</p>
                {showTherapistColumn && (
                  <p className="text-sm text-gray-500">Terapeuta: {patient.therapistName}</p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Link to={`/patients/${patient.siape}`}>
                <Eye className="w-5 h-5 text-gray-500 hover:text-green-500 cursor-pointer" />
              </Link>

              {showRecordsButton && (
                <Link to={`/patients/${patient.siape}/records`}>
                  <FileText className="w-5 h-5 text-gray-500 hover:text-green-500 cursor-pointer" />
                </Link>
              )}

              {canEdit && (
                <Link to={`/patients/edit/${patient.siape}`}>
                  <Edit className="w-5 h-5 text-blue-500 hover:text-blue-700 cursor-pointer" />
                </Link>
              )}

              {showDeleteButton && (
                <button
                  onClick={() => alert(`Excluir paciente: ${patient.name}`)}
                >
                  <Trash className="w-5 h-5 text-red-500 hover:text-red-700 cursor-pointer" />
                </button>
              )}
            </div>
          </div>

          <div className="mt-2">
            <p className="text-sm font-medium">Contato:</p>
            <p className="text-sm">{patient.contact}</p>
            <p className="text-sm">{patient.email}</p>
          </div>

          {patient.specializations && patient.specializations.length > 0 && (
            <div className="mt-2">
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

          {patient.firstVisitDuration && patient.normalVisitDuration && (
            <div className="mt-2">
              <p className="text-sm font-medium">Tempo por atendimento:</p>
              <p className="text-sm">
                Primeira vez: {patient.firstVisitDuration} | Normal: {patient.normalVisitDuration}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
