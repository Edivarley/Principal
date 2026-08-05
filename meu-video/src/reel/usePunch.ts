import { useCurrentFrame } from "remotion";

export type Punch = { em: number; escala: number };

/**
 * Punch-in por corte seco.
 *
 * Devolve a escala vigente no quadro atual — o valor do último ponto declarado
 * que já passou. Sem interpolação de propósito: transição suave em punch-in
 * denuncia amadorismo, o salto é o que faz a emenda ler como corte.
 *
 * `transformOrigin: "50% 38%"` mantém os olhos na mesma altura entre um
 * enquadramento e outro.
 */
export const usePunch = (punches: Punch[]) => {
  const frame = useCurrentFrame();

  const escala = punches.reduce(
    (atual, p) => (frame >= p.em ? p.escala : atual),
    punches[0]?.escala ?? 1,
  );

  return { scale: escala, transformOrigin: "50% 38%" } as const;
};
