import React, { useState } from 'react';

export default function PatientForm() {
  const [type, setType] = useState('');

  return (
    <form>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="">Selecione o tipo</option>
        <option value="professor">Professor</option>
        <option value="technician">Técnico Administrativo</option>
        <option value="student">Aluno</option>
        <option value="other">Outro</option>
      </select>

      {type === 'professor' && (
        <>
          <input placeholder="Nome" />
          <input placeholder="Data de nascimento" />
          <input placeholder="SIAPE" />
          <input placeholder="Unidade" />
        </>
      )}

      {/* Campos para outros tipos... */}
    </form>
  );
}