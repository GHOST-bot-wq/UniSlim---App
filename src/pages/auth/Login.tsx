import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../stores/authStore';
import GradientText from '../../components/brand/GradientText';
import UniMascot from '../../components/brand/UniMascot';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signIn(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao entrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'linear-gradient(160deg, #FF8C42 0%, #FF6B9D 50%, #C77DFF 100%)' }}>
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-full max-w-sm bg-white rounded-3xl p-8 shadow-2xl"
      >
        <div className="text-center mb-6">
          <UniMascot expression="happy" size="md" className="mx-auto mb-3" />
          <GradientText className="text-3xl font-extrabold">UniSlim</GradientText>
          <p className="text-[var(--text-3)] text-sm mt-2">A versão mais forte de você começa aqui.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-3">
          <input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full h-[52px] px-4 rounded-2xl bg-[#F2F2F7] text-[var(--text-1)] placeholder-[var(--text-3)] outline-none focus:ring-2 focus:ring-[#FF6B35]/30 transition"
          />
          <div className="relative">
            <input
              type={showPw ? 'text' : 'password'}
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full h-[52px] px-4 pr-12 rounded-2xl bg-[#F2F2F7] text-[var(--text-1)] placeholder-[var(--text-3)] outline-none focus:ring-2 focus:ring-[#FF6B35]/30 transition"
            />
            <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-3)]">
              {showPw ? '🙈' : '👁️'}
            </button>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-[52px] rounded-full text-white font-bold text-base transition-all active:scale-[0.97] disabled:opacity-50"
            style={{ background: 'linear-gradient(135deg, #FF6B35, #FF3CAC)' }}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-[var(--text-3)]">ou</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <button
          onClick={() => navigate('/ativar')}
          className="w-full text-center text-sm font-semibold"
          style={{ color: '#FF6B35' }}
        >
          Ativar com código de pagamento
        </button>
      </motion.div>
    </div>
  );
};

export default Login;
