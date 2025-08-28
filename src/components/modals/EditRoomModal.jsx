// src/components/modals/EditRoomModal.jsx
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function EditRoomModal({ isOpen, onClose, room, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    block: '',
    roomId: '',
    capacity: 1,
    type: 'individual',
    equipment: [''],
    modalidades: [''],
    schedule: {
      segunda: '',
      terca: '',
      quarta: '',
      quinta: '',
      sexta: '',
      sabado: ''
    },
    status: 'disponivel'
  });

  useEffect(() => {
    if (room && isOpen) {
      setFormData({
        name: room.name || '',
        block: room.block || '',
        roomId: room.roomId || '',
        capacity: room.capacity || 1,
        type: room.type || 'individual',
        equipment: room.equipment?.length ? [...room.equipment] : [''],
        modalidades: room.modalidades?.length ? [...room.modalidades] : [''],
        schedule: {
          segunda: room.schedule?.segunda?.join(', ') || '',
          terca: room.schedule?.terca?.join(', ') || '',
          quarta: room.schedule?.quarta?.join(', ') || '',
          quinta: room.schedule?.quinta?.join(', ') || '',
          sexta: room.schedule?.sexta?.join(', ') || '',
          sabado: room.schedule?.sabado?.join(', ') || ''
        },
        status: room.status || 'disponivel'
      });
    }
  }, [room, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const processedSchedule = {};
    Object.keys(formData.schedule).forEach(day => {
      if (formData.schedule[day]) {
        processedSchedule[day] = formData.schedule[day]
          .split(',')
          .map(time => time.trim());
      } else {
        processedSchedule[day] = [];
      }
    });

    const roomData = {
      ...room,
      ...formData,
      schedule: processedSchedule,
      equipment: formData.equipment.filter(item => item.trim() !== ''),
      modalidades: formData.modalidades.filter(mod => mod.trim() !== '')
    };

    onSave(roomData);
    onClose();
  };

  // Helpers para Equipment
  const addEquipment = () =>
    setFormData(prev => ({ ...prev, equipment: [...prev.equipment, ''] }));
  const updateEquipment = (index, value) =>
    setFormData(prev => ({
      ...prev,
      equipment: prev.equipment.map((item, i) => (i === index ? value : item))
    }));
  const removeEquipment = (index) =>
    setFormData(prev => ({
      ...prev,
      equipment: prev.equipment.filter((_, i) => i !== index)
    }));

  // Helpers para Modalidades
  const addModalidade = () =>
    setFormData(prev => ({ ...prev, modalidades: [...prev.modalidades, ''] }));
  const updateModalidade = (index, value) =>
    setFormData(prev => ({
      ...prev,
      modalidades: prev.modalidades.map((mod, i) => (i === index ? value : mod))
    }));
  const removeModalidade = (index) =>
    setFormData(prev => ({
      ...prev,
      modalidades: prev.modalidades.filter((_, i) => i !== index)
    }));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Editar Sala</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Informações Básicas */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Informações Básicas</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome da Sala *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Ex: Sala de Psicologia 101"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bloco *</label>
                <input
                  type="text"
                  required
                  value={formData.block}
                  onChange={e => setFormData(prev => ({ ...prev, block: e.target.value }))}
                  placeholder="Ex: Bloco A"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ID da Sala *</label>
                <input
                  type="text"
                  required
                  value={formData.roomId}
                  onChange={e => setFormData(prev => ({ ...prev, roomId: e.target.value }))}
                  placeholder="Ex: A-101"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo *</label>
                <select
                  value={formData.type}
                  onChange={e => setFormData(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="individual">Individual</option>
                  <option value="coletiva">Coletiva</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Capacidade *</label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  required
                  value={formData.capacity}
                  onChange={e => setFormData(prev => ({ ...prev, capacity: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={e => setFormData(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="disponivel">Disponível</option>
                  <option value="ocupada">Ocupada</option>
                  <option value="manutencao">Manutenção</option>
                </select>
              </div>
            </div>
          </div>

          {/* Equipamentos */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Equipamentos</h3>
            {formData.equipment.map((equipment, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={equipment}
                  onChange={e => updateEquipment(index, e.target.value)}
                  placeholder="Ex: Computador, Projetor, Ar condicionado"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {formData.equipment.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeEquipment(index)}
                    className="px-2 py-1 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  >
                    Remover
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addEquipment}
              className="px-2 py-1 rounded-md text-blue-600 hover:bg-blue-100 hover:text-blue-700 font-medium transition-colors"
            >
              + Adicionar Equipamento
            </button>
          </div>

          {/* Modalidades */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Modalidades de Atendimento</h3>
            {formData.modalidades.map((modalidade, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={modalidade}
                  onChange={e => updateModalidade(index, e.target.value)}
                  placeholder="Ex: Psicologia Clínica, Terapia em Grupo"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {formData.modalidades.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeModalidade(index)}
                    className="px-2 py-1 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  >
                    Remover
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addModalidade}
              className="px-2 py-1 rounded-md text-blue-600 hover:bg-blue-100 hover:text-blue-700 font-medium transition-colors"
            >
              + Adicionar Modalidade
            </button>
          </div>

          {/* Horários */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Horários Disponíveis</h3>
            <p className="text-sm text-gray-600">Informe os horários separados por vírgula (ex: 08:00-12:00, 14:00-18:00)</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(formData.schedule).map(day => (
                <div key={day}>
                  <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                    {day.replace('terca', 'terça').replace('sabado', 'sábado')}
                  </label>
                  <input
                    type="text"
                    value={formData.schedule[day]}
                    onChange={e => setFormData(prev => ({
                      ...prev,
                      schedule: { ...prev.schedule, [day]: e.target.value }
                    }))}
                    placeholder="08:00-12:00, 14:00-18:00"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg hover:from-blue-600 hover:to-green-600 transition-all"
            >
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
