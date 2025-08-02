// src/components/layout/Layout.jsx
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout({ children }) {
  console.log('рендерizando Layout');
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col min-h-0">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}