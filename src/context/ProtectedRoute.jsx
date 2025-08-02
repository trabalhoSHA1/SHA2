// src/context/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function ProtectedRoute({ children, allowedRoles }) {
  const auth = useAuth();

  // Se useAuth retornar null ou undefined
  if (!auth) {
    console.log('ProtectedRoute: useAuth retornou null/undefined');
    return <Navigate to="/login" />;
  }

  const { user, loading } = auth;

  console.log('ProtectedRoute - user:', user);
  console.log('ProtectedRoute - loading:', loading);

  // Mostrar loading visível enquanto verifica autenticação
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  // Se não tem usuário, redireciona para login
  if (!user) {
    console.log('ProtectedRoute: Usuário não autenticado, redirecionando para login');
    return <Navigate to="/login" />;
  }

  // Se tem restrições de role e o usuário não tem permissão
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    console.log('ProtectedRoute: Usuário sem permissão, redirecionando para login');
    return <Navigate to="/login" />;
  }

  // Se passou por todas as verificações, renderiza os filhos
  console.log('ProtectedRoute: Usuário autenticado, renderizando children');
  return children;
}