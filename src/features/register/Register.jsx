import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  const [userType, setUserType] = useState('');
  const [terapeutaType, setTerapeutaType] = useState('');
  const [formData, setFormData] = useState({});
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalType =
      userType === 'terapeuta' && terapeutaType
        ? `terapeuta_${terapeutaType}`
        : userType;

    if (!finalType || !password || !confirmPassword) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    if (password !== confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }

    alert(`Usuário cadastrado como ${finalType}!`);
    navigate('/');
  };

  const userFields = {
    administrativo: [
      { label: 'Nome', name: 'name', type: 'text' },
      { label: 'Data de nascimento', name: 'birthDate', type: 'date' },
      { label: 'Endereço', name: 'address', type: 'text' },
      { label: 'Telefone', name: 'phone', type: 'text' },
      { label: 'Registro SIAPE', name: 'siape', type: 'text' },
      { label: 'Cargo', name: 'position', type: 'text' },
      { label: 'Contato de emergência', name: 'emergencyContact', type: 'text' },
      { label: 'Unidade', name: 'unit', type: 'text' },
    ],
    terapeuta_servidor: [
      { label: 'Nome', name: 'name', type: 'text' },
      { label: 'Telefone', name: 'phone', type: 'text' },
      { label: 'Registro SIAPE', name: 'siape', type: 'text' },
      { label: 'Modalidade(s)', name: 'modalities', type: 'text' },
      { label: 'Dias e horários disponíveis', name: 'schedule', type: 'text' },
      { label: 'Tempo por atendimento (Primeira vez / Normal)', name: 'sessionTime', type: 'text' },
    ],
    terapeuta_voluntario: [
      { label: 'Nome', name: 'name', type: 'text' },
      { label: 'Telefone', name: 'phone', type: 'text' },
      { label: 'CPF', name: 'cpf', type: 'text' },
      { label: 'Modalidade(s)', name: 'modalities', type: 'text' },
      { label: 'Dias e horários disponíveis', name: 'schedule', type: 'text' },
      { label: 'Tempo por atendimento (Primeira vez / Normal)', name: 'sessionTime', type: 'text' },
    ],
  };

  const headerText = {
    administrativo: 'Cadastro de Técnico Administrativo',
    terapeuta: 'Escolha o tipo de Terapeuta',
    terapeuta_servidor: 'Cadastro de Terapeuta (Servidor)',
    terapeuta_voluntario: 'Cadastro de Terapeuta (Voluntário)',
  };

  const descriptionText = {
    administrativo: 'Preencha seus dados para acessar funções administrativas do sistema.',
    terapeuta: 'Escolha se você é servidor ou voluntário para continuar o cadastro.',
    terapeuta_servidor: 'Informe seus dados para atuar como terapeuta servidor.',
    terapeuta_voluntario: 'Informe seus dados para atuar como terapeuta voluntário.',
  };

  const finalType =
    userType === 'terapeuta' && terapeutaType
      ? `terapeuta_${terapeutaType}`
      : userType;

  return (
    <div className="register-wrapper">
      <div className="register-container">
        <div className="register-header">
          <h1>{finalType ? headerText[finalType] : 'Registrar no SHA'}</h1>
          <p>{finalType ? descriptionText[finalType] : 'Escolha seu tipo de usuário.'}</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Primeira escolha */}
          {!finalType && (
            <div className="input-group radio-group">
              <label className="radio-option">
                <span>Terapeuta</span>
                <input
                  type="radio"
                  name="userType"
                  value="terapeuta"
                  checked={userType === 'terapeuta'}
                  onChange={() => setUserType('terapeuta')}
                />
              </label>

              <label className="radio-option">
                <span>Assistente Administrativo</span>
                <input
                  type="radio"
                  name="userType"
                  value="administrativo"
                  checked={userType === 'administrativo'}
                  onChange={() => setUserType('administrativo')}
                />
              </label>

              {/* Segunda escolha apenas para terapeuta */}
              <div className={`nested-radio ${userType === 'terapeuta' ? 'show' : ''}`}>
                <label className="radio-option">
                  <span>Servidor</span>
                  <input
                    type="radio"
                    name="terapeutaType"
                    value="servidor"
                    checked={terapeutaType === 'servidor'}
                    onChange={() => setTerapeutaType('servidor')}
                  />
                </label>
                <label className="radio-option">
                  <span>Voluntário</span>
                  <input
                    type="radio"
                    name="terapeutaType"
                    value="voluntario"
                    checked={terapeutaType === 'voluntario'}
                    onChange={() => setTerapeutaType('voluntario')}
                  />
                </label>
              </div>
            </div>
          )}

          {/* Campos do formulário */}
          {finalType && userFields[finalType]?.map((field) => (
            <div className="input-group" key={field.name}>
              <input
                type={field.type}
                placeholder={field.label}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                required
              />
            </div>
          ))}

          {/* Senhas */}
          {finalType && (
            <>
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
            </>
          )}
        </form>

        {userType && !finalType && (
          <button
            className="mt-4 px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
            onClick={() => {
              setUserType('');
              setTerapeutaType('');
            }}
          >
            Voltar
          </button>
        )}

        <p className="login-link">
          Já tem uma conta? <a href="/">Entrar</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
