// src/components/layout/Sidebar.jsx
import React from 'react';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-md h-full p-4">
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
  );
}