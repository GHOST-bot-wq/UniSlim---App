export function calculateBMI(peso: number, alturaCm: number): number {
  const alturaM = alturaCm / 100;
  return Number((peso / (alturaM * alturaM)).toFixed(1));
}

export function getBMICategory(bmi: number): { label: string; color: string } {
  if (bmi < 18.5) return { label: 'Abaixo do peso', color: '#007AFF' };
  if (bmi < 25) return { label: 'Normal', color: '#34C759' };
  if (bmi < 30) return { label: 'Sobrepeso', color: '#FF9500' };
  return { label: 'Obesidade', color: '#FF3B30' };
}

export function calculateDailyCalories(
  peso: number,
  altura: number,
  idade: number,
  genero: string,
  nivelAtividade: string,
  estrategia: string
): number {
  // Harris-Benedict
  let bmr: number;
  if (genero === 'masculino') {
    bmr = 88.362 + 13.397 * peso + 4.799 * altura - 5.677 * idade;
  } else {
    bmr = 447.593 + 9.247 * peso + 3.098 * altura - 4.33 * idade;
  }

  const activityMultiplier: Record<string, number> = {
    sedentario: 1.2,
    leve: 1.375,
    moderado: 1.55,
    ativo: 1.725,
    muito_ativo: 1.9,
  };

  const tdee = bmr * (activityMultiplier[nivelAtividade] || 1.55);

  const deficits: Record<string, number> = {
    moderada: -400,
    agressiva: -600,
    equilibrada: -300,
    manutenção: 0,
  };

  return Math.round(tdee + (deficits[estrategia] || -400));
}

export function calculateMacros(calorias: number): {
  proteina: number;
  carbs: number;
  gordura: number;
} {
  return {
    proteina: Math.round((calorias * 0.3) / 4),
    carbs: Math.round((calorias * 0.45) / 4),
    gordura: Math.round((calorias * 0.25) / 9),
  };
}

export function calculateWeightLoss(pesoAtual: number, pesoInicial: number): number {
  return Number((pesoInicial - pesoAtual).toFixed(1));
}

export function estimateGoalDate(pesoAtual: number, pesoMeta: number, kgPerWeek = 0.5): Date {
  const diff = pesoAtual - pesoMeta;
  const weeks = Math.ceil(diff / kgPerWeek);
  const d = new Date();
  d.setDate(d.getDate() + weeks * 7);
  return d;
}

export function caloriesFromMacros(proteina: number, carbs: number, gordura: number): number {
  return Math.round(proteina * 4 + carbs * 4 + gordura * 9);
}
