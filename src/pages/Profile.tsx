import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import GradientText from '../components/brand/GradientText';
import { useAuthStore } from '../stores/authStore';
import { useGamificationStore, LEVELS } from '../stores/gamificationStore';
import { useUIStore } from '../stores/uiStore';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuthStore();
  const { level, levelTitle, xp, streak, xpProgress, badges } = useGamificationStore();
  const { theme, setTheme, soundEnabled, toggleSound } = useUIStore();
  const nome = user?.nome || 'Usuário';
  const earnedBadges = badges.filter(b => b.unlocked).length;
  const lost = profile?.peso_atual && profile?.peso_meta ? Math.max(0, Number((profile.peso_atual - (profile.peso_meta || profile.peso_atual)).toFixed(1))) : 0;

  const handleLogout = async () => { await signOut(); navigate('/login'); };

  const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mt-4">
      <h3 className="text-xs font-bold text-[var(--text-3)] uppercase px-1 mb-2">{title}</h3>
      <Card className="!p-0 divide-y divide-gray-100">{children}</Card>
    </div>
  );

  const Row: React.FC<{ label: string; value?: string; onClick?: () => void; danger?: boolean; toggle?: boolean; checked?: boolean; onToggle?: () => void }> = ({ label, value, onClick, danger, toggle, checked, onToggle }) => (
    <div className={`flex items-center justify-between px-4 py-3.5 ${onClick ? 'cursor-pointer active:bg-gray-50' : ''}`} onClick={onClick}>
      <span className={`text-sm ${danger ? 'text-red-500' : ''}`}>{label}</span>
      {value && <span className="text-sm text-[var(--text-3)]">{value}</span>}
      {toggle && (
        <button onClick={(e) => { e.stopPropagation(); onToggle?.(); }}
          className={`w-12 h-7 rounded-full transition-all ${checked ? 'bg-[#34C759]' : 'bg-gray-200'}`}>
          <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
      )}
      {onClick && !toggle && <span className="text-[var(--text-3)]">›</span>}
    </div>
  );

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="relative px-5 pt-14 pb-12 text-center" style={{ background: 'linear-gradient(160deg, #FF8C42 0%, #FF6B9D 50%, #C77DFF 100%)' }}>
        <div className="w-20 h-20 rounded-full bg-white/20 border-3 border-white mx-auto flex items-center justify-center text-3xl shadow-lg">
          {user?.avatar_url ? <img src={user.avatar_url} className="w-full h-full rounded-full object-cover" /> : '👤'}
        </div>
        <h2 className="text-xl font-bold text-white mt-3">{nome}</h2>
        <div className="inline-flex items-center gap-1 mt-1 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm">
          <span className="text-xs text-white font-semibold">Nível {level} — {levelTitle}</span>
        </div>
        <div className="w-32 h-1.5 rounded-full bg-white/20 mx-auto mt-2 overflow-hidden">
          <div className="h-full rounded-full bg-white" style={{ width: `${xpProgress()}%` }} />
        </div>
        <div className="flex justify-center gap-6 mt-4 text-white text-sm">
          <div><span className="font-bold">🔥 {streak}</span><p className="text-xs text-white/70">dias</p></div>
          <div><span className="font-bold">⚖️ −{lost}kg</span><p className="text-xs text-white/70">perdidos</p></div>
          <div><span className="font-bold">🏅 {earnedBadges}</span><p className="text-xs text-white/70">badges</p></div>
        </div>
      </div>

      <div className="px-4 -mt-4">
        <Card>
          <p className="text-sm font-bold">Plano ativo</p>
          <p className="text-xs text-[var(--text-3)] mt-1">
            {profile?.estrategia || 'Moderada'} • {profile?.refeicoes_dia || 4} refeições/dia
          </p>
        </Card>

        <Section title="Experiência">
          <Row label="Sons do app" toggle checked={soundEnabled} onToggle={toggleSound} />
          <div className="flex items-center justify-between px-4 py-3.5">
            <span className="text-sm">Tema</span>
            <div className="flex bg-[#F2F2F7] rounded-lg p-0.5">
              <button onClick={() => setTheme('light')} className={`px-3 py-1 rounded-md text-xs font-semibold transition ${theme === 'light' ? 'bg-white shadow-sm' : ''}`}>Claro</button>
              <button onClick={() => setTheme('dark')} className={`px-3 py-1 rounded-md text-xs font-semibold transition ${theme === 'dark' ? 'bg-white shadow-sm' : ''}`}>Escuro</button>
            </div>
          </div>
        </Section>

        <Section title="Conta">
          <Row label="Editar perfil" onClick={() => {}} />
          <Row label="Alterar senha" onClick={() => {}} />
        </Section>

        <Section title="Sobre">
          <Row label="Versão" value="1.0.0" />
          <Row label="Política de privacidade" onClick={() => {}} />
          <Row label="Termos de uso" onClick={() => {}} />
        </Section>

        {/* Referral */}
        <Card gradient className="mt-4">
          <p className="font-bold text-white">🎁 Ganhe 1 mês grátis!</p>
          <p className="text-sm text-white/80 mt-1">Indique um amigo e ganhem 30 dias.</p>
          <div className="flex items-center gap-2 mt-3 bg-white/20 rounded-lg px-3 py-2">
            <span className="font-mono text-sm text-white flex-1">UNISLIM-{(user?.id || 'XPTO').slice(0, 4).toUpperCase()}</span>
            <button className="text-xs font-bold text-white bg-white/20 px-2 py-1 rounded">Copiar</button>
          </div>
        </Card>

        <button onClick={handleLogout} className="w-full mt-6 mb-4 py-3 text-red-500 font-semibold text-sm">
          Sair da conta
        </button>
      </div>
    </div>
  );
};

export default Profile;
