import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUIStore } from '../../stores/uiStore';
import type { TabId } from '../../types';

const tabs: { id: TabId; label: string; path: string; icon: (active: boolean) => React.ReactNode }[] = [
  {
    id: 'inicio', label: 'Início', path: '/dashboard',
    icon: (a) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={a ? 'url(#g)' : '#8E8E93'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#FF6B35"/><stop offset="100%" stopColor="#FF3CAC"/></linearGradient></defs><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  },
  {
    id: 'plano', label: 'Plano', path: '/plano',
    icon: (a) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={a ? 'url(#g)' : '#8E8E93'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  },
  {
    id: 'treino', label: 'Treino', path: '/treinos',
    icon: (a) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={a ? 'url(#g)' : '#8E8E93'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6.5 6.5h11M4 10h2.5m11 0H20M4 14h2.5m11 0H20M6.5 17.5h11"/><rect x="8.5" y="4" width="7" height="16" rx="1"/></svg>,
  },
  {
    id: 'registro', label: 'Registro', path: '/progresso',
    icon: (a) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={a ? 'url(#g)' : '#8E8E93'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  },
  {
    id: 'perfil', label: 'Perfil', path: '/perfil',
    icon: (a) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={a ? 'url(#g)' : '#8E8E93'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  },
];

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setActiveTab } = useUIStore();

  const handleTab = (tab: typeof tabs[0]) => {
    setActiveTab(tab.id);
    navigate(tab.path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-[var(--surface)]" style={{ maxWidth: 430, margin: '0 auto', borderTop: '1px solid var(--border)', paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
      <div className="flex items-center justify-around h-[60px]">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path || (tab.id === 'inicio' && location.pathname === '/');
          return (
            <button
              key={tab.id}
              onClick={() => handleTab(tab)}
              className="flex flex-col items-center gap-0.5 px-3 py-1 transition-all duration-200"
            >
              {tab.icon(isActive)}
              <span
                className="text-[10px] font-semibold"
                style={isActive ? { background: 'linear-gradient(135deg, #FF6B35, #FF3CAC)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' } : { color: '#8E8E93' }}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
