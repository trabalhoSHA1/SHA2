// src/hooks/useAuth.js
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    console.warn('useAuth deve ser usado dentro de um AuthProvider');
    return null;
  }
  
  return context;
};