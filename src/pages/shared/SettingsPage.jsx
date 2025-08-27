// src/pages/SettingsPage.jsx
import React, { useState } from 'react';
import { User, Mail, Phone, Bell, Moon, Sun, Globe, Lock } from 'lucide-react';

export default function SettingsPage() {
  console.log('рендерizando Página de Configurações');

  // Simulando estados para os toggles e campos
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [appointmentReminders, setAppointmentReminders] = useState(true);
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('Português');
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState(30);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Configurações</h1>
      <p className="text-gray-600 mb-6">Gerencie suas preferências e configurações do sistema.</p>

      {/* Perfil do Usuário */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <h2 className="text-lg font-semibold mb-2 flex items-center">
          <User className="w-5 h-5 mr-2" />
          Perfil do Usuário
        </h2>
        <form>
          <div className="mb-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nome
            </label>
            <input
              type="text"
              id="name"
              placeholder="Seu nome completo"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              placeholder="seu.email@example.com"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Telefone
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="(99) 99999-9999"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </form>
      </div>

      {/* Notificações */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <h2 className="text-lg font-semibold mb-2 flex items-center">
          <Bell className="w-5 h-5 mr-2 text-yellow-500" />
          Notificações
        </h2>
        <div className="flex items-center justify-between mb-2">
          <div>
            <label htmlFor="email-notifications" className="text-sm font-medium text-gray-700">
              Notificações por E-mail
            </label>
            <p className="text-xs text-gray-500">Receber notificações via e-mail</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={() => setEmailNotifications(!emailNotifications)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-green-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:h-5 after:w-5 after:rounded-full after:transition-all after:peer-checked:bg-white after:peer-checked:left-[calc(100%-15px)]" />
          </label>
        </div>
        <div className="flex items-center justify-between mb-2">
          <div>
            <label htmlFor="sms-notifications" className="text-sm font-medium text-gray-700">
              Notificações SMS
            </label>
            <p className="text-xs text-gray-500">Receber notificações via SMS</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={smsNotifications}
              onChange={() => setSmsNotifications(!smsNotifications)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-green-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:h-5 after:w-5 after:rounded-full after:transition-all after:peer-checked:bg-white after:peer-checked:left-[calc(100%-15px)]" />
          </label>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <label htmlFor="appointment-reminders" className="text-sm font-medium text-gray-700">
              Lembretes de Consulta
            </label>
            <p className="text-xs text-gray-500">Receber lembretes antes das consultas</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={appointmentReminders}
              onChange={() => setAppointmentReminders(!appointmentReminders)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-green-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:h-5 after:w-5 after:rounded-full after:transition-all after:peer-checked:bg-white after:peer-checked:left-[calc(100%-15px)]" />
          </label>
        </div>
      </div>

      {/* Aparência */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <h2 className="text-lg font-semibold mb-2 flex items-center">
          <Moon className="w-5 h-5 mr-2 text-purple-500" />
          Aparência
        </h2>
        <div className="flex space-x-2 mb-2">
          <button
            onClick={() => setTheme('light')}
            className={`px-4 py-2 rounded-lg ${theme === 'light' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'} hover:bg-blue-600 transition-colors`}
          >
            Claro
          </button>
          <button
            onClick={() => setTheme('dark')}
            className={`px-4 py-2 rounded-lg ${theme === 'dark' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'} hover:bg-blue-600 transition-colors`}
          >
            Escuro
          </button>
        </div>
        <div>
          <label htmlFor="language" className="block text-sm font-medium text-gray-700">
            Idioma
          </label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="pt-BR">Português</option>
            <option value="en-US">Inglês</option>
            <option value="es-ES">Espanhol</option>
          </select>
        </div>
      </div>

      {/* Segurança */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <h2 className="text-lg font-semibold mb-2 flex items-center">
          <Lock className="w-5 h-5 mr-2 text-red-500" />
          Segurança
        </h2>
        <div className="flex items-center justify-between mb-2">
          <div>
            <label htmlFor="two-factor-auth" className="text-sm font-medium text-gray-700">
              Autenticação de Dois Fatores
            </label>
            <p className="text-xs text-gray-500">Adicione uma camada extra de segurança</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={twoFactorAuth}
              onChange={() => setTwoFactorAuth(!twoFactorAuth)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-green-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:h-5 after:w-5 after:rounded-full after:transition-all after:peer-checked:bg-white after:peer-checked:left-[calc(100%-15px)]" />
          </label>
        </div>
        <div>
          <label htmlFor="session-timeout" className="block text-sm font-medium text-gray-700">
            Timeout da Sessão (minutos)
          </label>
          <input
            type="number"
            id="session-timeout"
            value={sessionTimeout}
            onChange={(e) => setSessionTimeout(Number(e.target.value))}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      {/* Botão de Salvar */}
      <div className="flex justify-end mt-4">
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors">
          Salvar Configurações
        </button>
      </div>
    </div>
  );
}