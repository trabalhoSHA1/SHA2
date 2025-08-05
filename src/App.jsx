// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './features/login/Login';
import Layout from './components/layout/Layout';
import TherapistDashboard from './components/dashboards/TherapistDashboard';
import PatientPage from './pages/PatientPage';
import SettingsPage from './pages/SettingsPage';
import PatientMedicalRecord from './pages/PatientMedicalRecord';
import PatientDetailPage from './pages/PatientDetailPage';
import PatientRecordsPage from './pages/PatientRecordsPage';
import ProfilePage from './pages/ProfilePage';
import MySchedulePage from './pages/AppointmentsPage';
import AppointmenstPage from './pages/AppointmentsPage';

function App() {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <BrowserRouter>
        <Routes>
          {/* Rotas públicas */}
          <Route path="/login" element={<Login />} />
          
          {/* Rotas protegidas */}
          <Route path="/dashboard/therapist" element={
            <Layout>
              <TherapistDashboard />
            </Layout>
          } />
          
          <Route path="/patients" element={
            <Layout>
              <PatientPage />
            </Layout>
          } />
          
          <Route path="/settings" element={
            <Layout>
              <SettingsPage />
            </Layout>
          } />
          
          {/* Rota para prontuários do paciente */}
          <Route path="/patients/:siape/medical-record" element={
            <Layout>
              <PatientMedicalRecord />
            </Layout>
          } />
          
          {/* Rota para detalhes do paciente */}
          <Route path="/patients/:siape" element={
            <Layout>
              <PatientDetailPage />
            </Layout>
          } />
          
          {/* Rota para registros do paciente */}
          <Route path="/patients/:siape/records" element={
            <Layout>
              <PatientRecordsPage />
            </Layout>
          } />

          {/* Rota para consultas */}
          <Route path="consultas" element={
            <Layout>
              <AppointmenstPage />
            </Layout>
          } />
          
           {/* Rota para perfil */}
          <Route path="/profile" element={
            <Layout>
              <ProfilePage />
            </Layout>
          } />

          {/* Rota padrão */}
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;