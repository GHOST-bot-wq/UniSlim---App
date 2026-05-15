import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import CameraView from '../components/scanner/CameraView';
import ScanResultCard from '../components/scanner/ScanResult';
import GradientText from '../components/brand/GradientText';
import { useScanner } from '../hooks/useScanner';
import { useAudio } from '../hooks/useAudio';
import { useLogStore } from '../stores/logStore';
import { useAuthStore } from '../stores/authStore';
import { usePlanStore } from '../stores/planStore';
import { useUIStore } from '../stores/uiStore';

type Phase = 'camera' | 'analyzing' | 'result';

const Scanner: React.FC = () => {
  const [phase, setPhase] = useState<Phase>('camera');
  const [progress, setProgress] = useState(0);
  const { videoRef, isAnalyzing, result, error, imagePreview, startCamera, stopCamera, capturePhoto, analyzeImage, handleFileUpload, reset } = useScanner();
  const { play } = useAudio();
  const { session } = useAuthStore();
  const { addFoodLog } = useLogStore();
  const { dailyCalories } = usePlanStore();
  const { todayCalories } = useLogStore();
  const { addToast } = useUIStore();

  useEffect(() => { startCamera(); return () => stopCamera(); }, []);

  useEffect(() => {
    if (isAnalyzing) {
      setPhase('analyzing');
      setProgress(0);
      play('scanner');
      const interval = setInterval(() => setProgress(p => Math.min(p + 2, 95)), 60);
      return () => clearInterval(interval);
    }
    if (result) { setProgress(100); setTimeout(() => setPhase('result'), 500); }
  }, [isAnalyzing, result]);

  const doCapture = () => {
    const dataUrl = capturePhoto();
    if (dataUrl) { stopCamera(); analyzeImage(dataUrl, 'moderada', dailyCalories); }
  };

  const doGallery = async (file: File) => {
    const dataUrl = await handleFileUpload(file);
    stopCamera();
    analyzeImage(dataUrl, 'moderada', dailyCalories);
  };

  const handleAdd = async () => {
    if (!result || !session?.user?.id) return;
    try {
      await addFoodLog(session.user.id, {
        tipo: 'almoco', nome: result.prato,
        calorias: result.total_calorias, proteina: result.total_proteina,
        carbs: result.total_carbs, gordura: result.total_gordura, fonte: 'scanner',
      });
      play('goal_achieved');
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.7 } });
      addToast({ type: 'xp', message: 'Refeição registrada! +10 XP 🎉' });
      setTimeout(() => { reset(); setPhase('camera'); startCamera(); }, 2000);
    } catch { addToast({ type: 'error', message: 'Erro ao registrar' }); }
  };

  const handleRescan = () => { reset(); setPhase('camera'); startCamera(); };

  return (
    <div className="min-h-screen" style={{ background: '#0D0D1A' }}>
      {/* Header */}
      <div className="pt-14 px-5 pb-4 text-center">
        <GradientText className="text-xl font-bold">Scanner IA</GradientText>
        <p className="text-white/50 text-sm mt-1">Descubra as calorias de qualquer refeição</p>
      </div>

      {phase === 'camera' && (
        <div className="px-5 flex flex-col items-center">
          <CameraView videoRef={videoRef} onCapture={doCapture} onGallery={doGallery} isActive={phase === 'camera'} />
          {error && <p className="text-red-400 text-sm mt-4 text-center px-4">{error}</p>}
        </div>
      )}

      {phase === 'analyzing' && imagePreview && (
        <div className="px-5">
          <div className="relative w-full rounded-2xl overflow-hidden" style={{ maxHeight: '60vh' }}>
            <img src={imagePreview} className="w-full object-cover" alt="Analyzing" />
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
              {/* Scan line */}
              <div className="absolute left-0 right-0 h-0.5" style={{ background: 'linear-gradient(90deg, transparent, #FF6B35, #FF3CAC, transparent)', top: `${progress}%`, transition: 'top 0.1s linear' }} />
              <p className="text-white font-bold text-lg">🧠 IA identificando alimentos...</p>
              <div className="w-48 h-2 bg-white/20 rounded-full mt-4 overflow-hidden">
                <motion.div className="h-full rounded-full" style={{ background: 'linear-gradient(90deg, #FF6B35, #FF3CAC)', width: `${progress}%` }} />
              </div>
            </div>
          </div>
        </div>
      )}

      {phase === 'result' && result && (
        <div className="mt-4"><ScanResultCard result={result} onAdd={handleAdd} onRescan={handleRescan} dailyConsumed={todayCalories} dailyGoal={dailyCalories} /></div>
      )}

      {phase === 'result' && error && !result && (
        <div className="px-5 text-center text-white mt-10">
          <p className="text-lg">😕 {error}</p>
          <button onClick={handleRescan} className="mt-4 px-6 py-3 rounded-full text-white font-bold" style={{ background: 'linear-gradient(135deg, #FF6B35, #FF3CAC)' }}>Tentar novamente</button>
        </div>
      )}
    </div>
  );
};

export default Scanner;
