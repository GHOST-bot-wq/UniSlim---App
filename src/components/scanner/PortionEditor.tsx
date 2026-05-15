import React, { useState } from 'react';
import Button from '../ui/Button';

interface PortionEditorProps {
  nome: string;
  calsPer100g: number;
  protPer100g: number;
  carbsPer100g: number;
  fatPer100g: number;
  onConfirm: (grams: number) => void;
  onCancel: () => void;
}

const PortionEditor: React.FC<PortionEditorProps> = ({ nome, calsPer100g, protPer100g, carbsPer100g, fatPer100g, onConfirm, onCancel }) => {
  const [grams, setGrams] = useState(100);
  const multiplier = grams / 100;

  return (
    <div className="space-y-4">
      <div className="rounded-xl p-3 text-white text-center" style={{ background: 'linear-gradient(135deg, #FF6B35, #FF3CAC)' }}>
        <p className="font-bold">{nome}</p>
      </div>

      <div className="flex gap-2 justify-center">
        {[50, 100, 150, 200, 300].map((g) => (
          <button key={g} onClick={() => setGrams(g)} className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${grams === g ? 'text-white' : 'bg-gray-100 text-[var(--text-2)]'}`}
            style={grams === g ? { background: 'linear-gradient(135deg, #FF6B35, #FF3CAC)' } : {}}>
            {g}g
          </button>
        ))}
      </div>

      <div className="text-center">
        <input
          type="number"
          value={grams}
          onChange={(e) => setGrams(Number(e.target.value) || 0)}
          className="text-center font-mono text-4xl font-bold w-32 bg-transparent border-b-2 border-gray-200 focus:border-[#FF6B35] outline-none"
        />
        <span className="text-lg text-[var(--text-3)] ml-2">gramas</span>
      </div>

      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="bg-orange-50 rounded-xl p-2"><p className="font-bold text-sm">{Math.round(calsPer100g * multiplier)}</p><p className="text-[10px] text-[var(--text-3)]">kcal</p></div>
        <div className="bg-orange-50 rounded-xl p-2"><p className="font-bold text-sm">{Math.round(protPer100g * multiplier)}g</p><p className="text-[10px] text-[var(--text-3)]">Prot</p></div>
        <div className="bg-green-50 rounded-xl p-2"><p className="font-bold text-sm">{Math.round(carbsPer100g * multiplier)}g</p><p className="text-[10px] text-[var(--text-3)]">Carbs</p></div>
        <div className="bg-blue-50 rounded-xl p-2"><p className="font-bold text-sm">{Math.round(fatPer100g * multiplier)}g</p><p className="text-[10px] text-[var(--text-3)]">Gord</p></div>
      </div>

      <div className="flex gap-2">
        <Button variant="ghost" fullWidth onClick={onCancel}>Cancelar</Button>
        <Button variant="gradient" fullWidth onClick={() => onConfirm(grams)}>Adicionar</Button>
      </div>
    </div>
  );
};

export default PortionEditor;
