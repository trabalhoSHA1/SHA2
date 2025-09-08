// src/components/forms/TherapistForm.jsx
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function TherapistForm({ therapist, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    type: "servidor",
    name: "",
    phone: "",
    siape: "",
    cpf: "",
    modalities: [""],
    schedule: {
      segunda: "",
      terca: "",
      quarta: "",
      quinta: "",
      sexta: "",
      sabado: "",
    },
    timePerAppointment: { first: 60, normal: 45 },
    status: "ativo",
  });

  useEffect(() => {
    if (therapist) {
      setFormData({
        type: therapist.type || "servidor",
        name: therapist.name || "",
        phone: therapist.phone || "",
        siape: therapist.siape || "",
        cpf: therapist.cpf || "",
        modalities: therapist.modalities?.length
          ? [...therapist.modalities]
          : [""],
        schedule: {
          segunda: therapist.schedule?.segunda?.join(", ") || "",
          terca: therapist.schedule?.terca?.join(", ") || "",
          quarta: therapist.schedule?.quarta?.join(", ") || "",
          quinta: therapist.schedule?.quinta?.join(", ") || "",
          sexta: therapist.schedule?.sexta?.join(", ") || "",
          sabado: therapist.schedule?.sabado?.join(", ") || "",
        },
        timePerAppointment: therapist.timePerAppointment || {
          first: 60,
          normal: 45,
        },
        status: therapist.status || "ativo",
      });
    }
  }, [therapist]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const processedSchedule = {};
    Object.keys(formData.schedule).forEach((day) => {
      if (formData.schedule[day]) {
        processedSchedule[day] = formData.schedule[day]
          .split(",")
          .map((t) => t.trim());
      } else {
        processedSchedule[day] = [];
      }
    });

    const dataToSave = {
      ...formData,
      schedule: processedSchedule,
      modalities: formData.modalities.filter((m) => m.trim() !== ""),
    };

    onSubmit(dataToSave);
  };

  // Modalidades
  const addModality = () =>
    setFormData((prev) => ({ ...prev, modalities: [...prev.modalities, ""] }));
  const updateModality = (index, value) =>
    setFormData((prev) => ({
      ...prev,
      modalities: prev.modalities.map((m, i) => (i === index ? value : m)),
    }));
  const removeModality = (index) =>
    setFormData((prev) => ({
      ...prev,
      modalities: prev.modalities.filter((_, i) => i !== index),
    }));

  return (
    <div className="max-w-4xl w-full rounded-xl overflow-y-auto max-h-[90vh] bg-white shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">
          {therapist ? "Editar Terapeuta" : "Novo Terapeuta"}
        </h2>
        <button
          onClick={onCancel}
          type="button"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Tipo e Informações Pessoais */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">
            Informações Básicas
          </h3>
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
                <option value="servidor">Servidor</option>
                <option value="voluntario">Voluntário</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Nome completo"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telefone *
              </label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, phone: e.target.value }))
                }
                placeholder="(XX) XXXXX-XXXX"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {formData.type === "servidor" ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Registro SIAPE *
              </label>
              <input
                type="text"
                required
                value={formData.siape}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, siape: e.target.value }))
                }
                placeholder="Ex: 1234567"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CPF *
              </label>
              <input
                type="text"
                required
                value={formData.cpf}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, cpf: e.target.value }))
                }
                placeholder="Ex: 123.456.789-00"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          )}
        </div>

        {/* Modalidades */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">
            Modalidades de Atendimento
          </h3>
          {formData.modalities.map((mod, idx) => (
            <div key={idx} className="flex gap-2">
              <input
                type="text"
                value={mod}
                onChange={(e) => updateModality(idx, e.target.value)}
                placeholder="Ex: Psicologia Clínica"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              {formData.modalities.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeModality(idx)}
                  className="px-2 py-1 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  Remover
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addModality}
            className="px-2 py-1 rounded-md text-blue-600 hover:bg-blue-100 hover:text-blue-700 font-medium transition-colors"
          >
            + Adicionar Modalidade
          </button>
        </div>

        {/* Horários Disponíveis */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">
            Horários Disponíveis
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            Informe os horários separados por vírgula (ex: 08:00-12:00, 14:00-18:00)
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

        {/* Tempo de Atendimento */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tempo Primeira Visita (min)
            </label>
            <input
              type="number"
              min="10"
              value={formData.timePerAppointment.first}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  timePerAppointment: {
                    ...prev.timePerAppointment,
                    first: parseInt(e.target.value),
                  },
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tempo Normal (min)
            </label>
            <input
              type="number"
              min="10"
              value={formData.timePerAppointment.normal}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  timePerAppointment: {
                    ...prev.timePerAppointment,
                    normal: parseInt(e.target.value),
                  },
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Ações */}
        <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
          >
            {therapist ? "Salvar Alterações" : "Cadastrar"}
          </button>
        </div>
      </form>
    </div>
  );
}
