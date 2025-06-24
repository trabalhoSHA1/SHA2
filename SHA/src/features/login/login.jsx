// src/features/login/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const [userType, setUserType] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!userType) {
      alert('Selecione um tipo de usuário');
      return;
    }

    // Simula login com tipo de usuário
    const userData = {
      id: 1,
      name: userType === 'Administrador' ? 'Admin' :
            userType === 'Terapeuta' ? 'Dr. João' : 'Ana Assistente',
      role: userType === 'Administrador' ? 'admin' :
             userType === 'Terapeuta' ? 'therapist' : 'assistant'
    };

    // Salva no localStorage pra simular autenticação
    localStorage.setItem('user', JSON.stringify(userData));

    // Redireciona
    if (userData.role === 'admin') {
      navigate('/dashboard/admin');
    } else if (userData.role === 'therapist') {
      navigate('/dashboard/therapist');
    } else if (userData.role === 'assistant') {
      navigate('/dashboard/assistant');
    }
  }

  return (
    <div className="login-wrapper">
      <form className="login-container" onSubmit={handleSubmit}>
        <h1>SHA</h1>
        <p className="subtitle">Sistema de Humanização e Acolhimento</p>

        <div className="input-group">
          <select
            required
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="" disabled hidden>Tipo de Usuário</option>
            <option value="Administrador">Administrador</option>
            <option value="Terapeuta">Terapeuta</option>
            <option value="Assistente Administrativo">Assistente Administrativo</option>
          </select>
        </div>

        <div className="input-group">
          <input type="text" placeholder="Usuário" required />
        </div>

        <div className="input-group">
          <input type="password" placeholder="Senha" required />
        </div>

        <button type="submit">Entrar no SHA</button>

        <p className="register-link">
          Não tem uma conta? <a href="/register">Registre-se</a>
        </p>
      </form>
    </div>
  );
}