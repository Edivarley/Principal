import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { inter } from "./fonts";

export const Scene06Cautela: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      name="Cena 6 — Cautela"
      style={{
        backgroundColor: "#07201A",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 100,
      }}
    >
      <Interactive.Div
        name="O que é"
        style={{
          fontFamily: inter,
          fontSize: 72,
          fontWeight: 700,
          lineHeight: 1.2,
          letterSpacing: -1.5,
          color: "#F4F1E8",
          textAlign: "center",
          maxWidth: 860,
          opacity: interpolate(frame, [0, 0.7 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        É um mapa de leitura.
      </Interactive.Div>

      <Interactive.Div
        name="O que não é"
        style={{
          fontFamily: inter,
          fontSize: 50,
          fontWeight: 600,
          lineHeight: 1.4,
          color: "#E3C567",
          textAlign: "center",
          maxWidth: 860,
          marginTop: 44,
          opacity: interpolate(frame, [1.2 * fps, 2 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        Não é recomendação clínica, nem protocolo, nem substituto do artigo
        original.
      </Interactive.Div>

      <Interactive.Div
        name="Fonte primária"
        style={{
          fontFamily: inter,
          fontSize: 44,
          fontWeight: 700,
          color: "#7FA394",
          textAlign: "center",
          maxWidth: 860,
          marginTop: 52,
          opacity: interpolate(frame, [2.6 * fps, 3.3 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        A fonte primária prevalece sempre.
      </Interactive.Div>
    </AbsoluteFill>
  );
};
