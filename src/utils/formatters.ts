import { format, isToday, isYesterday, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, "EEEE, d MMM.", { locale: ptBR });
}

export function formatDateShort(date: string | Date): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, 'dd/MM', { locale: ptBR });
}

export function formatRelativeDate(date: string | Date): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  if (isToday(d)) return 'Hoje';
  if (isYesterday(d)) return 'Ontem';
  return format(d, "d 'de' MMMM", { locale: ptBR });
}

export function getGreeting(): { text: string; emoji: string } {
  const hour = new Date().getHours();
  if (hour < 12) return { text: 'Bom dia', emoji: '☀️' };
  if (hour < 18) return { text: 'Boa tarde', emoji: '👋' };
  return { text: 'Boa noite', emoji: '🌙' };
}

export function formatWeight(kg: number): string {
  return kg.toFixed(1).replace('.', ',');
}

export function formatNumber(n: number): string {
  return n.toLocaleString('pt-BR');
}

export function getDayName(date: Date): string {
  return format(date, 'EEEE', { locale: ptBR });
}

export function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function getMealLabel(tipo: string): string {
  const labels: Record<string, string> = {
    cafe: 'Café da Manhã',
    almoco: 'Almoço',
    jantar: 'Jantar',
    lanche: 'Lanches',
  };
  return labels[tipo] || tipo;
}

export function getDayOfWeekLetter(date: Date): string {
  const letters = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  return letters[date.getDay()];
}
