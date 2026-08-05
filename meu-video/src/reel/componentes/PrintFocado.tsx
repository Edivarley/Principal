import {
  AbsoluteFill,
  Img,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { altura, cores, largura } from "../tema";

export type Retangulo = { x: number; y: number; w: number; h: number };

/**
 * Zoom dirigido sobre um print, do retângulo `de` para o `para`.
 *
 * A escala é `max(largura / r.w, altura / r.h)`, então o retângulo escolhido
 * **sempre cobre** os 1080x1920 — o espaço morto deixa de existir por
 * construção, em vez de depender de acertar o enquadramento na mão.
 *
 * Os retângulos estão em coordenadas do próprio print e são declarados em
 * `config.ts`, não aqui.
 *
 * Consequência a ter em conta: com print de origem 1920x1080, cobrir um quadro
 * em pé custa 1,78x de ampliação no mínimo. Print capturado em retrato e em
 * 2x de densidade elimina essa ampliação.
 */
export const PrintFocado: React.FC<{
  src: string;
  de: Retangulo;
  para: Retangulo;
  fonteLargura: number;
  fonteAltura: number;
}> = ({ src, de, para, fonteLargura, fonteAltura }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const avanco = spring({
    frame,
    fps,
    durationInFrames,
    config: { damping: 200 },
  });

  const entre = (a: number, b: number) => a + (b - a) * avanco;
  const r = {
    x: entre(de.x, para.x),
    y: entre(de.y, para.y),
    w: entre(de.w, para.w),
    h: entre(de.h, para.h),
  };

  const escala = Math.max(largura / r.w, altura / r.h);

  return (
    <AbsoluteFill
      name="Print focado"
      style={{ backgroundColor: cores.base, overflow: "hidden" }}
    >
      <Img
        name="Print"
        src={staticFile(src)}
        style={{
          position: "absolute",
          width: fonteLargura * escala,
          height: fonteAltura * escala,
          left: largura / 2 - (r.x + r.w / 2) * escala,
          top: altura / 2 - (r.y + r.h / 2) * escala,
          maxWidth: "none",
        }}
      />
    </AbsoluteFill>
  );
};
