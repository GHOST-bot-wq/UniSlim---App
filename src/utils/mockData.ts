import type { FoodItem, DayPlan, Workout, Exercise } from '../types';

export const FOOD_DATABASE: FoodItem[] = [
  // Cereais e Grãos
  { nome: 'Arroz branco cozido', calorias_100g: 130, proteina: 2.5, carbs: 28, gordura: 0.3, categoria: 'cereais' },
  { nome: 'Arroz integral cozido', calorias_100g: 124, proteina: 2.6, carbs: 25.8, gordura: 1.0, categoria: 'cereais' },
  { nome: 'Feijão carioca cozido', calorias_100g: 76, proteina: 4.8, carbs: 13.6, gordura: 0.5, categoria: 'leguminosas' },
  { nome: 'Feijão preto cozido', calorias_100g: 77, proteina: 4.5, carbs: 14, gordura: 0.5, categoria: 'leguminosas' },
  { nome: 'Macarrão cozido', calorias_100g: 102, proteina: 3.4, carbs: 19.9, gordura: 0.6, categoria: 'cereais' },
  { nome: 'Aveia em flocos', calorias_100g: 394, proteina: 13.9, carbs: 66.6, gordura: 8.5, categoria: 'cereais' },
  { nome: 'Granola', calorias_100g: 421, proteina: 10, carbs: 64, gordura: 15, categoria: 'cereais' },
  { nome: 'Tapioca (goma)', calorias_100g: 343, proteina: 0.1, carbs: 87.8, gordura: 0.1, categoria: 'cereais' },
  { nome: 'Quinoa cozida', calorias_100g: 120, proteina: 4.4, carbs: 21.3, gordura: 1.9, categoria: 'cereais' },
  { nome: 'Milho cozido', calorias_100g: 96, proteina: 3.4, carbs: 19, gordura: 1.4, categoria: 'cereais' },
  // Pães
  { nome: 'Pão francês', calorias_100g: 300, proteina: 8, carbs: 58.6, gordura: 3.1, categoria: 'paes' },
  { nome: 'Pão integral', calorias_100g: 253, proteina: 9.4, carbs: 49, gordura: 2.9, categoria: 'paes' },
  { nome: 'Pão de queijo', calorias_100g: 363, proteina: 5, carbs: 34, gordura: 24, categoria: 'paes' },
  { nome: 'Torrada integral', calorias_100g: 395, proteina: 11, carbs: 72, gordura: 6, categoria: 'paes' },
  // Carnes
  { nome: 'Frango grelhado (peito)', calorias_100g: 159, proteina: 32, carbs: 0, gordura: 3.2, categoria: 'carnes' },
  { nome: 'Frango assado (coxa)', calorias_100g: 215, proteina: 27, carbs: 0, gordura: 11, categoria: 'carnes' },
  { nome: 'Carne bovina (patinho)', calorias_100g: 219, proteina: 35.9, carbs: 0, gordura: 7.3, categoria: 'carnes' },
  { nome: 'Carne bovina (alcatra)', calorias_100g: 235, proteina: 32, carbs: 0, gordura: 11, categoria: 'carnes' },
  { nome: 'Carne moída refogada', calorias_100g: 212, proteina: 26.7, carbs: 0, gordura: 11.2, categoria: 'carnes' },
  { nome: 'Costela bovina', calorias_100g: 292, proteina: 24, carbs: 0, gordura: 21, categoria: 'carnes' },
  { nome: 'Carne de porco (lombo)', calorias_100g: 211, proteina: 29, carbs: 0, gordura: 10, categoria: 'carnes' },
  // Peixes
  { nome: 'Salmão grelhado', calorias_100g: 208, proteina: 20, carbs: 0, gordura: 13, categoria: 'peixes' },
  { nome: 'Tilápia grelhada', calorias_100g: 128, proteina: 26, carbs: 0, gordura: 2.7, categoria: 'peixes' },
  { nome: 'Atum em lata', calorias_100g: 116, proteina: 25.5, carbs: 0, gordura: 0.8, categoria: 'peixes' },
  { nome: 'Sardinha em lata', calorias_100g: 208, proteina: 24.6, carbs: 0, gordura: 11.5, categoria: 'peixes' },
  { nome: 'Camarão cozido', calorias_100g: 99, proteina: 24, carbs: 0.2, gordura: 0.3, categoria: 'peixes' },
  // Ovos e Laticínios
  { nome: 'Ovo cozido', calorias_100g: 155, proteina: 13, carbs: 1.1, gordura: 11, categoria: 'ovos' },
  { nome: 'Ovo mexido', calorias_100g: 166, proteina: 11, carbs: 1.6, gordura: 12, categoria: 'ovos' },
  { nome: 'Ovo frito', calorias_100g: 196, proteina: 13.6, carbs: 0.8, gordura: 15, categoria: 'ovos' },
  { nome: 'Queijo minas frescal', calorias_100g: 264, proteina: 17.4, carbs: 3.2, gordura: 20.2, categoria: 'laticinios' },
  { nome: 'Queijo muçarela', calorias_100g: 330, proteina: 25, carbs: 3, gordura: 25, categoria: 'laticinios' },
  { nome: 'Queijo cottage', calorias_100g: 98, proteina: 11.1, carbs: 3.4, gordura: 4.3, categoria: 'laticinios' },
  { nome: 'Iogurte natural', calorias_100g: 51, proteina: 4.1, carbs: 6.1, gordura: 0.9, categoria: 'laticinios' },
  { nome: 'Iogurte grego', calorias_100g: 97, proteina: 9, carbs: 3.6, gordura: 5, categoria: 'laticinios' },
  { nome: 'Leite integral', calorias_100g: 61, proteina: 3.2, carbs: 4.7, gordura: 3.3, categoria: 'laticinios' },
  { nome: 'Leite desnatado', calorias_100g: 35, proteina: 3.4, carbs: 5, gordura: 0.1, categoria: 'laticinios' },
  { nome: 'Cream cheese', calorias_100g: 342, proteina: 6, carbs: 4, gordura: 34, categoria: 'laticinios' },
  { nome: 'Requeijão', calorias_100g: 257, proteina: 10, carbs: 2.5, gordura: 23, categoria: 'laticinios' },
  // Frutas
  { nome: 'Banana', calorias_100g: 89, proteina: 1.1, carbs: 22.8, gordura: 0.3, categoria: 'frutas' },
  { nome: 'Maçã', calorias_100g: 52, proteina: 0.3, carbs: 14, gordura: 0.2, categoria: 'frutas' },
  { nome: 'Laranja', calorias_100g: 47, proteina: 0.9, carbs: 11.8, gordura: 0.1, categoria: 'frutas' },
  { nome: 'Mamão', calorias_100g: 40, proteina: 0.5, carbs: 10.4, gordura: 0.1, categoria: 'frutas' },
  { nome: 'Manga', calorias_100g: 60, proteina: 0.8, carbs: 15, gordura: 0.4, categoria: 'frutas' },
  { nome: 'Abacate', calorias_100g: 160, proteina: 2, carbs: 8.5, gordura: 14.7, categoria: 'frutas' },
  { nome: 'Melancia', calorias_100g: 30, proteina: 0.6, carbs: 7.6, gordura: 0.2, categoria: 'frutas' },
  { nome: 'Morango', calorias_100g: 32, proteina: 0.7, carbs: 7.7, gordura: 0.3, categoria: 'frutas' },
  { nome: 'Uva', calorias_100g: 69, proteina: 0.7, carbs: 18.1, gordura: 0.2, categoria: 'frutas' },
  { nome: 'Abacaxi', calorias_100g: 50, proteina: 0.5, carbs: 13.1, gordura: 0.1, categoria: 'frutas' },
  { nome: 'Açaí (polpa)', calorias_100g: 58, proteina: 0.8, carbs: 6.2, gordura: 3.9, categoria: 'frutas' },
  { nome: 'Açaí com granola', calorias_100g: 250, proteina: 3, carbs: 35, gordura: 12, categoria: 'frutas' },
  // Verduras e Legumes
  { nome: 'Alface', calorias_100g: 15, proteina: 1.4, carbs: 2.9, gordura: 0.2, categoria: 'verduras' },
  { nome: 'Tomate', calorias_100g: 18, proteina: 0.9, carbs: 3.9, gordura: 0.2, categoria: 'verduras' },
  { nome: 'Cenoura cozida', calorias_100g: 35, proteina: 0.8, carbs: 8.2, gordura: 0.2, categoria: 'verduras' },
  { nome: 'Brócolis cozido', calorias_100g: 35, proteina: 2.4, carbs: 7.2, gordura: 0.4, categoria: 'verduras' },
  { nome: 'Abobrinha refogada', calorias_100g: 20, proteina: 1.1, carbs: 4.2, gordura: 0.1, categoria: 'verduras' },
  { nome: 'Espinafre cozido', calorias_100g: 23, proteina: 2.9, carbs: 3.6, gordura: 0.3, categoria: 'verduras' },
  { nome: 'Couve refogada', calorias_100g: 90, proteina: 2.9, carbs: 6, gordura: 6.4, categoria: 'verduras' },
  { nome: 'Chuchu cozido', calorias_100g: 17, proteina: 0.4, carbs: 3.9, gordura: 0.1, categoria: 'verduras' },
  { nome: 'Beterraba cozida', calorias_100g: 49, proteina: 1.9, carbs: 11, gordura: 0.1, categoria: 'verduras' },
  // Tubérculos
  { nome: 'Batata doce cozida', calorias_100g: 77, proteina: 0.6, carbs: 18.4, gordura: 0.1, categoria: 'tuberculos' },
  { nome: 'Batata inglesa cozida', calorias_100g: 52, proteina: 1.2, carbs: 11.9, gordura: 0.1, categoria: 'tuberculos' },
  { nome: 'Mandioca cozida', calorias_100g: 125, proteina: 0.6, carbs: 30.1, gordura: 0.3, categoria: 'tuberculos' },
  { nome: 'Inhame cozido', calorias_100g: 97, proteina: 2, carbs: 23.2, gordura: 0.1, categoria: 'tuberculos' },
  // Gorduras e Óleos
  { nome: 'Azeite de oliva', calorias_100g: 884, proteina: 0, carbs: 0, gordura: 100, categoria: 'gorduras' },
  { nome: 'Manteiga', calorias_100g: 717, proteina: 0.9, carbs: 0.1, gordura: 81, categoria: 'gorduras' },
  { nome: 'Castanha do Pará', calorias_100g: 656, proteina: 14, carbs: 12, gordura: 66, categoria: 'gorduras' },
  { nome: 'Amendoim torrado', calorias_100g: 544, proteina: 27, carbs: 20, gordura: 44, categoria: 'gorduras' },
  { nome: 'Pasta de amendoim', calorias_100g: 593, proteina: 22, carbs: 22, gordura: 51, categoria: 'gorduras' },
  // Suplementos
  { nome: 'Whey protein (dose)', calorias_100g: 120, proteina: 24, carbs: 3, gordura: 1.5, categoria: 'suplementos' },
  { nome: 'Barra de proteína', calorias_100g: 350, proteina: 20, carbs: 35, gordura: 12, categoria: 'suplementos' },
  // Pratos típicos
  { nome: 'Feijoada', calorias_100g: 137, proteina: 9, carbs: 8.5, gordura: 7.8, categoria: 'pratos' },
  { nome: 'Coxinha (unidade)', calorias_100g: 263, proteina: 8, carbs: 28, gordura: 13, categoria: 'pratos' },
  { nome: 'Brigadeiro (unidade)', calorias_100g: 375, proteina: 5, carbs: 60, gordura: 13, categoria: 'doces' },
  { nome: 'Pastel frito', calorias_100g: 299, proteina: 7, carbs: 28, gordura: 18, categoria: 'pratos' },
  { nome: 'Empada', calorias_100g: 317, proteina: 7, carbs: 26, gordura: 21, categoria: 'pratos' },
  { nome: 'Esfiha', calorias_100g: 256, proteina: 10, carbs: 30, gordura: 11, categoria: 'pratos' },
  { nome: 'Strogonoff de frango', calorias_100g: 155, proteina: 14, carbs: 7, gordura: 8, categoria: 'pratos' },
  { nome: 'Frango à parmegiana', calorias_100g: 210, proteina: 18, carbs: 12, gordura: 10, categoria: 'pratos' },
  // Bebidas
  { nome: 'Café preto sem açúcar', calorias_100g: 2, proteina: 0.3, carbs: 0, gordura: 0, categoria: 'bebidas' },
  { nome: 'Suco de laranja natural', calorias_100g: 45, proteina: 0.7, carbs: 10.4, gordura: 0.2, categoria: 'bebidas' },
  { nome: 'Água de coco', calorias_100g: 19, proteina: 0.7, carbs: 3.7, gordura: 0.2, categoria: 'bebidas' },
  { nome: 'Refrigerante (cola)', calorias_100g: 42, proteina: 0, carbs: 10.6, gordura: 0, categoria: 'bebidas' },
];

