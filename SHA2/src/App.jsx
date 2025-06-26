// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Calendar, Users, Clock, Video, FileText, TrendingUp } from 'lucide-react';
import Login from './features/login/Login';
import ProtectedRoute from './context/ProtectedRoute';
import Layout from './components/layout/Layout';
import TherapistDashboard from './components/dashboard/TherapistDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Rotas protegidas com layout */}
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

        {/* Rota padrão */}
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;