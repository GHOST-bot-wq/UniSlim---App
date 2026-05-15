import React, { useEffect, useRef } from 'react';

interface CameraViewProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  onCapture: () => void;
  onGallery: (file: File) => void;
  isActive: boolean;
}

const CameraView: React.FC<CameraViewProps> = ({ videoRef, onCapture, onGallery, isActive }) => {
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isActive && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [isActive]);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Viewfinder */}
      <div className="relative w-[280px] h-[280px] rounded-2xl overflow-hidden bg-black">
        <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
        {/* Corner brackets */}
        <div className="absolute top-3 left-3 w-8 h-8 border-t-3 border-l-3 rounded-tl-lg" style={{ borderColor: '#FF6B35' }} />
        <div className="absolute top-3 right-3 w-8 h-8 border-t-3 border-r-3 rounded-tr-lg" style={{ borderColor: '#FF3CAC' }} />
        <div className="absolute bottom-3 left-3 w-8 h-8 border-b-3 border-l-3 rounded-bl-lg" style={{ borderColor: '#2EC4B6' }} />
        <div className="absolute bottom-3 right-3 w-8 h-8 border-b-3 border-r-3 rounded-br-lg" style={{ borderColor: '#FFE66D' }} />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-white/60 text-sm font-medium">Posicione o prato aqui</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6">
        <button onClick={() => fileRef.current?.click()} className="flex flex-col items-center gap-1 text-white/70">
          <span className="text-2xl">🖼️</span>
          <span className="text-xs">Galeria</span>
        </button>
        <button onClick={onCapture} className="w-[72px] h-[72px] rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FF6B35, #FF3CAC)', boxShadow: '0 0 0 4px rgba(255,255,255,0.3)' }}>
          <div className="w-14 h-14 rounded-full border-4 border-white" />
        </button>
        <button className="flex flex-col items-center gap-1 text-white/70">
          <span className="text-2xl">💡</span>
          <span className="text-xs">Dicas</span>
        </button>
      </div>

      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => {
        const f = e.target.files?.[0];
        if (f) onGallery(f);
      }} />
    </div>
  );
};

export default CameraView;
