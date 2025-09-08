// src/pages/admin/AdminTherapistPage.jsx
import React, { useState } from 'react';
import { Plus, Edit, Eye, Calendar } from 'lucide-react';
import TherapistForm from '../../components/forms/TherapistForm';

const AdminTherapistPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [therapists, setTherapists] = useState([
    {
      id: 1,
      type: 'servidor',
      name: 'Ana Maria',
      phone: '(11) 99999-1111',
      siape: '1234567',
      modalities: ['Psicologia Clínica', 'Terapia Cognitiva'],
      schedule: {
        segunda: ['08:00-12:00', '14:00-18:00'],
        quarta: ['08:00-12:00'],
        sexta: ['08:00-12:00']
      },
      timePerAppointment: { first: 60, normal: 45 },
      status: 'ativo'
    },
    {
      id: 2,
      type: 'voluntario',
      name: 'Carlos Eduardo',
      phone: '(11) 98888-2222',
      cpf: '123.456.789-00',
      modalities: ['Terapia em Grupo'],
      schedule: {
        terca: ['10:00-14:00'],
        quinta: ['10:00-14:00']
      },
      timePerAppointment: { first: 60, normal: 45 },
      status: 'ativo'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [selectedTherapist, setSelectedTherapist] = useState(null);

  const handleAddTherapist = () => {
    setSelectedTherapist(null);
    setShowForm(true);
  };

  const handleEditTherapist = (therapist) => {
    setSelectedTherapist(therapist);
    setShowForm(true);
  };

  const handleSaveTherapist = (data) => {
    if (selectedTherapist) {
      setTherapists(prev =>
        prev.map(t => (t.id === selectedTherapist.id ? { ...t, ...data } : t))
      );
    } else {
      const newTherapist = { id: therapists.length + 1, ...data };
      setTherapists(prev => [...prev, newTherapist]);
    }
    setShowForm(false);
  };

  const filteredTherapists = therapists.filter(t =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.modalities.some(m => m.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (t.type === 'servidor' && t.siape?.includes(searchTerm)) ||
    (t.type === 'voluntario' && t.cpf?.includes(searchTerm))
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'ativo': return 'bg-green-100 text-green-700';
      case 'inativo': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          <Plus className="w-6 h-6 text-blue-600" /> Gerenciamento de Terapeutas
        </h1>
        <button
          onClick={handleAddTherapist}
          className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600 transition-all"
        >
          <Plus className="w-5 h-5" /> Novo Terapeuta
        </button>
      </div>

      {/* Filtro */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar por nome, SIAPE, CPF ou modalidade..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Lista de Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTherapists.map(t => (
          <div key={t.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{t.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(t.status)}`}>
                  {t.status.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEditTherapist(t)}
                  className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  title="Editar Terapeuta"
                >
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
              <div><strong>Tipo:</strong> {t.type === 'servidor' ? 'Servidor' : 'Voluntário'}</div>
              {t.type === 'servidor' ? <div><strong>SIAPE:</strong> {t.siape}</div> : <div><strong>CPF:</strong> {t.cpf}</div>}
              <div><strong>Telefone:</strong> {t.phone}</div>
              <div><strong>Tempo 1ª vez:</strong> {t.timePerAppointment.first} min</div>
              <div><strong>Tempo Normal:</strong> {t.timePerAppointment.normal} min</div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Modalidades:</p>
              <div className="flex flex-wrap gap-1">
                {t.modalities.map((mod, idx) => (
                  <span key={idx} className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">{mod}</span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Horários disponíveis:</p>
              <div className="text-xs text-gray-700 space-y-1">
                {Object.entries(t.schedule).map(([day, times]) => (
                  <div key={day}>
                    <span className="font-medium capitalize">{day.replace('terca','terça').replace('sabado','sábado')}:</span> {times.join(', ')}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTherapists.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum terapeuta encontrado</h3>
          <p className="text-gray-500">Tente ajustar os filtros ou cadastre um novo terapeuta.</p>
        </div>
      )}

      {/* Modal do Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <TherapistForm
              therapist={selectedTherapist}
              onSubmit={handleSaveTherapist}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTherapistPage;