export const MOCK_EXERCISES: Exercise[] = [
  { nome: 'Agachamento livre', sets: 3, reps: '15', descanso_seg: 60, grupo_muscular: 'Pernas', equipamento: 'Nenhum', instrucoes: ['Pés na largura dos ombros', 'Desça até as coxas ficarem paralelas ao chão', 'Mantenha o core ativado', 'Suba controladamente'] },
  { nome: 'Flexão de braço', sets: 3, reps: '12', descanso_seg: 60, grupo_muscular: 'Peito', equipamento: 'Nenhum', instrucoes: ['Mãos na largura dos ombros', 'Corpo reto da cabeça aos pés', 'Desça até o peito quase tocar o chão', 'Empurre de volta'] },
  { nome: 'Abdominal crunch', sets: 3, reps: '20', descanso_seg: 45, grupo_muscular: 'Abdômen', equipamento: 'Nenhum', instrucoes: ['Deite com joelhos dobrados', 'Mãos atrás da cabeça', 'Eleve ombros do chão', 'Desça controladamente'] },
  { nome: 'Prancha', sets: 3, reps: '45 seg', duracao_seg: 45, descanso_seg: 30, grupo_muscular: 'Core', equipamento: 'Nenhum', instrucoes: ['Apoio nos antebraços e pontas dos pés', 'Corpo reto', 'Ative o abdômen', 'Mantenha a posição'] },
  { nome: 'Burpee', sets: 3, reps: '10', descanso_seg: 60, grupo_muscular: 'Corpo inteiro', equipamento: 'Nenhum', instrucoes: ['Agache e coloque as mãos no chão', 'Salte os pés para trás (prancha)', 'Faça uma flexão', 'Salte os pés para frente e pule'] },
  { nome: 'Afundo', sets: 3, reps: '12 (cada)', descanso_seg: 60, grupo_muscular: 'Pernas', equipamento: 'Nenhum', instrucoes: ['Dê um passo à frente', 'Desça o joelho traseiro ao chão', 'Joelho frontal a 90 graus', 'Volte à posição inicial'] },
  { nome: 'Polichinelo', sets: 3, reps: '30', descanso_seg: 30, grupo_muscular: 'Cardio', equipamento: 'Nenhum', instrucoes: ['Pés juntos, braços ao lado', 'Salte abrindo pernas e braços', 'Volte à posição inicial', 'Mantenha ritmo constante'] },
  { nome: 'Mountain climber', sets: 3, reps: '20 (cada)', descanso_seg: 45, grupo_muscular: 'Core', equipamento: 'Nenhum', instrucoes: ['Posição de prancha alta', 'Traga um joelho ao peito', 'Alterne rapidamente', 'Mantenha quadril estável'] },
  { nome: 'Elevação lateral', sets: 3, reps: '15', descanso_seg: 45, grupo_muscular: 'Ombros', equipamento: 'Halteres', instrucoes: ['Pés na largura dos ombros', 'Halteres ao lado do corpo', 'Eleve braços lateralmente até ombros', 'Desça controladamente'] },
  { nome: 'Remada curvada', sets: 3, reps: '12', descanso_seg: 60, grupo_muscular: 'Costas', equipamento: 'Halteres', instrucoes: ['Incline o tronco a 45 graus', 'Braços estendidos para baixo', 'Puxe os pesos ao peito', 'Contraia as escápulas'] },
  { nome: 'Cadeira extensora', sets: 3, reps: '12', descanso_seg: 60, grupo_muscular: 'Pernas', equipamento: 'Máquina', instrucoes: ['Sente na máquina', 'Ajuste o encosto', 'Estenda as pernas', 'Desça controladamente'] },
  { nome: 'Supino reto', sets: 3, reps: '10', descanso_seg: 90, grupo_muscular: 'Peito', equipamento: 'Barra', instrucoes: ['Deite no banco', 'Pegada na largura dos ombros', 'Desça a barra ao peito', 'Empurre de volta'] },
];

