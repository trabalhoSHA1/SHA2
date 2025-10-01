// src/pages/SettingsPage.jsx
import React, { useState, useContext } from 'react';
import { User, Bell, Moon, Lock } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContext'; 

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [appointmentReminders, setAppointmentReminders] = useState(true);
  const [language, setLanguage] = useState('Português');
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState(30);

  const { theme, setTheme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  // classes dinâmicas
  const pageBg = isDark ? 'bg-[#121212]' : 'bg-gray-50';
  const cardBg = isDark
    ? 'bg-[#1F1F1F] border border-[#2C2C2C] text-gray-200'
    : 'bg-white border border-gray-200 text-gray-900';
  const inputBg = isDark
    ? 'bg-[#2A2A2A] border-[#2C2C2C] text-gray-200'
    : 'bg-white border border-gray-300 text-gray-900';
  const textPrimary = isDark ? 'text-gray-200' : 'text-gray-800';
  const textSecondary = isDark ? 'text-gray-300' : 'text-gray-600';

  return (
    <div className={`p-6 min-h-screen transition-colors duration-300 ${pageBg}`}>
      <h1 className={`text-2xl font-bold mb-4 ${textPrimary}`}>Configurações</h1>
      <p className={`mb-6 ${textSecondary}`}>
        Gerencie suas preferências e configurações do sistema.
      </p>

      {/* Perfil do Usuário */}
      <div className={`rounded-lg shadow-md p-4 mb-4 transition-colors duration-300 ${cardBg}`}>
        <h2 className={`text-lg font-semibold mb-2 flex items-center ${textPrimary}`}>
          <User className="w-5 h-5 mr-2" />
          Perfil do Usuário
        </h2>
        <form>
          {[
            { label: 'Nome', type: 'text', placeholder: 'Seu nome completo' },
            { label: 'E-mail', type: 'email', placeholder: 'seu.email@example.com' },
            { label: 'Telefone', type: 'tel', placeholder: '(99) 99999-9999' },
          ].map((field, i) => (
            <div className="mb-2" key={i}>
              <label className={`block text-sm font-medium ${textSecondary}`}>
                {field.label}
              </label>
              <input
                type={field.type}
                placeholder={field.placeholder}
                className={`mt-1 block w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 sm:text-sm transition-colors duration-300 ${inputBg}`}
              />
            </div>
          ))}
        </form>
      </div>

      {/* Notificações */}
      <div className={`rounded-lg shadow-md p-4 mb-4 transition-colors duration-300 ${cardBg}`}>
        <h2 className={`text-lg font-semibold mb-2 flex items-center ${textPrimary}`}>
          <Bell className="w-5 h-5 mr-2 text-yellow-500" />
          Notificações
        </h2>
        {[
          {
            label: 'Notificações por E-mail',
            checked: emailNotifications,
            setChecked: setEmailNotifications,
            desc: 'Receber notificações via e-mail',
          },
          {
            label: 'Notificações SMS',
            checked: smsNotifications,
            setChecked: setSmsNotifications,
            desc: 'Receber notificações via SMS',
          },
          {
            label: 'Lembretes de Consulta',
            checked: appointmentReminders,
            setChecked: setAppointmentReminders,
            desc: 'Receber lembretes antes das consultas',
          },
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between mb-2">
            <div>
              <label className={`text-sm font-medium ${textSecondary}`}>
                {item.label}
              </label>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {item.desc}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => item.setChecked(!item.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 rounded-full peer-checked:bg-green-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:h-5 after:w-5 after:rounded-full after:transition-all after:peer-checked:left-[calc(100%-15px)]" />
            </label>
          </div>
        ))}
      </div>

      {/* Aparência */}
      <div className={`rounded-lg shadow-md p-4 mb-4 transition-colors duration-300 ${cardBg}`}>
        <h2 className={`text-lg font-semibold mb-2 flex items-center ${textPrimary}`}>
          <Moon className="w-5 h-5 mr-2 text-purple-500" />
          Aparência
        </h2>
        <div className="flex space-x-2 mb-2">
          <button
            onClick={() => setTheme('light')}
            className={`px-4 py-2 rounded-lg ${
              theme === 'light'
                ? 'bg-green-500 text-white'
                : `${isDark ? 'bg-[#2A2A2A] text-gray-300' : 'bg-gray-200 text-gray-700'}`
            } transition-colors duration-300`}
          >
            Claro
          </button>
          <button
            onClick={() => setTheme('dark')}
            className={`px-4 py-2 rounded-lg ${
              theme === 'dark'
                ? 'bg-green-500 text-white'
                : `${isDark ? 'bg-[#2A2A2A] text-gray-300' : 'bg-gray-200 text-gray-700'}`
            } transition-colors duration-300`}
          >
            Escuro
          </button>
        </div>
        <div>
          <label className={`block text-sm font-medium ${textSecondary}`}>Idioma</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className={`mt-1 block w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 sm:text-sm transition-colors duration-300 ${inputBg}`}
          >
            <option value="pt-BR">Português</option>
            <option value="en-US">Inglês</option>
            <option value="es-ES">Espanhol</option>
          </select>
        </div>
      </div>

      {/* Segurança */}
      <div className={`rounded-lg shadow-md p-4 mb-4 transition-colors duration-300 ${cardBg}`}>
        <h2 className={`text-lg font-semibold mb-2 flex items-center ${textPrimary}`}>
          <Lock className="w-5 h-5 mr-2 text-red-500" />
          Segurança
        </h2>
        <div className="flex items-center justify-between mb-2">
          <div>
            <label className={`text-sm font-medium ${textSecondary}`}>
              Autenticação de Dois Fatores
            </label>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Adicione uma camada extra de segurança
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={twoFactorAuth}
              onChange={() => setTwoFactorAuth(!twoFactorAuth)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 rounded-full peer-checked:bg-green-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:h-5 after:w-5 after:rounded-full after:transition-all after:peer-checked:left-[calc(100%-15px)]" />
          </label>
        </div>
        <div>
          <label className={`block text-sm font-medium ${textSecondary}`}>
            Timeout da Sessão (minutos)
          </label>
          <input
            type="number"
            value={sessionTimeout}
            onChange={(e) => setSessionTimeout(Number(e.target.value))}
            className={`mt-1 block w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 sm:text-sm transition-colors duration-300 ${inputBg}`}
          />
        </div>
      </div>

      {/* Botão Salvar */}
      <div className="flex justify-end mt-4">
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors duration-300">
          Salvar Configurações
        </button>
      </div>
    </div>
  );
}
