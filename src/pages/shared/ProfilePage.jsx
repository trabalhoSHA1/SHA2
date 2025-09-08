// src/pages/ProfilePage.jsx
import React, { useState, useEffect, useContext } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit3,
  Save,
  X,
  Calendar,
  Building,
  IdCard,
} from "lucide-react";
import { AuthContext } from "@/context/AuthContext"; // <- onde vai pegar o usuário real futuramente

export default function ProfilePage() {
  console.log("📌 Renderizando Página de Perfil");

  // Exemplo: pegando usuário logado do AuthContext
  const { currentUser } = useContext(AuthContext) || {};

  // Se não tiver backend ainda, usamos mock
  const [user, setUser] = useState({
    name: currentUser?.name || "Dr. João Santos Silva",
    email: currentUser?.email || "joao.santos@universidade.edu.br",
    phone: currentUser?.phone || "(11) 99999-9999",
    address: currentUser?.address || "Rua das Flores, 123 - São Paulo/SP",
    siape: currentUser?.siape || "123456789",
    birthDate: currentUser?.birthDate || "15/03/1985",
    gender: currentUser?.gender || "Masculino",
    institution:
      currentUser?.institution || "Universidade Federal de São Paulo",
    department: currentUser?.department || "Departamento de Psicologia Clínica",
    crp: currentUser?.crp || "CRP-123456",
    specialty: currentUser?.specialty || "Psicoterapia, Terapia Familiar",
    yearsOfExperience: currentUser?.yearsOfExperience || 8,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setUser(editedUser);
    setIsEditing(false);

    // 🔗 Aqui no futuro entra o update no Supabase:
    // await supabase.from("therapists").update(editedUser).eq("id", currentUser.id);

    alert("✅ Perfil atualizado com sucesso!");
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2 mb-6">
        <User className="w-7 h-7 text-green-600" />
        Meu Perfil
      </h1>

      <div className="space-y-8">
        {/* Informações Pessoais */}
        <section className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-green-500" />
            Informações Pessoais
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nome */}
            <div>
              <label className="text-sm font-medium block text-gray-600 mb-1">
                Nome Completo
              </label>
              <input
                type="text"
                name="name"
                value={isEditing ? editedUser.name : user.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Data de Nascimento */}
            <div>
              <label className="text-sm font-medium block text-gray-600 mb-1">
                Data de Nascimento
              </label>
              <input
                type="text"
                name="birthDate"
                value={isEditing ? editedUser.birthDate : user.birthDate}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Gênero */}
            <div>
              <label className="text-sm font-medium block text-gray-600 mb-1">
                Gênero
              </label>
              <select
                name="gender"
                value={isEditing ? editedUser.gender : user.gender}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option>Masculino</option>
                <option>Feminino</option>
                <option>Outro</option>
              </select>
            </div>

            {/* Telefone */}
            <div>
              <label className="text-sm font-medium block text-gray-600 mb-1">
                Telefone
              </label>
              <input
                type="text"
                name="phone"
                value={isEditing ? editedUser.phone : user.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium block text-gray-600 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={isEditing ? editedUser.email : user.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Endereço */}
            <div>
              <label className="text-sm font-medium block text-gray-600 mb-1">
                Endereço
              </label>
              <input
                type="text"
                name="address"
                value={isEditing ? editedUser.address : user.address}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </section>

        {/* Informações Profissionais */}
        <section className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2 mb-4">
            <Building className="w-5 h-5 text-green-500" />
            Informações Profissionais
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium block text-gray-600 mb-1">
                SIAPE
              </label>
              <input
                type="text"
                name="siape"
                value={isEditing ? editedUser.siape : user.siape}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium block text-gray-600 mb-1">
                Instituição
              </label>
              <input
                type="text"
                name="institution"
                value={isEditing ? editedUser.institution : user.institution}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium block text-gray-600 mb-1">
                Departamento
              </label>
              <input
                type="text"
                name="department"
                value={isEditing ? editedUser.department : user.department}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium block text-gray-600 mb-1">
                Registro Profissional (CRP)
              </label>
              <input
                type="text"
                name="crp"
                value={isEditing ? editedUser.crp : user.crp}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium block text-gray-600 mb-1">
                Especialidades
              </label>
              <input
                type="text"
                name="specialty"
                value={isEditing ? editedUser.specialty : user.specialty}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium block text-gray-600 mb-1">
                Anos de Experiência
              </label>
              <input
                type="number"
                name="yearsOfExperience"
                value={
                  isEditing
                    ? editedUser.yearsOfExperience
                    : user.yearsOfExperience
                }
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </section>
      </div>

      {/* Botões fixos */}
      <div className="flex justify-end gap-3 mt-8">
        {isEditing ? (
          <>
            <button
              onClick={handleCancel}
              className="flex items-center bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded-lg font-medium"
            >
              <X className="w-4 h-4 mr-2" />
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="flex items-center bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-medium"
            >
              <Save className="w-4 h-4 mr-2" />
              Salvar
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium"
          >
            <Edit3 className="w-4 h-4 mr-2" />
            Editar Perfil
          </button>
        )}
      </div>
    </div>
  );
}
