import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { inter } from "./fonts";

/**
 * Cada sobreposição chama `useCurrentFrame()` por dentro, para que o quadro
 * seja o da própria `<Sequence>` e não o da composição inteira.
 */

export const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill
      name="Sobreposição do gancho"
      style={{
        // O véu para só no terço de cima. Numa versão anterior ele cobria o
        // quadro inteiro e escurecia o rosto nos primeiros segundos — que é
        // justamente onde a presença em cena segura a retenção.
        background:
          "linear-gradient(180deg, rgba(7,32,26,0.94) 0%, rgba(7,32,26,0.88) 20%, rgba(7,32,26,0.45) 33%, rgba(7,32,26,0) 42%)",
        opacity: interpolate(
          frame,
          [0, 0.2 * fps, durationInFrames - 30, durationInFrames],
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
        name="Pergunta do gancho"
        style={{
          position: "absolute",
          top: 270,
          left: 90,
          width: 900,
          fontFamily: inter,
          fontSize: 88,
          fontWeight: 700,
          lineHeight: 1.08,
          letterSpacing: -2,
          color: "#F4F1E8",
          textAlign: "center",
          opacity: interpolate(frame, [0, 0.6 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          translate: interpolate(
            frame,
            [0, 0.8 * fps],
            ["0px 30px", "0px 0px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
        }}
      >
        COMO VOCÊ DECIDE O QUE LER?
      </Interactive.Div>
    </AbsoluteFill>
  );
};

export const Cautela: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  return (
    <Interactive.Div
      name="Faixa de cautela"
      style={{
        position: "absolute",
        top: 1150,
        left: 60,
        width: 960,
        backgroundColor: "rgba(7,32,26,0.92)",
        border: "2px solid #1D4A3A",
        borderRadius: 24,
        padding: 34,
        fontFamily: inter,
        fontSize: 38,
        fontWeight: 600,
        lineHeight: 1.35,
        color: "#F4F1E8",
        textAlign: "center",
        opacity: interpolate(
          frame,
          [0, 0.5 * fps, durationInFrames - 15, durationInFrames],
          [0, 1, 1, 0],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          },
        ),
      }}
    >
      Mapa de leitura, não recomendação clínica. A fonte primária prevalece
      sempre.
    </Interactive.Div>
  );
};

export const Chamada: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill name="Sobreposição da chamada">
      <AbsoluteFill
        name="Véu da chamada"
        style={{
          background:
            "linear-gradient(180deg, rgba(7,32,26,0.9) 0%, rgba(7,32,26,0.75) 30%, rgba(7,32,26,0) 46%, rgba(7,32,26,0) 68%, rgba(7,32,26,0.85) 100%)",
          opacity: interpolate(frame, [0, 0.5 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      />

      <Interactive.Div
        name="Link na bio"
        style={{
          position: "absolute",
          top: 330,
          left: 90,
          width: 900,
          fontFamily: inter,
          fontSize: 104,
          fontWeight: 700,
          letterSpacing: -2,
          color: "#F4F1E8",
          textAlign: "center",
          textShadow: "0 8px 40px rgba(0,0,0,0.9)",
          opacity: interpolate(frame, [0, 0.6 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          scale: interpolate(frame, [0, 0.9 * fps], [0.92, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            output: "perceptual-scale",
          }),
        }}
      >
        LINK NA BIO
      </Interactive.Div>

      <Interactive.Div
        name="Ação pedida"
        style={{
          position: "absolute",
          top: 480,
          left: 110,
          width: 860,
          fontFamily: inter,
          fontSize: 44,
          fontWeight: 600,
          lineHeight: 1.3,
          color: "#E3C567",
          textAlign: "center",
          textShadow: "0 6px 30px rgba(0,0,0,0.9)",
          opacity: interpolate(frame, [0.6 * fps, 1.3 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        salve para consultar · mande para quem está na residência
      </Interactive.Div>

      <Interactive.Div
        name="Assinatura"
        style={{
          // Sob a chamada, não no rodapé: a legendagem ocupa a faixa de baixo.
          position: "absolute",
          top: 640,
          left: 90,
          width: 900,
          fontFamily: inter,
          fontSize: 30,
          fontWeight: 600,
          lineHeight: 1.4,
          color: "#F4F1E8",
          textAlign: "center",
          textShadow: "0 4px 22px rgba(0,0,0,0.92)",
          opacity: interpolate(frame, [1 * fps, 1.8 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        Dr. Edivarley Costa Jr. · Médico Psiquiatra · CRM 42763 · RQE 25989
      </Interactive.Div>
    </AbsoluteFill>
  );
};
