// src/components/modals/NewRecordModal.jsx
import React, { useState } from 'react';
import { X, FileText, Calendar, User, Heart, Stethoscope } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function NewRecordModal({ onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    type: 'Avaliação',
    status: 'Agendado',
    mainComplaint: '',
    therapyPlan: '',
    evolution: '',
    observations: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Novo prontuário:', formData);
    alert('Prontuário criado com sucesso!');
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-500" />
            Novo Prontuário
          </h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-red-500 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Informações Básicas */}
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <User className="w-4 h-4 text-green-500" />
                  Informações Básicas
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Título
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Ex: Avaliação Inicial - Terapia Cognitivo Comportamental"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                      Data
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                      Tipo
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="Avaliação">Avaliação</option>
                      <option value="Sessão">Sessão</option>
                      <option value="Retorno">Retorno</option>
                      <option value="Emergência">Emergência</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="Agendado">Agendado</option>
                      <option value="Concluído">Concluído</option>
                      <option value="Cancelado">Cancelado</option>
                      <option value="Pendente">Pendente</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Queixa Principal */}
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-red-500" />
                  Queixa Principal
                </h3>
                <textarea
                  id="mainComplaint"
                  name="mainComplaint"
                  value={formData.mainComplaint}
                  onChange={handleChange}
                  placeholder="Descreva a queixa principal do paciente..."
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  rows="4"
                />
              </CardContent>
            </Card>

            {/* Plano Terapêutico */}
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-purple-500" />
                  Plano Terapêutico
                </h3>
                <textarea
                  id="therapyPlan"
                  name="therapyPlan"
                  value={formData.therapyPlan}
                  onChange={handleChange}
                  placeholder="Descreva o plano terapêutico..."
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  rows="4"
                />
              </CardContent>
            </Card>

            {/* Evolução */}
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Evolução
                </h3>
                <select
                  id="evolution"
                  name="evolution"
                  value={formData.evolution}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Selecione a evolução</option>
                  <option value="Positiva">Positiva</option>
                  <option value="Estável">Estável</option>
                  <option value="Lenta">Lenta</option>
                  <option value="Negativa">Negativa</option>
                </select>
              </CardContent>
            </Card>

            {/* Observações */}
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Observações
                </h3>
                <textarea
                  id="observations"
                  name="observations"
                  value={formData.observations}
                  onChange={handleChange}
                  placeholder="Observações adicionais..."
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  rows="3"
                />
              </CardContent>
            </Card>
          </div>

          {/* Botões de Ação */}
          <div className="flex justify-end space-x-3 mt-6">
            <Button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Criar Prontuário
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}