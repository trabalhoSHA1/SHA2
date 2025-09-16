// src/components/layout/Layout.jsx
import React, { useContext } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { AuthContext } from '@/context/AuthContext';
import { ThemeContext } from '@/context/ThemeContext';

export default function Layout({ children }) {
  const { user, loading } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  const isDark = theme === 'dark';

  // Fundo principal do layout igual ao AdminDashboard
  const bg = isDark ? 'bg-[#121212]' : 'bg-gray-50';
  const mainBg = isDark ? 'bg-[#121212]' : 'bg-gray-50';

  return (
    <div className={`flex h-screen transition-colors duration-300 ${bg}`}>
      <Sidebar user={user} loading={loading} />

      <div className={`flex-1 flex flex-col min-h-0 transition-colors duration-300 ${mainBg}`}>
        <Header user={user} loading={loading} />
        <main className={`flex-1 overflow-auto p-6 transition-colors duration-300 ${mainBg}`}>
          {children}
        </main>
      </div>
    </div>
  );
}
