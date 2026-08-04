import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { inter } from "./fonts";

const temas = ["Neurobiologia", "Psicofarmacologia", "Psicose", "Sono e Ritmos"];
const areas = ["Depressão", "TDAH", "TEA", "T. Afetivos"];
const desenhos = ["Meta-análise", "Ensaio Randomizado", "Observacional"];

export const Scene05Portas: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      name="Cena 5 — Três entradas"
      style={{
        backgroundColor: "#0A2A20",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 90,
      }}
    >
      <Interactive.Div
        name="Título da cena"
        style={{
          fontFamily: inter,
          fontSize: 64,
          fontWeight: 700,
          lineHeight: 1.15,
          letterSpacing: -1.5,
          color: "#F4F1E8",
          textAlign: "center",
          maxWidth: 860,
          marginBottom: 70,
          opacity: interpolate(frame, [0, 0.7 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        O mesmo acervo, três entradas
      </Interactive.Div>

      <Interactive.Div
        name="Bloco tema"
        style={{
          width: 880,
          marginBottom: 46,
          opacity: interpolate(frame, [0.6 * fps, 1.3 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          translate: interpolate(
            frame,
            [0.6 * fps, 1.4 * fps],
            ["-40px 0px", "0px 0px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
        }}
      >
        <div
          style={{
            fontFamily: inter,
            fontSize: 32,
            fontWeight: 700,
            letterSpacing: 5,
            color: "#C9A227",
            marginBottom: 20,
          }}
        >
          POR TEMA
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
          {temas.map((t) => (
            <div
              key={t}
              style={{
                fontFamily: inter,
                fontSize: 34,
                fontWeight: 600,
                color: "#B9CFC5",
                backgroundColor: "#123B2D",
                border: "2px solid #1D4A3A",
                borderRadius: 16,
                padding: "16px 26px",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </Interactive.Div>

      <Interactive.Div
        name="Bloco área clínica"
        style={{
          width: 880,
          marginBottom: 46,
          opacity: interpolate(frame, [2.2 * fps, 2.9 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          translate: interpolate(
            frame,
            [2.2 * fps, 3 * fps],
            ["-40px 0px", "0px 0px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
        }}
      >
        <div
          style={{
            fontFamily: inter,
            fontSize: 32,
            fontWeight: 700,
            letterSpacing: 5,
            color: "#C9A227",
            marginBottom: 20,
          }}
        >
          POR ÁREA CLÍNICA
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
          {areas.map((a) => (
            <div
              key={a}
              style={{
                fontFamily: inter,
                fontSize: 34,
                fontWeight: 600,
                color: "#B9CFC5",
                backgroundColor: "#123B2D",
                border: "2px solid #1D4A3A",
                borderRadius: 16,
                padding: "16px 26px",
              }}
            >
              {a}
            </div>
          ))}
        </div>
      </Interactive.Div>

      <Interactive.Div
        name="Bloco desenho"
        style={{
          width: 880,
          opacity: interpolate(frame, [3.8 * fps, 4.5 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          translate: interpolate(
            frame,
            [3.8 * fps, 4.6 * fps],
            ["-40px 0px", "0px 0px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
        }}
      >
        <div
          style={{
            fontFamily: inter,
            fontSize: 32,
            fontWeight: 700,
            letterSpacing: 5,
            color: "#E3C567",
            marginBottom: 20,
          }}
        >
          POR DESENHO DO ESTUDO
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
          {desenhos.map((d) => (
            <div
              key={d}
              style={{
                fontFamily: inter,
                fontSize: 34,
                fontWeight: 700,
                color: "#0A2A20",
                backgroundColor: "#E3C567",
                borderRadius: 16,
                padding: "16px 26px",
              }}
            >
              {d}
            </div>
          ))}
        </div>
      </Interactive.Div>

      <Interactive.Div
        name="Fecho da cena"
        style={{
          fontFamily: inter,
          fontSize: 46,
          fontWeight: 600,
          lineHeight: 1.35,
          color: "#F4F1E8",
          textAlign: "center",
          maxWidth: 860,
          marginTop: 64,
          opacity: interpolate(frame, [5.8 * fps, 6.6 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        Ler por desenho é o que treina leitura crítica.
      </Interactive.Div>
    </AbsoluteFill>
  );
};
