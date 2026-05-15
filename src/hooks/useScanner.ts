import { useState, useCallback, useRef } from 'react';
import { analyzeFood } from '../services/claudeAI';
import type { ScanResult } from '../types';

export function useScanner() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch {
      setError('Câmera não disponível. Use a galeria para enviar uma foto.');
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  }, []);

  const capturePhoto = useCallback((): string | null => {
    if (!videoRef.current) return null;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    ctx.drawImage(videoRef.current, 0, 0);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
    setImagePreview(dataUrl);
    return dataUrl;
  }, []);

  const analyzeImage = useCallback(async (imageDataUrl: string, strategy: string, goal: number) => {
    setIsAnalyzing(true);
    setError(null);
    setResult(null);
    try {
      const base64 = imageDataUrl.split(',')[1];
      const scanResult = await analyzeFood(base64, strategy, goal);
      setResult(scanResult);
      return scanResult;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erro ao analisar imagem';
      setError(msg);
      return null;
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const handleFileUpload = useCallback((file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        setImagePreview(dataUrl);
        resolve(dataUrl);
      };
      reader.onerror = () => reject(new Error('Erro ao ler arquivo'));
      reader.readAsDataURL(file);
    });
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
    setImagePreview(null);
  }, []);

  return {
    videoRef, isAnalyzing, result, error, imagePreview,
    startCamera, stopCamera, capturePhoto, analyzeImage, handleFileUpload, reset,
  };
}
