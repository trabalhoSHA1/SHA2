// src/features/rooms/RoomsList.jsx
import React, { useState } from "react";
import EditRoomModal from "../../../components/modals/EditRoomModal";
import { Edit, Trash } from "lucide-react";

export default function RoomsList({ rooms, onUpdateRoom, onDeleteRoom }) {
  const [editingRoom, setEditingRoom] = useState(null); // sala que está sendo editada
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = (room) => {
    setEditingRoom(room);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingRoom(null);
    setIsModalOpen(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {rooms.map((room) => (
        <div key={room.roomId} className="p-4 bg-white rounded-xl shadow flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-gray-900">{room.name}</h3>
            <p className="text-sm text-gray-600">{room.block} - {room.roomId}</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => handleEditClick(room)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Edit className="w-5 h-5 text-blue-600" />
            </button>
            <button
              onClick={() => onDeleteRoom(room.roomId)}
              className="p-2 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash className="w-5 h-5 text-red-600" />
            </button>
          </div>
        </div>
      ))}

      {isModalOpen && editingRoom && (
        <EditRoomModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          room={editingRoom}
          onSave={(updatedRoom) => {
            onUpdateRoom(updatedRoom);
            handleCloseModal();
          }}
        />
      )}
    </div>
  );
}
