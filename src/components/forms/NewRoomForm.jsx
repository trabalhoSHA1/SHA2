import React, { useState } from "react";

export default function NewRoomForm() {
  const [roomName, setRoomName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    alert(`Nova sala criada: ${roomName}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Nome da Sala:</label>
      <input
        type="text"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />
      <button type="submit">Criar</button>
    </form>
  );
}
