// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './features/login/Login';
import ProtectedRoute from './context/ProtectedRoute';
import Layout from './components/layout/Layout';
import TherapistDashboard from './components/dashboards/TherapistDashboard';

function App() {
  return (
    <BrowserRouter> {/* ✅ Único lugar onde o Router deve estar */}
      <Routes>
        {/* Rota pública de login */}
        <Route path="/login" element={<Login />} />

        {/* Rotas protegidas para terapeutas */}
        <Route element={<ProtectedRoute allowedRoles={['therapist']} />}>
          <Route
            path="/dashboard/therapist"
            element={
              <Layout>
                <TherapistDashboard />
              </Layout>
            }
          />
        </Route>

        {/* Redirecionamento padrão */}
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;