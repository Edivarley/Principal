import type { Retangulo } from "./componentes/PrintFocado";

/**
 * Ponto único de edição do reel: textos, tempos, punches e retângulos de zoom.
 * Nada disso deve ser escrito dentro de componente.
 */

export const ganchos = [
  "Você lembra do achado. Não lembra do desenho.",
  "Todo mundo salva o PDF. Quase ninguém volta nele.",
  "Meta-análise não é selo de verdade.",
  "Se você decide o que ler pelo título, já foi enviesado.",
];

export const ganchoAtivo = 0;

export const chamada = {
  principal: "Comenta ARK",
  apoio: "que eu mando o acervo no direct",
  credencial:
    "Dr. Edivarley Costa Jr. · Médico Psiquiatra · CRM 42763 · RQE 25989",
};

export const cautela =
  "Mapa de leitura, não recomendação clínica. A fonte primária prevalece sempre.";

/** Os prints de origem são capturas de navegador em 1920x1080. */
export const fonte = { largura: 1920, altura: 1080 };

/**
 * Retângulos em coordenadas do print.
 *
 * Altura próxima de 1080 mantém a ampliação no mínimo geométrico de 1,78x
 * (cobrir 1920 de altura a partir de 1080). Retângulos mais baixos ampliam
 * mais e borram.
 */
export const recortes: Record<string, { de: Retangulo; para: Retangulo }> = {
  acervo: {
    de: { x: 20, y: 0, w: 660, h: 1080 },
    para: { x: 90, y: 60, w: 600, h: 950 },
  },
  tema: {
    de: { x: 0, y: 0, w: 660, h: 1080 },
    para: { x: 240, y: 40, w: 610, h: 1000 },
  },
  area: {
    de: { x: 1180, y: 0, w: 660, h: 1080 },
    para: { x: 950, y: 40, w: 610, h: 1000 },
  },
  desenho: {
    de: { x: 180, y: 0, w: 660, h: 1080 },
    para: { x: 620, y: 40, w: 610, h: 1000 },
  },
};

export type Bloco = {
  id: string;
  clipe: string;
  frames: number;
  punches: { em: number; escala: number }[];
  prints?: {
    recorte: keyof typeof recortes;
    arquivo: string;
    de: number;
    frames: number;
    rotulo: string;
    apoio?: string;
  }[];
};

/**
 * Quatro clipes de fala, na ordem numérica dos arquivos entregues.
 * O áudio sai deles; as telas entram por cima sem cortar a fala.
 */
export const blocos: Bloco[] = [
  {
    id: "abertura",
    clipe: "cam1",
    frames: 305,
    punches: [
      { em: 0, escala: 1.1 },
      { em: 70, escala: 1.0 },
      { em: 148, escala: 1.08 },
      { em: 226, escala: 1.0 },
    ],
  },
  {
    id: "acervo",
    clipe: "cam2",
    frames: 300,
    punches: [
      { em: 0, escala: 1.06 },
      { em: 215, escala: 1.0 },
      { em: 262, escala: 1.1 },
    ],
    prints: [
      {
        recorte: "acervo",
        arquivo: "media/vistas/acervo.png",
        de: 52,
        frames: 150,
        rotulo: "10 revistas · RSS diário",
        apoio: "desenho · força de evidência · ideia central · fonte",
      },
    ],
  },
  {
    id: "entradas",
    clipe: "cam3",
    frames: 318,
    punches: [
      { em: 0, escala: 1.0 },
      { em: 250, escala: 1.08 },
    ],
    prints: [
      {
        recorte: "tema",
        arquivo: "media/vistas/tema.png",
        de: 8,
        frames: 96,
        rotulo: "Por tema",
      },
      {
        recorte: "area",
        arquivo: "media/vistas/area.png",
        de: 110,
        frames: 96,
        rotulo: "Por área clínica",
      },
      {
        recorte: "desenho",
        arquivo: "media/vistas/desenho.png",
        de: 212,
        frames: 96,
        rotulo: "Por desenho do estudo",
      },
    ],
  },
  {
    id: "fecho",
    clipe: "cam4",
    frames: 217,
    punches: [
      { em: 0, escala: 1.0 },
      { em: 96, escala: 1.06 },
      { em: 186, escala: 1.1 },
    ],
  },
];

/** Quadros em que a faixa de cautela e a chamada entram, dentro do bloco final. */
export const fecho = {
  cautelaDe: 4,
  cautelaFrames: 86,
  chamadaDe: 96,
};
