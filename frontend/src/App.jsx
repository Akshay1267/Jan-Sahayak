import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import HomePage from './components/HomePage';
import MedReportPage from './components/MedReportPage';
import SchemesPage from './components/SchemesPage';
import DiagnosisPage from './components/DiagnosisPage';
import HospitalsPage from './components/HospitalsPage';
import DoctorsPage from './components/DoctorsPage';
import CameraPage from './components/CameraPage';
import VoicePage from './components/VoicePage';
import RemediesPage from './components/RemediesPage';
import VaultPage from './components/VaultPage';

function AppContent() {
  const { currentPage, toasts } = useApp();

  const pages = {
    home: <HomePage />,
    report: <MedReportPage />,
    schemes: <SchemesPage />,
    diagnosis: <DiagnosisPage />,
    hospitals: <HospitalsPage />,
    doctors: <DoctorsPage />,
    camera: <CameraPage />,
    voice: <VoicePage />,
    remedies: <RemediesPage />,
    vault: <VaultPage />,
  };

  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        {pages[currentPage] || <HomePage />}
      </main>
      <BottomNav />

      {/* Toast Notifications */}
      {toasts.map((toast, i) => (
        <div key={toast.id} className={`toast ${toast.type}`} style={{ top: `${80 + i * 60}px` }}>
          <span>{toast.type === 'success' ? '✅' : toast.type === 'error' ? '❌' : toast.type === 'warning' ? '⚠️' : 'ℹ️'}</span>
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
