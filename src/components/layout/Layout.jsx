// src/components/layout/Layout.jsx
import React, { useContext } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { AuthContext } from '@/context/AuthContext';

export default function Layout({ children }) {
  const { user, loading } = useContext(AuthContext);

  // Podemos esperar carregar o user ou usar fallback
  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar recebe o user ou undefined */}
      <Sidebar user={user} loading={loading} />

      <div className="flex-1 flex flex-col min-h-0 bg-white">
        <Header user={user} loading={loading} />
        <main className="flex-1 overflow-auto p-6 bg-white transition-colors duration-300">
          {children}
        </main>
      </div>
    </div>
  );
}
