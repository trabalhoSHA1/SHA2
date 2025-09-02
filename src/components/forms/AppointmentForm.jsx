import React, { useState } from 'react';

export default function AppointmentForm() {
  const [mode, setMode] = useState('presencial');
  const [therapist, setTherapist] = useState('');
  const [patient, setPatient] = useState('');

  return (
    <form>
      <h2> Agendar Consulta</h2>

      <label>Tipo:</label>
      <select value={mode} onChange={(e) => setMode(e.target.value)}>
        <option value="presencial">Presencial</option>
        <option value="online">Online</option>
      </select>

      <input placeholder="Paciente" value={patient} onChange={(e) => setPatient(e.target.value)} />
      <input placeholder="Terapeuta" value={therapist} onChange={(e) => setTherapist(e.target.value)} />

      {mode === 'online' && <input placeholder="Link da consulta" />}
      
      <button type="submit">Salvar</button>
    </form>
  );
}