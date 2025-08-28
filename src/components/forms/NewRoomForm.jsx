// src/features/rooms/components/NewRoomForm.jsx
import React, { useState } from "react";
import { X } from "lucide-react";

export default function NewRoomForm({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    block: "",
    roomId: "",
    capacity: 1,
    type: "individual",
    equipment: [""],
    modalidades: [""],
    schedule: {
      segunda: "",
      terca: "",
      quarta: "",
      quinta: "",
      sexta: "",
      sabado: "",
    },
    status: "disponivel",
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Processar horários
    const processedSchedule = {};
    Object.keys(formData.schedule).forEach((day) => {
      processedSchedule[day] = formData.schedule[day]
        ? formData.schedule[day].split(",").map((t) => t.trim())
        : [];
    });

    const roomData = {
      ...formData,
      schedule: processedSchedule,
      equipment: formData.equipment.filter((e) => e.trim() !== ""),
      modalidades: formData.modalidades.filter((m) => m.trim() !== ""),
    };

    onSubmit(roomData);
    onClose();

    // Reset form
    setFormData({
      name: "",
      block: "",
      roomId: "",
      capacity: 1,
      type: "individual",
      equipment: [""],
      modalidades: [""],
      schedule: {
        segunda: "",
        terca: "",
        quarta: "",
        quinta: "",
        sexta: "",
        sabado: "",
      },
      status: "disponivel",
    });
  };

  // Helpers para equipment
  const addEquipment = () =>
    setFormData((prev) => ({ ...prev, equipment: [...prev.equipment, ""] }));
  const updateEquipment = (i, val) =>
    setFormData((prev) => ({
      ...prev,
      equipment: prev.equipment.map((e, idx) => (idx === i ? val : e)),
    }));
  const removeEquipment = (i) =>
    setFormData((prev) => ({
      ...prev,
      equipment: prev.equipment.filter((_, idx) => idx !== i),
    }));

  // Helpers para modalidades
  const addModalidade = () =>
    setFormData((prev) => ({ ...prev, modalidades: [...prev.modalidades, ""] }));
  const updateModalidade = (i, val) =>
    setFormData((prev) => ({
      ...prev,
      modalidades: prev.modalidades.map((m, idx) => (idx === i ? val : m)),
    }));
  const removeModalidade = (i) =>
    setFormData((prev) => ({
      ...prev,
      modalidades: prev.modalidades.filter((_, idx) => idx !== i),
    }));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Nova Sala</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Informações Básicas */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Informações Básicas</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome da Sala *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Ex: Sala de Psicologia 101"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bloco *
                </label>
                <input
                  type="text"
                  required
                  value={formData.block}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, block: e.target.value }))
                  }
                  placeholder="Ex: Bloco A"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ID da Sala *
                </label>
                <input
                  type="text"
                  required
                  value={formData.roomId}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, roomId: e.target.value }))
                  }
                  placeholder="Ex: A-101"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Tipo, capacidade e status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, type: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="individual">Individual</option>
                  <option value="coletiva">Coletiva</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Capacidade *
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  required
                  value={formData.capacity}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, capacity: parseInt(e.target.value) }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, status: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
            {formData.equipment.map((eq, i) => (
              <div key={i} className="flex gap-2">
                <input
                  type="text"
                  value={eq}
                  onChange={(e) => updateEquipment(i, e.target.value)}
                  placeholder="Ex: Computador, Projetor"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                {formData.equipment.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeEquipment(i)}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Remover
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addEquipment}
              className="text-gray-600 hover:text-green-700 font-medium"
            >
              + Adicionar Equipamento
            </button>
          </div>

          {/* Modalidades */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Modalidades</h3>
            {formData.modalidades.map((mod, i) => (
              <div key={i} className="flex gap-2">
                <input
                  type="text"
                  value={mod}
                  onChange={(e) => updateModalidade(i, e.target.value)}
                  placeholder="Ex: Psicologia Clínica"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                {formData.modalidades.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeModalidade(i)}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Remover
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addModalidade}
              className="text-gray-600 hover:text-green-700 font-medium"
            >
              + Adicionar Modalidade
            </button>
          </div>

          {/* Horários */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Horários Disponíveis</h3>
            <p className="text-sm text-gray-600">
              Separe por vírgula: 08:00-12:00, 14:00-18:00
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(formData.schedule).map((day) => (
                <div key={day}>
                  <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                    {day.replace("terca", "terça").replace("sabado", "sábado")}
                  </label>
                  <input
                    type="text"
                    value={formData.schedule[day]}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        schedule: { ...prev.schedule, [day]: e.target.value },
                      }))
                    }
                    placeholder="08:00-12:00, 14:00-18:00"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Cadastrar Sala
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
