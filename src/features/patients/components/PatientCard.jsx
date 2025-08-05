// src/components/patients/PatientCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Edit, Trash, FileText } from 'lucide-react';

export default function PatientCard({ patient }) {
  console.log('рендерizando PatientCard:', patient.name);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">
            {patient.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{patient.name}</h3>
            <p className="text-sm text-gray-500">CPF: {patient.siape}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Link 
            to={`/patients/${patient.siape}`} 
            className="p-2 text-gray-500 hover:text-green-600 rounded-full hover:bg-gray-100"
          >
            <Eye className="w-4 h-4" />
          </Link>
          <Link 
            to={`/patients/edit/${patient.siape}`} 
            className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-gray-100"
          >
            <Edit className="w-4 h-4" />
          </Link>
          <Link 
            to={`/patients/${patient.siape}/prontuarios`} 
            className="p-2 text-gray-500 hover:text-purple-600 rounded-full hover:bg-gray-100"
          >
            <FileText className="w-4 h-4" />
          </Link>
          <button 
            onClick={() => alert(`Excluir paciente: ${patient.name}`)}
            className="p-2 text-gray-500 hover:text-red-600 rounded-full hover:bg-gray-100"
          >
            <Trash className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="mt-3">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Contato:</span> {patient.contact}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Email:</span> {patient.email}
        </p>
      </div>
      
      <div className="mt-3">
        <p className="text-sm font-medium text-gray-700">Especialidades:</p>
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
      
      <div className="mt-3 flex justify-between items-center">
        <div>
          <p className="text-xs text-gray-500">
            Primeira vez: {patient.firstVisitDuration}
          </p>
          <p className="text-xs text-gray-500">
            Normal: {patient.normalVisitDuration}
          </p>
        </div>
        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
          {patient.activePatients} ativos
        </span>
      </div>
    </div>
  );
}