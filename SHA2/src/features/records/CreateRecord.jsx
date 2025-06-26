import React, { useState } from 'react';

export default function CreateRecord() {
  const [anamnese, setAnamnese] = useState('');
  const [evolution, setEvolution] = useState('positiva');

  return (
    <div>
      <h2>📄 Prontuário</h2>

      <textarea
        placeholder="Anamnese"
        value={anamnese}
        onChange={(e) => setAnamnese(e.target.value)}
      />

      <label>Evolução:</label>
      <select value={evolution} onChange={(e) => setEvolution(e.target.value)}>
        <option value="positiva">Positiva</option>
        <option value="estavel">Estável</option>
        <option value="lenta">Lenta</option>
        <option value="negativa">Negativa</option>
      </select>

      <input type="file" />
      <button>Salvar prontuário</button>
    </div>
  );
}