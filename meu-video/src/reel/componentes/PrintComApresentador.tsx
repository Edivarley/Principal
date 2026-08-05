import {
  AbsoluteFill,
  Easing,
  interpolate,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { cores, zonaSegura } from "../tema";
import { PrintFocado, type Retangulo } from "./PrintFocado";

/**
 * Print em quadro cheio com o apresentador num inset circular.
 *
 * Nenhuma cena do reel mostra o print sozinho: o dado da conta é que reel sem
 * rosto fez 318 reproduções contra 1.315 a 10.974 dos reels com presença em
 * cena. O inset mantém o rosto em quadro durante os trechos de tela.
 *
 * O clipe da fala continua montado por baixo e é ele que carrega o áudio; o
 * inset é uma segunda instância do mesmo arquivo, muda, alinhada por
 * `trimBefore` para mostrar o mesmo instante.
 */
export const PrintComApresentador: React.FC<{
  print: string;
  de: Retangulo;
  para: Retangulo;
  fonteLargura: number;
  fonteAltura: number;
  clipe: string;
  desdeFrame: number;
}> = ({ print, de, para, fonteLargura, fonteAltura, clipe, desdeFrame }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill
      name="Print com apresentador"
      style={{
        opacity: interpolate(
          frame,
          [0, 0.2 * fps, durationInFrames - 5, durationInFrames],
          [0, 1, 1, 0],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          },
        ),
      }}
    >
      <PrintFocado
        src={print}
        de={de}
        para={para}
        fonteLargura={fonteLargura}
        fonteAltura={fonteAltura}
      />

      <div
        style={{
          position: "absolute",
          right: zonaSegura.lateral,
          bottom: zonaSegura.base + 10,
          width: 380,
          height: 380,
          borderRadius: 190,
          overflow: "hidden",
          border: `4px solid ${cores.dourado}`,
          boxShadow: "0 24px 60px rgba(0,0,0,0.55)",
        }}
      >
        <OffthreadVideo
          src={staticFile(`media/${clipe}.mp4`)}
          trimBefore={desdeFrame}
          muted
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
