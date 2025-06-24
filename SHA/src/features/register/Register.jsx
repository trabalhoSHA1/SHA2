import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import './Register.css'; // seu CSS separado

function Register() {
  const [userType, setUserType] = useState('');
  const [username, setUsername] = useState(''); // email para login
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!userType || !username || !password || !confirmPassword) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    if (password !== confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }

    const { data, error } = await supabase.auth.signUp(
      {
        email: username,
        password,
      },
      {
        data: { userType },
      }
    );

    if (error) {
      alert('Erro ao registrar: ' + error.message);
    } else {
      alert('Registro feito! Verifique seu email para confirmar.');
      navigate('/');
    }
  }

  return (
    <div className="register-wrapper">
      <div className="register-container">
        <h1>Registrar no SHA</h1>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              required
            >
              <option value="" disabled>
                Tipo de Usuário
              </option>
              <option value="terapeuta">Terapeuta</option>
              <option value="assistente">Assistente Administrativo</option>
              <option value="administrador">Administrador</option>
            </select>
          </div>

          <div className="input-group">
            <input
              type="email"
              placeholder="Email (usuário)"
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
              minLength={6}
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Confirmar Senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <button type="submit">Registrar</button>
        </form>

        <p className="login-link">
          Já tem uma conta? <a href="/">Entrar</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
