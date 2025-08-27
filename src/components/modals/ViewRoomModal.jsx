import React from "react";

export default function ViewRoomModal({ room, onClose }) {
  if (!room) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Detalhes da Sala</h2>
        <p><strong>Nome:</strong> {room.name}</p>
        <p><strong>Capacidade:</strong> {room.capacity}</p>
        <p><strong>Status:</strong> {room.status}</p>

        <div className="mt-4 flex justify-end">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={onClose}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
