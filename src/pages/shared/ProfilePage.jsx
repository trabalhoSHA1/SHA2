// src/pages/ProfilePage.jsx
import React, { useState, useEffect, useContext } from "react";
import { User, Mail, Phone, MapPin, Edit3, Save, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthContext } from "@/context/AuthContext";
import { ThemeContext } from "@/context/ThemeContext";
import { useProfile } from "@/hooks/useProfile";

export default function ProfilePage() {
  const { currentUser } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const { userData, loading, updateProfile } = useProfile(currentUser?.id);

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({});

  // Atualiza os dados do formulário quando o hook retorna os dados
  useEffect(() => {
    if (userData) setProfileData(userData);
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    await updateProfile(profileData);
    setIsEditing(false);
    alert("✅ Perfil atualizado com sucesso!");
  };

  const handleCancel = () => {
    setProfileData(userData);
    setIsEditing(false);
  };

  if (loading) return <div className="p-6 text-gray-600">Carregando perfil...</div>;
  if (!userData) return <div className="p-6 text-red-600">Erro ao carregar perfil.</div>;

  // Classes de tema
  const bgClass = theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900";
  const cardClass = theme === "dark" ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900";
  const inputClass =
    theme === "dark"
      ? "w-full p-3 border border-gray-700 rounded-md bg-gray-700 text-gray-100 focus:ring-2 focus:ring-green-400"
      : "w-full p-3 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-green-500";

  return (
    <div className={`${bgClass} min-h-screen p-8`}>
      <Card className={`${cardClass} max-w-3xl mx-auto`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-green-600" /> Meu Perfil
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <Field label="Nome" name="name" value={profileData.name} onChange={handleChange} isEditing={isEditing} inputClass={inputClass} />
            <Field label="Email" name="email" value={profileData.email} onChange={handleChange} isEditing={isEditing} inputClass={inputClass} icon={Mail} />
            <Field label="Telefone" name="phone" value={profileData.phone} onChange={handleChange} isEditing={isEditing} inputClass={inputClass} icon={Phone} />
            <Field label="Endereço" name="address" value={profileData.address} onChange={handleChange} isEditing={isEditing} inputClass={inputClass} icon={MapPin} />
          </div>

          {/* Botões */}
          <div className="flex justify-end gap-2 mt-4">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center"
                >
                  <Save className="w-4 h-4 mr-2" /> Salvar
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300 flex items-center"
                >
                  <X className="w-4 h-4 mr-2" /> Cancelar
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center"
              >
                <Edit3 className="w-4 h-4 mr-2" /> Editar Perfil
              </button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Componente reutilizável para campos
function Field({ label, name, value, onChange, isEditing, inputClass, icon: Icon }) {
  return (
    <div>
      <label className="text-sm font-medium block mb-1">{label}</label>
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />}
        <input
          type="text"
          name={name}
          value={value || ""}
          onChange={onChange}
          disabled={!isEditing}
          className={`${inputClass} ${Icon ? "pl-10" : ""}`}
        />
      </div>
    </div>
  );
}
