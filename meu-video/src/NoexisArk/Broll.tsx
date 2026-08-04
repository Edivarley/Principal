import {
  AbsoluteFill,
  CanvasImage,
  Easing,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { inter } from "./fonts";

/**
 * Insere uma vista da página por cima da fala.
 *
 * O vídeo da fala continua montado por baixo, então o áudio do Edivarley não
 * é interrompido — a vista entra só como imagem.
 *
 * São quadros congelados das gravações de tela, não as gravações em si: as
 * capturas rolam a página, e num recorte de 3 segundos a vista certa saía de
 * quadro. Congelado, o que aparece é sempre a aba que o rótulo anuncia.
 *
 * `zoom` amplia dentro da janela — a fonte é 1920x1080 de navegador, e sem
 * ampliar o texto do Notion some na tela do celular.
 */
export const Broll: React.FC<{
  src: string;
  rotulo: string;
  legenda: string;
  zoom: number;
  focoX: string;
  focoY: string;
}> = ({ src, rotulo, legenda, zoom, focoX, focoY }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill
      name="B-roll"
      style={{
        backgroundColor: "#07201A",
        opacity: interpolate(
          frame,
          [0, 0.2 * fps, durationInFrames - 6, durationInFrames],
          [0, 1, 1, 0],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          },
        ),
      }}
    >
      <Interactive.Div
        name="Rótulo do B-roll"
        style={{
          position: "absolute",
          top: 400,
          left: 90,
          width: 900,
          fontFamily: inter,
          fontSize: 48,
          fontWeight: 700,
          lineHeight: 1.25,
          letterSpacing: -0.5,
          color: "#E3C567",
          textAlign: "center",
          opacity: interpolate(frame, [0.2 * fps, 0.7 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        {rotulo}
      </Interactive.Div>

      <Interactive.Div
        name="Janela da vista"
        style={{
          position: "absolute",
          top: 620,
          left: 60,
          width: 960,
          height: 740,
          borderRadius: 28,
          border: "3px solid #1D4A3A",
          overflow: "hidden",
          backgroundColor: "#FFFFFF",
        }}
      >
        <CanvasImage
          name="Vista da página"
          src={staticFile(src)}
          style={{
            position: "absolute",
            top: focoY,
            left: focoX,
            width: `${zoom * 100}%`,
            translate: "-50% -50%",
            scale: interpolate(frame, [0, durationInFrames], [1, 1.08], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.4, 0, 0.6, 1),
              output: "perceptual-scale",
            }),
          }}
        />
      </Interactive.Div>

      <Interactive.Div
        name="Legenda da vista"
        style={{
          position: "absolute",
          top: 1410,
          left: 90,
          width: 900,
          fontFamily: inter,
          fontSize: 38,
          fontWeight: 600,
          lineHeight: 1.35,
          color: "#B9CFC5",
          textAlign: "center",
          opacity: interpolate(frame, [0.6 * fps, 1.2 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        {legenda}
      </Interactive.Div>
    </AbsoluteFill>
  );
};
