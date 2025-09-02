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
import AdminAppointmentsPage from './pages/administradores/AdminAppointmentPage';
import TherapistAppointmentPage from './pages/terapeutas/TherapistAppointmentPage';
import AssistantAppointmentsPage from './pages/assistante/AssistantAppointmentPage';
import AllMedicalRecordsPage from './pages/terapeutas/AllMedicalRecordsPage';
import SchedulePage from './pages/terapeutas/SchedulePage';
import RoomsPage from './pages/administradores/RoomPage';

function App() {
  // Simulação do usuário logado
  const user = {
    role: 'admin' // 'admin', 'assistant', 'therapist'
  };

  // Função que retorna a página correta de acordo com o role
  const renderAppointmentsPage = () => {
    switch (user.role) {
      case 'admin':
        return <AdminAppointmentsPage />;
      case 'assistant':
        return <AssistantAppointmentsPage />;
      case 'therapist':
        return <TherapistAppointmentPage />;
      default:
        return <TherapistAppointmentPage />;
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden">
      <BrowserRouter>
        <Routes>
          {/* Rotas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Dashboards */}
          <Route path="/dashboard/therapist" element={<Layout role="therapist"><TherapistDashboard /></Layout>} />
          <Route path="/dashboard/admin" element={<Layout role="admin"><AdminDashboard /></Layout>} />
          <Route path="/dashboard/assistant" element={<Layout role="assistant"><AssistantDashboard /></Layout>} />

          {/* Rotas de pacientes */}
          <Route path="/patients" element={<Layout><PatientPage /></Layout>} />
          <Route path="/patients/:siape" element={<Layout><PatientDetailPage /></Layout>} />
          <Route path="/patients/:siape/records" element={<Layout><PatientRecordsPage /></Layout>} />
          <Route path="/patients/:siape/medical-record" element={<Layout><PatientMedicalRecord /></Layout>} />

          {/* Todas consultas */}
          <Route path="/appointments" element={<Layout>{renderAppointmentsPage()}</Layout>} />

          {/* Outras páginas */}
          <Route path="/schedule" element={<Layout><SchedulePage /></Layout>} />
          <Route path="/prontuarios" element={<Layout><AllMedicalRecordsPage /></Layout>} />
          <Route path="/rooms" element={<Layout><RoomsPage /></Layout>} />
          <Route path="/settings" element={<Layout><SettingsPage /></Layout>} />
          <Route path="/profile" element={<Layout><ProfilePage /></Layout>} />

          {/* Rota padrão */}
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
