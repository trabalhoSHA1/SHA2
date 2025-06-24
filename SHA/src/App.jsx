// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './features/login/Login';
import AdminDashboard from './components/dashboard/AdminDashboard';
import TherapistDashboard from './components/dashboard/TherapistDashboard';
import AssistantDashboard from './components/dashboard/AssistantDashboard';
import ProtectedRoute from './context/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Rotas protegidas */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['therapist']} />}>
          <Route path="/dashboard/therapist" element={<TherapistDashboard />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['assistant']} />}>
          <Route path="/dashboard/assistant" element={<AssistantDashboard />} />
        </Route>

        {/* Rota inicial */}
        <Route path="/" element={<div><h1>Home</h1><p><a href="/login">Fazer login</a></p></div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;