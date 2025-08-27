// src/features/login/Login.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import './Login.css';
=======
>>>>>>> 8aca77de771e6f1adf5fd0d576c73ff1bbfcd954
import { AuthContext } from '@/context/AuthContext';

export default function Login() {
  const [userType, setUserType] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
<<<<<<< HEAD
=======
  const [loading, setLoading] = useState(false);

>>>>>>> 8aca77de771e6f1adf5fd0d576c73ff1bbfcd954
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
<<<<<<< HEAD

    if (!userType || !username || !password) {
      alert('Preencha todos os campos e selecione um tipo de usuário');
      return;
    }

    // Cria usuário simulado para testes
    const userData = {
      id: Date.now(), // id genérico
      name: username, // usa o que foi digitado
=======
    if (!userType) return alert('Selecione um tipo de usuário');

    setLoading(true);

    const userData = {
      id: 1,
      name: username || (userType === 'Administrador' ? 'Admin' :
                        userType === 'Terapeuta' ? 'Terapeuta' : 'Assistente'),
>>>>>>> 8aca77de771e6f1adf5fd0d576c73ff1bbfcd954
      role: userType === 'Administrador' ? 'admin' :
            userType === 'Terapeuta' ? 'therapist' : 'assistant'
    };

<<<<<<< HEAD
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
=======
    login(userData);

    if (userData.role === 'admin') navigate('/dashboard/admin');
    else if (userData.role === 'therapist') navigate('/dashboard/therapist');
    else navigate('/dashboard/assistant');

    setLoading(false);
>>>>>>> 8aca77de771e6f1adf5fd0d576c73ff1bbfcd954
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 flex flex-col gap-6"
      >
        <h1 className="text-3xl font-bold text-black-900 text-center">SHA</h1>
        <p className="text-center text-black-700">Sistema de Humanização e Acolhimento</p>

        <select
          required
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          className="border border-green-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          <option value="" disabled hidden>Tipo de Usuário</option>
          <option value="Administrador">Administrador</option>
          <option value="Terapeuta">Terapeuta</option>
          <option value="Assistente Administrativo">Assistente Administrativo</option>
        </select>

<<<<<<< HEAD
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
=======
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border border-green-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-green-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
        />
>>>>>>> 8aca77de771e6f1adf5fd0d576c73ff1bbfcd954

        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 hover:bg-green-400 text-white font-semibold py-2 rounded transition-colors disabled:opacity-50"
        >
          {loading ? 'Entrando...' : 'Entrar no SHA'}
        </button>

        <p className="text-center text-sm text-green-700">
          Não tem uma conta? <a href="/register" className="underline">Registre-se</a>
        </p>
      </form>
    </div>
  );
}
