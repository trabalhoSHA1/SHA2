import React, { useState } from 'react';
import { Building, Plus, Search, Edit, Eye, MapPin } from 'lucide-react';
import NewRoomForm from "../../components/forms/NewRoomForm";
import ViewRoomModal from '../../components/modals/ViewRoomModal';
import { EditRoomModal } from "../../components/modals/EditRoomModal";

const RoomsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewRoomForm, setShowNewRoomForm] = useState(false);
  const [viewRoom, setViewRoom] = useState(null);
  const [editRoom, setEditRoom] = useState(null);

  const [rooms, setRooms] = useState([
    {
      id: 1,
      name: 'Sala de Psicologia 101',
      block: 'Bloco A',
      roomId: 'A-101',
      capacity: 1,
      type: 'individual',
      equipment: ['Computador', 'Projetor', 'Ar condicionado'],
      status: 'disponivel',
      modalidades: ['Psicologia Clínica', 'Terapia Cognitiva'],
      schedule: {
        segunda: ['08:00-12:00', '14:00-18:00'],
        terca: ['08:00-12:00', '14:00-18:00'],
        quarta: ['08:00-12:00', '14:00-18:00'],
        quinta: ['08:00-12:00', '14:00-18:00'],
        sexta: ['08:00-12:00']
      }
    },
    {
      id: 2,
      name: 'Sala de Terapia em Grupo',
      block: 'Bloco B',
      roomId: 'B-205',
      capacity: 8,
      type: 'coletiva',
      equipment: ['Cadeiras em círculo', 'Flipchart', 'Ar condicionado'],
      status: 'ocupada',
      modalidades: ['Terapia em Grupo', 'Dinâmica de Grupo'],
      schedule: {
        segunda: ['14:00-18:00'],
        quarta: ['14:00-18:00'],
        sexta: ['14:00-18:00']
      }
    },
    {
      id: 3,
      name: 'Consultório Multidisciplinar',
      block: 'Bloco C',
      roomId: 'C-303',
      capacity: 2,
      type: 'individual',
      equipment: ['Mesa médica', 'Computador', 'Biombo', 'Ar condicionado'],
      status: 'manutencao',
      modalidades: ['Psicologia Clínica', 'Avaliação Psicológica'],
      schedule: {}
    },
    {
      id: 4,
      name: 'Sala de Orientação Vocacional',
      block: 'Bloco A',
      roomId: 'A-152',
      capacity: 1,
      type: 'individual',
      equipment: ['Computador', 'Materiais de teste', 'Ar condicionado'],
      status: 'disponivel',
      modalidades: ['Orientação Vocacional', 'Avaliação Psicológica'],
      schedule: {
        terca: ['08:00-12:00', '14:00-18:00'],
        quinta: ['08:00-12:00', '14:00-18:00']
      }
    }
  ]);

  const handleNewRoom = (roomData) => {
    const newRoom = {
      id: rooms.length + 1,
      ...roomData
    };

    setRooms((prev) => [...prev, newRoom]);
    console.log('Nova sala cadastrada:', newRoom);
  };

  const handleEditRoom = (roomData) => {
    setRooms((prev) =>
      prev.map((room) => (room.id === roomData.id ? roomData : room))
    );
    console.log('Sala editada:', roomData);
  };

  const filteredRooms = rooms.filter((room) =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.block.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.roomId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.modalidades.some((modalidade) =>
      modalidade.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'disponivel': return 'bg-green-100 text-green-700';
      case 'ocupada': return 'bg-red-100 text-red-700';
      case 'manutencao': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'disponivel': return 'Disponível';
      case 'ocupada': return 'Ocupada';
      case 'manutencao': return 'Manutenção';
      default: return 'Desconhecido';
    }
  };

  const getTypeLabel = (type) => {
    return type === 'individual' ? 'Individual' : 'Coletiva';
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Building className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Gerenciamento de Salas</h1>
        </div>
        <button
          onClick={() => setShowNewRoomForm(true)}
          className="bg-green-500 text-white px-0 py-2 rounded-lg ho21 hover:to-green-600 transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Nova Sala
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar salas por nome, bloco, ID ou modalidade..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Building className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total de Salas</p>
              <p className="text-2xl font-bold text-gray-900">{rooms.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <MapPin className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Disponíveis</p>
              <p className="text-2xl font-bold text-gray-900">
                {rooms.filter((room) => room.status === 'disponivel').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="bg-red-100 p-3 rounded-lg">
              <Building className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Ocupadas</p>
              <p className="text-2xl font-bold text-gray-900">
                {rooms.filter((room) => room.status === 'ocupada').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="bg-orange-100 p-3 rounded-lg">
              <Building className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Manutenção</p>
              <p className="text-2xl font-bold text-gray-900">
                {rooms.filter((room) => room.status === 'manutencao').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Salas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRooms.map((room) => (
          <div key={room.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{room.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-gray-500">{room.block} - {room.roomId}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(room.status)}`}>
                    {getStatusLabel(room.status)}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setViewRoom(room)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Visualizar detalhes"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setEditRoom(room)}
                  className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  title="Editar sala"
                >
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Tipo:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  room.type === 'individual' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                }`}>
                  {getTypeLabel(room.type)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Capacidade:</span>
                <span className="text-sm font-medium text-gray-900">
                  {room.capacity} {room.capacity === 1 ? 'pessoa' : 'pessoas'}
                </span>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Equipamentos:</p>
                <div className="flex flex-wrap gap-1">
                  {room.equipment.map((item, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Modalidades:</p>
                <div className="flex flex-wrap gap-1">
                  {room.modalidades.map((modalidade, index) => (
                    <span key={index} className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                      {modalidade}
                    </span>
                  ))}
                </div>
              </div>

              {Object.keys(room.schedule).length > 0 && (
                <div>
                  <p className="text-sm text-gray-600 mb-1">Horários disponíveis:</p>
                  <div className="text-xs text-gray-700 space-y-1">
                    {Object.entries(room.schedule).map(([day, times]) => (
                      <div key={day}>
                        <span className="font-medium capitalize">{day}:</span> {times.join(', ')}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredRooms.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma sala encontrada</h3>
          <p className="text-gray-500">Tente ajustar os filtros de busca ou cadastre uma nova sala.</p>
        </div>
      )}

      {/* Modals */}
      <NewRoomForm 
        isOpen={showNewRoomForm}
        onClose={() => setShowNewRoomForm(false)}
        onSubmit={handleNewRoom}
      />

      <ViewRoomModal
        isOpen={!!viewRoom}
        onClose={() => setViewRoom(null)}
        room={viewRoom}
      />

      <EditRoomModal
        isOpen={!!editRoom}
        onClose={() => setEditRoom(null)}
        room={editRoom}
        onSave={handleEditRoom}
      />
    </div>
  );
};

export default RoomsPage;
