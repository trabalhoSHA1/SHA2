import React from "react";

export default function RoomDetail({ room, onBack }) {
  if (!room) return null;

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <button 
        className="mb-4 px-3 py-1 bg-green-500 text-white rounded"
        onClick={onBack}
      >
        ← Voltar
      </button>
      <h2 className="text-xl font-bold mb-2">{room.name}</h2>
      <p><strong>Capacidade:</strong> {room.capacity} pessoas</p>
      <p><strong>Status:</strong> {room.isAvailable ? "Disponível" : "Ocupada"}</p>
      <p><strong>Descrição:</strong> {room.description}</p>
    </div>
  );
}
