// src/features/login/Login.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";

export default function Login() {
  const [userType, setUserType] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (!userType || !username || !password) {
      alert("Preencha todos os campos e selecione um tipo de usuário");
      return;
    }

    setLoading(true);

    const userData = {
      id: Date.now(),
      name: username,
      role:
        userType === "Administrador"
          ? "admin"
          : userType === "Terapeuta"
          ? "therapist"
          : "assistant",
    };

    login(userData);

    if (userData.role === "admin") navigate("/dashboard/admin");
    else if (userData.role === "therapist") navigate("/dashboard/therapist");
    else navigate("/dashboard/assistant");

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-green-50 to-white px-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-lg p-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-black-600">SHA</h1>
          <p className="text-gray-600 mt-2">
            Setor de Humanização e Acolhimento
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <select
            required
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="border border-green-200 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          >
            <option value="" disabled hidden>
              Tipo de Usuário
            </option>
            <option value="Administrador">Administrador</option>
            <option value="Terapeuta">Terapeuta</option>
            <option value="Assistente Administrativo">
              Assistente Administrativo
            </option>
          </select>

          <input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-green-200 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            required
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-green-200 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-green-400 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 shadow-md"
          >
            {loading ? "Entrando..." : "Entrar no SHA"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Não tem uma conta?{" "}
          <a
            href="/register"
            className="text-green-600 font-medium hover:underline"
          >
            Registre-se
          </a>
        </p>
      </div>
    </div>
  );
}
