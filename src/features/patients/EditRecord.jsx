// src/components/patients/EditRecordModal.jsx
import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function EditRecordModal() {
  const [showModal, setShowModal] = useState(true);

  return showModal ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Editar Prontuário</h2>
          <button onClick={() => setShowModal(false)}>
            <X className="w-5 h-5 text-gray-500 hover:text-red-500 cursor-pointer" />
          </button>
        </div>

        <form>
          <div className="mb-4">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="status"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="ativo">Ativo</option>
              <option value="inativo">Inativo</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="mainComplaint" className="block text-sm font-medium text-gray-700">
              Queixa Principal
            </label>
            <textarea
              id="mainComplaint"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              rows="4"
            ></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="therapyPlan" className="block text-sm font-medium text-gray-700">
              Plano Terapêutico
            </label>
            <textarea
              id="therapyPlan"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              rows="4"
            ></textarea>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="completeAnamnesis"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="completeAnamnesis" className="text-sm font-medium text-gray-700">
              Anamnese completa
            </label>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors"
            >
              Salvar Alterações
            </button>
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
}