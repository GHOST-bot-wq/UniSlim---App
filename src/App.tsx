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

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { session, isLoading } = useAuthStore();
  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(160deg, #FF8C42, #FF6B9D, #C77DFF)' }}>
      <div className="text-center text-white">
        <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" />
        <p className="font-bold">Carregando...</p>
      </div>
    </div>
  );
  if (!session) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

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
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/ativar" element={<Activate />} />

        {/* Onboarding */}
        <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />

        {/* Main app */}
        <Route path="/dashboard" element={<ProtectedRoute><AppLayout><Dashboard /></AppLayout></ProtectedRoute>} />
        <Route path="/plano" element={<ProtectedRoute><AppLayout><MealPlan /></AppLayout></ProtectedRoute>} />
        <Route path="/scanner" element={<ProtectedRoute><AppLayout hideNav><Scanner /></AppLayout></ProtectedRoute>} />
        <Route path="/treinos" element={<ProtectedRoute><AppLayout><Workouts /></AppLayout></ProtectedRoute>} />
        <Route path="/treino-ativo" element={<ProtectedRoute><AppLayout hideNav><ActiveWorkout /></AppLayout></ProtectedRoute>} />
        <Route path="/jejum" element={<ProtectedRoute><AppLayout hideNav><Fasting /></AppLayout></ProtectedRoute>} />
        <Route path="/progresso" element={<ProtectedRoute><AppLayout><Progress /></AppLayout></ProtectedRoute>} />
        <Route path="/perfil" element={<ProtectedRoute><AppLayout><Profile /></AppLayout></ProtectedRoute>} />

        {/* Default */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
