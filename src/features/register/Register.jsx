import React, { useState } from "react";
import "./register.css";

export default function Register() {
  const [showTherapistOptions, setShowTherapistOptions] = useState(false);
  const [selectedType, setSelectedType] = useState(null); // servidor, voluntario ou assistente

  // === FORMULÁRIOS DE CADA UM ===
  const renderForm = () => {
    if (selectedType === "servidor") {
      return (
        <>
          <h1 className="register-title">Cadastro de Terapeuta - Servidor</h1>
          <p className="register-subtitle">
            Informe seus dados para se tornar um terapeuta servidor
          </p>
          <div className="input-group">
            <input type="text" placeholder="Nome" />
          </div>
          <div className="input-group">
            <input type="tel" placeholder="Telefone" />
          </div>
          <div className="input-group">
            <input type="text" placeholder="Registro SIAPE" />
          </div>
          <div className="input-group">
            <input type="text" placeholder="Modalidade(s)" />
          </div>
          <div className="input-group">
            <input type="text" placeholder="Dias e horários disponíveis" />
          </div>
          <div className="input-group">
            <input type="text" placeholder="Tempo por atendimento (Primeira vez / Normal)" />
          </div>
          <button>Registrar</button>
        </>
      );
    }

    if (selectedType === "voluntario") {
      return (
        <>
          <h1 className="register-title">Cadastro de Terapeuta - Voluntário</h1>
          <p className="register-subtitle">
            Informe seus dados para se tornar um terapeuta voluntário 💚
          </p>
          <div className="input-group">
            <input type="text" placeholder="Nome" />
          </div>
          <div className="input-group">
            <input type="tel" placeholder="Telefone" />
          </div>
          <div className="input-group">
            <input type="text" placeholder="CPF" />
          </div>
          <div className="input-group">
            <input type="text" placeholder="Modalidade(s)" />
          </div>
          <div className="input-group">
            <input type="text" placeholder="Dias e horários disponíveis" />
          </div>
          <div className="input-group">
            <input type="text" placeholder="Tempo por atendimento (Primeira vez / Normal)" />
          </div>
          <button>Registrar</button>
        </>
      );
    }

    if (selectedType === "assistente") {
      return (
        <>
          <h1 className="register-title">Cadastro de Assistente Administrativo</h1>
          <p className="register-subtitle">
            Informe seus dados para se tornar um técnico administrativo
          </p>
          <div className="input-group">
            <input type="text" placeholder="Nome" />
          </div>
          <div className="input-group">
            <input type="date" placeholder="Data de nascimento" />
          </div>
          <div className="input-group">
            <input type="text" placeholder="Endereço" />
          </div>
          <div className="input-group">
            <input type="tel" placeholder="Telefone" />
          </div>
          <div className="input-group">
            <input type="text" placeholder="Registro SIAPE" />
          </div>
          <div className="input-group">
            <input type="text" placeholder="Cargo" />
          </div>
          <div className="input-group">
            <input type="text" placeholder="Contato de emergência" />
          </div>
          <div className="input-group">
            <input type="text" placeholder="Unidade" />
          </div>
          <button>Registrar</button>
        </>
      );
    }

    // === Se nenhum foi selecionado ainda, mostra opções ===
    return (
      <>
        <h1 className="register-title">Registrar no SHA</h1>
        <p className="register-subtitle">Escolha seu tipo de usuário.</p>

        <div className="options">
          {/* Terapeuta */}
          <div
            className="option"
            onClick={() => setShowTherapistOptions(!showTherapistOptions)}
          >
            <span className="circle"></span>
            <span className="label">Terapeuta</span>
          </div>

          {showTherapistOptions && (
            <div className="therapist-options">
              <div
                className="option"
                onClick={() => setSelectedType("servidor")}
              >
                <span className="circle"></span>
                <span className="label">Servidor</span>
              </div>
              <div
                className="option"
                onClick={() => setSelectedType("voluntario")}
              >
                <span className="circle"></span>
                <span className="label">Voluntário</span>
              </div>
            </div>
          )}

          {/* Assistente Administrativo */}
          <div
            className="option"
            onClick={() => setSelectedType("assistente")}
          >
            <span className="circle"></span>
            <span className="label">Assistente Administrativo</span>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="register-container">
      <div className="register-card">{renderForm()}</div>
    </div>
  );
}
