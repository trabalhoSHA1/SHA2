// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './features/login/Login';
import Layout from './components/layout/Layout';
import TherapistDashboard from './components/dashboards/TherapistDashboard';
import PatientPage from './pages/PatientPage';
import SettingsPage from './pages/SettingsPage';
import PatientRecordsPage from './pages/PatientRecordsPage'; // ✅ Importe a página de prontuários
import RecordDetail from './features/patients/RecordDetail';

function App() {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
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
          {/* Rota para prontuários */}
          <Route path="/patients/:siape/records" element={
            <Layout>
              <PatientRecordsPage />
            </Layout>
          } />
          {/* Rota para detalhes do prontuário */}
          <Route path="/patients/:siape/records/:recordId" element={
            <Layout>
              <RecordDetail />
            </Layout>
          } />
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;