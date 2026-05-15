import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../../services/supabase';
import { useAuthStore } from '../../stores/authStore';
import UniMascot from '../../components/brand/UniMascot';

const Activate: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'checking' | 'creating' | 'success' | 'error'>('checking');
  const [errorMsg, setErrorMsg] = useState('');
  const [email, setEmail] = useState(searchParams.get('email') || '');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState<'input' | 'loading'>('input');
  const navigate = useNavigate();
  const { signUp } = useAuthStore();

  const handleActivate = async () => {
    if (!email) return;
    setStep('loading');
    setStatus('checking');

    try {
      const { data: usuario } = await supabase
        .from('usuarios')
        .select('*')
        .eq('email', email.toLowerCase().trim())
        .eq('ativo', true)
        .single();

      if (!usuario) {
        setStatus('error');
        setErrorMsg('Pagamento não encontrado para este e-mail.');
        return;
      }

      setStatus('creating');
      await signUp(email.toLowerCase().trim(), password || crypto.randomUUID().slice(0, 12));

      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        await supabase.from('gamification').insert({
          user_id: session.user.id, xp: 0, level: 1, streak_atual: 0, maior_streak: 0, badges: [],
        });
      }

      setStatus('success');
      setTimeout(() => navigate('/onboarding'), 1500);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Erro ao ativar conta');
    }
  };

  useEffect(() => {
    if (searchParams.get('email')) {
      setEmail(searchParams.get('email')!);
    }
  }, [searchParams]);

  if (step === 'input') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'linear-gradient(160deg, #FF8C42 0%, #FF6B9D 50%, #C77DFF 100%)' }}>
        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full max-w-sm bg-white rounded-3xl p-8 shadow-2xl space-y-4">
          <div className="text-center">
            <span className="text-4xl">🔓</span>
            <h2 className="text-xl font-bold mt-2">Ativar Conta</h2>
            <p className="text-sm text-[var(--text-3)] mt-1">Insira o e-mail usado na compra</p>
          </div>
          <input type="email" placeholder="Seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full h-[52px] px-4 rounded-2xl bg-[#F2F2F7] outline-none" />
          <input type="password" placeholder="Crie uma senha" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full h-[52px] px-4 rounded-2xl bg-[#F2F2F7] outline-none" />
          <button onClick={handleActivate} disabled={!email || !password} className="w-full h-[52px] rounded-full text-white font-bold disabled:opacity-50" style={{ background: 'linear-gradient(135deg, #FF6B35, #FF3CAC)' }}>
            Verificar e Ativar
          </button>
          <button onClick={() => navigate('/login')} className="w-full text-center text-sm text-[var(--text-3)]">Voltar ao login</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6" style={{ background: 'linear-gradient(160deg, #FF8C42 0%, #FF6B9D 50%, #C77DFF 100%)' }}>
      {status === 'checking' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-white">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xl font-bold">🔓 Verificando seu acesso...</p>
        </motion.div>
      )}
      {status === 'creating' && (
        <div className="text-center text-white">
          <UniMascot expression="excited" size="lg" className="mx-auto mb-4" />
          <p className="text-xl font-bold">Criando sua conta...</p>
        </div>
      )}
      {status === 'success' && (
        <div className="text-center text-white">
          <UniMascot expression="proud" size="lg" className="mx-auto mb-4" />
          <p className="text-xl font-bold">Conta ativada! 🎉</p>
          <p className="text-sm opacity-80 mt-2">Redirecionando...</p>
        </div>
      )}
      {status === 'error' && (
        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white rounded-3xl p-8 max-w-sm text-center shadow-2xl">
          <UniMascot expression="sad" size="md" className="mx-auto mb-3" />
          <p className="font-bold text-lg mb-2">Ops!</p>
          <p className="text-sm text-[var(--text-3)] mb-4">{errorMsg}</p>
          <p className="text-xs text-[var(--text-3)]">Entre em contato: suporte@unislim.com.br</p>
          <button onClick={() => setStep('input')} className="mt-4 text-[#FF6B35] font-semibold text-sm">Tentar novamente</button>
        </motion.div>
      )}
    </div>
  );
};

export default Activate;