export const MOCK_WORKOUTS: Workout[] = [
  {
    nome: 'Queima de Gordura — Corpo Inteiro',
    duracao_min: 35,
    exercicios: MOCK_EXERCISES.slice(0, 6),
    nivel: 'intermediario',
    grupos_musculares: ['Pernas', 'Peito', 'Abdômen', 'Core'],
    calorias_estimadas: 280,
  },
  {
    nome: 'HIIT Express',
    duracao_min: 20,
    exercicios: [MOCK_EXERCISES[4], MOCK_EXERCISES[6], MOCK_EXERCISES[7], MOCK_EXERCISES[0]],
    nivel: 'avancado',
    grupos_musculares: ['Corpo inteiro', 'Cardio'],
    calorias_estimadas: 320,
  },
  {
    nome: 'Core & Abdômen',
    duracao_min: 25,
    exercicios: [MOCK_EXERCISES[2], MOCK_EXERCISES[3], MOCK_EXERCISES[7]],
    nivel: 'iniciante',
    grupos_musculares: ['Abdômen', 'Core'],
    calorias_estimadas: 180,
  },
];

export const MOCK_MEAL_PLAN: DayPlan[] = [
  {
    dia: 'Segunda',
    calorias_total: 1900,
    refeicoes: [
      { tipo: 'cafe', nome: 'Café da Manhã', horario: '07:30', calorias_total: 420, itens: [
        { nome: 'Ovos mexidos', calorias: 166, proteina: 11, carbs: 1.6, gordura: 12, peso_g: 100 },
        { nome: 'Pão integral', calorias: 127, proteina: 4.7, carbs: 24.5, gordura: 1.5, peso_g: 50 },
        { nome: 'Café preto', calorias: 2, proteina: 0.3, carbs: 0, gordura: 0, peso_g: 200 },
        { nome: 'Banana', calorias: 89, proteina: 1.1, carbs: 22.8, gordura: 0.3, peso_g: 100 },
      ]},
      { tipo: 'almoco', nome: 'Salmão Grelhado com Quinoa e Legumes', horario: '12:30', calorias_total: 580, itens: [
        { nome: 'Salmão grelhado', calorias: 208, proteina: 20, carbs: 0, gordura: 13, peso_g: 150 },
        { nome: 'Quinoa cozida', calorias: 120, proteina: 4.4, carbs: 21.3, gordura: 1.9, peso_g: 120 },
        { nome: 'Brócolis cozido', calorias: 35, proteina: 2.4, carbs: 7.2, gordura: 0.4, peso_g: 100 },
        { nome: 'Azeite de oliva', calorias: 88, proteina: 0, carbs: 0, gordura: 10, peso_g: 10 },
      ]},
      { tipo: 'lanche', nome: 'Lanche da Tarde', horario: '16:00', calorias_total: 300, itens: [
        { nome: 'Iogurte grego', calorias: 97, proteina: 9, carbs: 3.6, gordura: 5, peso_g: 170 },
        { nome: 'Granola', calorias: 126, proteina: 3, carbs: 19.2, gordura: 4.5, peso_g: 30 },
        { nome: 'Morango', calorias: 32, proteina: 0.7, carbs: 7.7, gordura: 0.3, peso_g: 100 },
      ]},
      { tipo: 'jantar', nome: 'Frango com Batata Doce', horario: '19:30', calorias_total: 520, itens: [
        { nome: 'Frango grelhado', calorias: 239, proteina: 48, carbs: 0, gordura: 4.8, peso_g: 150 },
        { nome: 'Batata doce cozida', calorias: 154, proteina: 1.2, carbs: 36.8, gordura: 0.2, peso_g: 200 },
        { nome: 'Salada verde', calorias: 15, proteina: 1.4, carbs: 2.9, gordura: 0.2, peso_g: 100 },
      ]},
    ],
  },
];

export const MOCK_WEEK_WORKOUTS = [
  { dia: 'Seg', treino: true, nome: 'Corpo Inteiro' },
  { dia: 'Ter', treino: false, nome: 'Descanso' },
  { dia: 'Qua', treino: true, nome: 'HIIT Express' },
  { dia: 'Qui', treino: false, nome: 'Descanso' },
  { dia: 'Sex', treino: true, nome: 'Core & Abdômen' },
  { dia: 'Sáb', treino: true, nome: 'Corpo Inteiro' },
  { dia: 'Dom', treino: false, nome: 'Descanso' },
];
