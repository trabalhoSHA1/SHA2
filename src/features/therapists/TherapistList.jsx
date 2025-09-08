// src/features/therapists/components/TherapistList.jsx
import React from "react";
import { Eye, Edit, Trash } from "lucide-react";

export default function TherapistList({ therapists = [], onEdit, onDelete }) {
  if (!therapists.length) {
    return (
      <div className="p-8 text-center text-gray-500">
        <Eye className="w-12 h-12 mx-auto mb-4 text-gray-300" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum terapeuta encontrado</h3>
        <p className="text-gray-500">Cadastre novos terapeutas para exibi-los aqui.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {therapists.map((therapist) => (
        <div
          key={therapist.id}
          className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">
                {therapist.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .substring(0, 2)}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{therapist.name}</h3>
                <p className="text-sm text-gray-500">{therapist.specialization}</p>
                <p className="text-sm text-gray-500">{therapist.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => onEdit(therapist)}
                className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-gray-100"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(therapist.id)}
                className="p-2 text-gray-500 hover:text-red-600 rounded-full hover:bg-gray-100"
              >
                <Trash className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
