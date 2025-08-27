// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './features/login/login';
import Layout from './components/layout/Layout';
import Register from './features/register/Register';
import TherapistDashboard from './components/dashboards/TherapistDashboard';
import AdminDashboard from './components/dashboards/AdminDashboard';
import AssistantDashboard from './components/dashboards/AssistantDashboard';
import PatientPage from './pages/shared/PatientPage';
import SettingsPage from './pages/shared/SettingsPage';
import PatientMedicalRecord from './pages/terapeutas/PatientMedicalRecord';
import PatientDetailPage from './pages/terapeutas/PatientDetailPage';
import PatientRecordsPage from './pages/terapeutas/PatientRecordsPage';
import ProfilePage from './pages/shared/ProfilePage';
import AppointmentsPage from './pages/terapeutas/AppointmentsPage';
import AllMedicalRecordsPage from './pages/terapeutas/AllMedicalRecordsPage';
import SchedulePage from './pages/terapeutas/SchedulePage';
import RoomsPage from './pages/administradores/RoomPage';

function App() {

  const therapistRole = 'therapist';
  const adminRole = 'admin';
  const assistantRole = 'assistant'; 

  return (
    <div className="h-screen w-screen overflow-hidden">
      <BrowserRouter>
        <Routes>
          {/* Rotas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Rotas protegidas */}
          <Route
            path="/dashboard/therapist"
            element={
              <Layout role={therapistRole}>
                <TherapistDashboard />
              </Layout>
            }
          />

          <Route
            path="/dashboard/admin"
            element={
              <Layout role={adminRole}>
                <AdminDashboard />
              </Layout>
            }
          />

          <Route
            path="/dashboard/assistant"
            element={
              <Layout role={assistantRole}>
                <AssistantDashboard />
              </Layout>
            }
          />
           <Route path="/schedule" element={
            <Layout>
              <SchedulePage />
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
            {/* Rota para todos os prontuários */}
          <Route path="/prontuarios" element={
           <Layout>
              <AllMedicalRecordsPage />
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
          <Route path="appointments" element={
            <Layout>
              <AppointmentsPage />
            </Layout>
          } />

          {/* Rota para salas */}
          <Route path="/rooms" element={
            <Layout>
              <RoomsPage />
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