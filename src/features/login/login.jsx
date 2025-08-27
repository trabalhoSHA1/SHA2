// src/features/login/Login.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { AuthContext } from '@/context/AuthContext';

export default function Login() {
  const [userType, setUserType] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (!userType || !username || !password) {
      alert('Preencha todos os campos e selecione um tipo de usuário');
      return;
    }

    // Cria usuário simulado para testes
    const userData = {
      id: Date.now(), // id genérico
      name: username, // usa o que foi digitado
      role: userType === 'Administrador' ? 'admin' :
            userType === 'Terapeuta' ? 'therapist' : 'assistant'
    };

    // Salva no contexto (e no localStorage)
    login(userData);

    // Redireciona para dashboard conforme role
    if (userData.role === 'admin') {
      navigate('/dashboard/admin');
    } else if (userData.role === 'therapist') {
      navigate('/dashboard/therapist');
    } else {
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
          <input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Entrar no SHA</button>

        <p className="register-link">
          Não tem uma conta? <a href="/register">Registre-se</a>
        </p>
      </form>
    </div>
  );
}
