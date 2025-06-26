// src/components/layout/Layout.jsx
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4">
        <h2 className="text-xl font-bold mb-6">SHA</h2>
        <nav className="space-y-2">
          <a href="/dashboard/therapist" className="block py-2 px-3 text-gray-700 hover:bg-gray-100 rounded">
            Minha Agenda
          </a>
          <a href="/records" className="block py-2 px-3 text-gray-700 hover:bg-gray-100 rounded">
            Prontuários
          </a>
          <a href="/appointments" className="block py-2 px-3 text-gray-700 hover:bg-gray-100 rounded">
            Agendamentos
          </a>
        </nav>
      </aside>

      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="p-6 overflow-auto bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
}