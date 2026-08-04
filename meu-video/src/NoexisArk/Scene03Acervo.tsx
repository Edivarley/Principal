import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { inter, lora } from "./fonts";

const abas = ["Artigos", "Mais recentes", "Por Tema", "Por desenho", "Por área clínica"];

export const Scene03Acervo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      name="Cena 3 — O acervo"
      style={{
        backgroundColor: "#0A2A20",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Interactive.Div
        name="Rótulo"
        style={{
          fontFamily: inter,
          fontSize: 34,
          fontWeight: 600,
          letterSpacing: 8,
          color: "#7FA394",
          marginBottom: 28,
          opacity: interpolate(frame, [0, 0.5 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        ACERVO PÚBLICO
      </Interactive.Div>

      <Interactive.Div
        name="Nome do acervo"
        style={{
          fontFamily: inter,
          fontSize: 130,
          fontWeight: 700,
          letterSpacing: -3,
          color: "#F4F1E8",
          textAlign: "center",
          opacity: interpolate(frame, [0.2 * fps, 1 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          scale: interpolate(frame, [0.2 * fps, 1.2 * fps], [0.9, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            output: "perceptual-scale",
          }),
        }}
      >
        Noexis Ark
      </Interactive.Div>

      <Interactive.Div
        name="Descrição"
        style={{
          fontFamily: lora,
          fontStyle: "italic",
          fontSize: 44,
          lineHeight: 1.4,
          color: "#B9CFC5",
          textAlign: "center",
          maxWidth: 820,
          marginTop: 32,
          opacity: interpolate(frame, [1 * fps, 1.8 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        Estudos em psiquiatria e neurociência clínica, das principais revistas
        da área.
      </Interactive.Div>

      <Interactive.Div
        name="Contador"
        style={{
          fontFamily: inter,
          fontSize: 200,
          fontWeight: 700,
          letterSpacing: -6,
          color: "#E3C567",
          marginTop: 70,
          opacity: interpolate(frame, [2 * fps, 2.5 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        10
      </Interactive.Div>

      <Interactive.Div
        name="Legenda do contador"
        style={{
          fontFamily: inter,
          fontSize: 42,
          fontWeight: 600,
          color: "#F4F1E8",
          textAlign: "center",
          opacity: interpolate(frame, [4.2 * fps, 4.8 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        revistas acompanhadas todo dia
      </Interactive.Div>

      <Interactive.Div
        name="Barra de abas"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 16,
          maxWidth: 880,
          marginTop: 70,
          opacity: interpolate(frame, [5.2 * fps, 6 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        {abas.map((aba) => (
          <div
            key={aba}
            style={{
              fontFamily: inter,
              fontSize: 32,
              fontWeight: 600,
              color: "#B9CFC5",
              backgroundColor: "#123B2D",
              border: "2px solid #1D4A3A",
              borderRadius: 999,
              padding: "16px 30px",
            }}
          >
            {aba}
          </div>
        ))}
      </Interactive.Div>

      <Interactive.Div
        name="Cadência"
        style={{
          fontFamily: inter,
          fontSize: 38,
          fontWeight: 600,
          letterSpacing: 2,
          color: "#C9A227",
          marginTop: 60,
          opacity: interpolate(frame, [6.4 * fps, 7.2 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        acervo aberto · link na bio
      </Interactive.Div>
    </AbsoluteFill>
  );
};
