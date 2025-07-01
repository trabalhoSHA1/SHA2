import React from 'react';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white p-4 h-screen">
      <h2 className="text-xl font-bold mb-6">SHA</h2>
      <nav className="space-y-2">
        <a href="/dashboard/therapist" className="block py-2 px-3 hover:bg-gray-700 rounded">
          Minha Agenda
        </a>
        <a href="/records" className="block py-2 px-3 hover:bg-gray-700 rounded">
          Prontuários
        </a>
        <a href="/appointments" className="block py-2 px-3 hover:bg-gray-700 rounded">
          Agendamentos
        </a>
      </nav>
    </aside>
  );
}