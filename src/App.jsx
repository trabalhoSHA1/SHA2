// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

import Login from "./features/login/Login";
import Register from "./features/register/Register";

// Layout e dashboards
import Layout from "./components/layout/Layout";
import TherapistDashboard from "./components/dashboards/TherapistDashboard";
import AdminDashboard from "./components/dashboards/AdminDashboard";
import AssistantDashboard from "./components/dashboards/AssistantDashboard";

// Pacientes
import AdminPatientPage from "./pages/administradores/AdminPatientPage";
import AssistantPatientPage from "./pages/assistentes/AssistantTherapistPage";
import TherapistPatientPage from "./pages/terapeutas/TherapistPatientPage";
import PatientDetailPage from "./pages/terapeutas/PatientDetailPage";
import PatientRecordsPage from "./pages/terapeutas/PatientRecordsPage";
import PatientMedicalRecord from "./pages/terapeutas/PatientMedicalRecord";
import AllMedicalRecordsPage from "./pages/terapeutas/AllMedicalRecordsPage";

// Consultas
import AdminAppointmentPage from "./pages/administradores/AdminAppointmentPage";
import TherapistAppointmentPage from "./pages/terapeutas/TherapistAppointmentPage";
import AssistantAppointmentPage from "./pages/assistentes/AssistantAppointmentPage";

// Terapeutas
import AdminTherapistPage from "./pages/administradores/AdminTherapistPage";

// Outras páginas
import SchedulePage from "./pages/terapeutas/SchedulePage";
import RoomsPage from "./pages/administradores/RoomPage";
import SettingsPage from "./pages/shared/SettingsPage";
import ProfilePage from "./pages/shared/ProfilePage";

export default function App() {
  const { user } = useAuth();

  // Render dinâmico de página de pacientes
  const renderPatientsPage = () => {
    switch (user?.role) {
      case "admin":
        return <AdminPatientPage />;
      case "assistant":
        return <AssistantPatientPage />;
      case "terapeuta":
        return <TherapistPatientPage />;
      default:
        return <TherapistPatientPage />;
    }
  };

  // Render dinâmico de página de consultas
  const renderAppointmentPage = () => {
    switch (user?.role) {
      case "admin":
        return <AdminAppointmentPage />;
      case "assistant":
        return <AssistantAppointmentPage />;
      case "terapeuta":
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
          <Route
            path="/dashboard/therapist"
            element={
              <Layout role="terapeuta">
                <TherapistDashboard />
              </Layout>
            }
          />
          <Route
            path="/dashboard/admin"
            element={
              <Layout role="admin">
                <AdminDashboard />
              </Layout>
            }
          />
          <Route
            path="/dashboard/assistant"
            element={
              <Layout role="assistente">
                <AssistantDashboard />
              </Layout>
            }
          />

          {/* Rotas de pacientes */}
          <Route path="/patients" element={<Layout>{renderPatientsPage()}</Layout>} />
          <Route
            path="/patients/:siape"
            element={
              <Layout>
                <PatientDetailPage />
              </Layout>
            }
          />
          <Route
            path="/patients/:siape/records"
            element={
              <Layout>
                <PatientRecordsPage />
              </Layout>
            }
          />
          <Route
            path="/patients/:siape/medical-record"
            element={
              <Layout>
                <PatientMedicalRecord />
              </Layout>
            }
          />

          {/* Rotas de consultas */}
          <Route
            path="/appointments"
            element={<Layout>{renderAppointmentPage()}</Layout>}
          />

          {/* Terapeutas */}
          <Route
            path="/therapists"
            element={
              <Layout>
                <AdminTherapistPage />
              </Layout>
            }
          />

          {/* Outras páginas */}
          <Route path="/schedule" element={<Layout><SchedulePage /></Layout>} />
          <Route path="/prontuarios" element={<Layout><AllMedicalRecordsPage /></Layout>} />
          <Route path="/rooms" element={<Layout><RoomsPage /></Layout>} />
          <Route path="/settings" element={<Layout><SettingsPage /></Layout>} />
          <Route path="/perfil" element={<Layout><ProfilePage /></Layout>} />

          {/* Rota padrão */}
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
