import type { ScanResult } from '../types';

const ANTHROPIC_KEY = import.meta.env.VITE_ANTHROPIC_KEY || '';

export async function analyzeFood(
  base64Image: string,
  userStrategy: string,
  userGoal: number
): Promise<ScanResult> {
  if (!ANTHROPIC_KEY) {
    throw new Error('Chave API Anthropic não configurada. Adicione VITE_ANTHROPIC_KEY no .env');
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': ANTHROPIC_KEY,
      'Content-Type': 'application/json',
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: 'image/jpeg',
                data: base64Image,
              },
            },
            {
              type: 'text',
              text: `Você é um nutricionista especializado em culinária brasileira.
Analise esta foto e retorne APENAS um JSON válido (sem markdown, sem texto extra):
{
  "prato": "nome do prato identificado",
  "itens": [
    { "nome": "", "peso_g": 0, "calorias": 0, "proteina": 0, "carbs": 0, "gordura": 0 }
  ],
  "total_calorias": 0,
  "total_proteina": 0,
  "total_carbs": 0,
  "total_gordura": 0,
  "qualidade": "excelente|boa|moderada|ruim",
  "mensagem": "avaliação em português",
  "sugestao": "dica personalizada em português (opcional)"
}
Priorize alimentos brasileiros. Use porções típicas brasileiras.
Perfil do usuário: estratégia ${userStrategy}, meta ${userGoal}kcal/dia.`,
            },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      errorData?.error?.message ||
        'Serviço temporariamente indisponível. Tente em instantes.'
    );
  }

  const data = await response.json();
  const text = data.content?.[0]?.text || '';

  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('JSON não encontrado na resposta');
    const parsed: ScanResult = JSON.parse(jsonMatch[0]);
    return parsed;
  } catch {
    throw new Error(
      'Não consegui identificar bem. Tente outra foto com melhor iluminação.'
    );
  }
}
