// src/pages/ProfilePage.jsx
import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Edit3, Save, X, Calendar, Building, IdCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';


export default function ProfilePage() {
  console.log('рендерizando Página de Perfil');
  
  // Simulando dados do usuário logado
  const [user, setUser] = useState({
    name: 'Dr. João Santos Silva',
    email: 'joao.santos@universidade.edu.br',
    phone: '(11) 99999-9999',
    address: 'Rua das Flores, 123 - São Paulo/SP',
    siape: '123456789',
    birthDate: '15/03/1985',
    gender: 'Masculino',
    institution: 'Universidade Federal de São Paulo',
    department: 'Departamento de Psicologia Clínica',
    crp: 'CRP-123456',
    specialty: 'Psicoterapia, Terapia Familiar',
    yearsOfExperience: 8
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setUser(editedUser);
    setIsEditing(false);
    alert('Perfil atualizado com sucesso!');
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  return (
    <div className="p-6">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-6 h-6 text-green-500" />
            <span className="text-2xl font-bold text-gray-800">Meu Perfil</span>
          </CardTitle>
          <p className="text-gray-600">Gerencie suas informações pessoais e profissionais</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Informações Pessoais */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-blue-500" />
              Informações Pessoais
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium block text-gray-700 mb-1">
                  Nome Completo
                </label>
                <input
                  type="text"
                  name="name"
                  value={isEditing ? editedUser.name : user.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  disabled={!isEditing}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium block text-gray-700 mb-1">
                  Data de Nascimento
                </label>
                <div className="relative">
                  <Calendar className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="birthDate"
                    value={isEditing ? editedUser.birthDate : user.birthDate}
                    onChange={handleInputChange}
                    className="w-full pl-10 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    disabled={!isEditing}
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium block text-gray-700 mb-1">
                  Gênero
                </label>
                <select
                  name="gender"
                  value={isEditing ? editedUser.gender : user.gender}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  disabled={!isEditing}
                >
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium block text-gray-700 mb-1">
                  Telefone
                </label>
                <div className="relative">
                  <Phone className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="phone"
                    value={isEditing ? editedUser.phone : user.phone}
                    onChange={handleInputChange}
                    className="w-full pl-10 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    disabled={!isEditing}
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium block text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={isEditing ? editedUser.email : user.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    disabled={!isEditing}
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium block text-gray-700 mb-1">
                  Endereço
                </label>
                <div className="relative">
                  <MapPin className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="address"
                    value={isEditing ? editedUser.address : user.address}
                    onChange={handleInputChange}
                    className="w-full pl-10 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Informações Profissionais */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Building className="w-5 h-5 mr-2 text-green-500" />
              Informações Profissionais
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium block text-gray-700 mb-1">
                  SIAPE
                </label>
                <div className="relative">
                  <IdCard className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="siape"
                    value={isEditing ? editedUser.siape : user.siape}
                    onChange={handleInputChange}
                    className="w-full pl-10 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    disabled={!isEditing}
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium block text-gray-700 mb-1">
                  Instituição
                </label>
                <input
                  type="text"
                  name="institution"
                  value={isEditing ? editedUser.institution : user.institution}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  disabled={!isEditing}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium block text-gray-700 mb-1">
                  Departamento
                </label>
                <input
                  type="text"
                  name="department"
                  value={isEditing ? editedUser.department : user.department}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  disabled={!isEditing}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium block text-gray-700 mb-1">
                  Registro Profissional (CRP)
                </label>
                <input
                  type="text"
                  name="crp"
                  value={isEditing ? editedUser.crp : user.crp}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  disabled={!isEditing}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium block text-gray-700 mb-1">
                  Especialidades
                </label>
                <input
                  type="text"
                  name="specialty"
                  value={isEditing ? editedUser.specialty : user.specialty}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  disabled={!isEditing}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium block text-gray-700 mb-1">
                  Anos de Experiência
                </label>
                <input
                  type="number"
                  name="yearsOfExperience"
                  value={isEditing ? editedUser.yearsOfExperience : user.yearsOfExperience}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex justify-end space-x-3 pt-4">
            {isEditing ? (
              <>
                <button
                  onClick={handleCancel}
                  className="flex items-center bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Alterações
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Editar Perfil
              </button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}