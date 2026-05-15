import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import BottomNav from './components/layout/BottomNav';
import Toast from './components/ui/Toast';
import PageTransition from './components/layout/PageTransition';

// Pages
import Login from './pages/auth/Login';
import Activate from './pages/auth/Activate';
import Onboarding from './pages/onboarding/Onboarding';
import Dashboard from './pages/Dashboard';
import MealPlan from './pages/MealPlan';
import Scanner from './pages/Scanner';
import Workouts from './pages/Workouts';
import ActiveWorkout from './pages/ActiveWorkout';
import Fasting from './pages/Fasting';
import Progress from './pages/Progress';
import Profile from './pages/Profile';

const AppLayout: React.FC<{ children: React.ReactNode; hideNav?: boolean }> = ({ children, hideNav }) => (
  <div className="app-container">
    <PageTransition>{children}</PageTransition>
    {!hideNav && <BottomNav />}
  </div>
);

const App: React.FC = () => {
  const { initialize } = useAuthStore();

  useEffect(() => { initialize(); }, []);

  return (
    <BrowserRouter>
      <Toast />
      <Routes>
        {/* Onboarding */}
        <Route path="/onboarding" element={<Onboarding />} />

        {/* Main app */}
        <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
        <Route path="/plano" element={<AppLayout><MealPlan /></AppLayout>} />
        <Route path="/scanner" element={<AppLayout hideNav><Scanner /></AppLayout>} />
        <Route path="/treinos" element={<AppLayout><Workouts /></AppLayout>} />
        <Route path="/treino-ativo" element={<AppLayout hideNav><ActiveWorkout /></AppLayout>} />
        <Route path="/jejum" element={<AppLayout hideNav><Fasting /></AppLayout>} />
        <Route path="/progresso" element={<AppLayout><Progress /></AppLayout>} />
        <Route path="/perfil" element={<AppLayout><Profile /></AppLayout>} />

        {/* Default */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<Navigate to="/dashboard" replace />} />
        <Route path="/ativar" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
