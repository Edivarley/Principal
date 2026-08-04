import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FaceCamSlot } from "./FaceCamSlot";
import { inter } from "./fonts";

export const Scene07Cta: React.FC<{ ctaSrc: string }> = ({ ctaSrc }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill name="Cena 7 — Chamada">
      <FaceCamSlot
        src={ctaSrc}
        etiqueta="GRAVE AQUI · 6s"
        fala="“O acervo é público e o link está na bio. Se isso te poupar tempo, salva o vídeo e manda pra quem está na residência.”"
      />

      <AbsoluteFill
        name="Sobreposição da chamada"
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          paddingTop: 320,
        }}
      >
        <Interactive.Div
          name="Chamada principal"
          style={{
            fontFamily: inter,
            fontSize: 104,
            fontWeight: 700,
            letterSpacing: -2,
            color: "#F4F1E8",
            textAlign: "center",
            maxWidth: 860,
            textShadow: "0 8px 40px rgba(0,0,0,0.75)",
            opacity: interpolate(frame, [0.2 * fps, 0.9 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
            scale: interpolate(frame, [0.2 * fps, 1.1 * fps], [0.9, 1], {
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
            fontFamily: inter,
            fontSize: 48,
            fontWeight: 600,
            color: "#E3C567",
            textAlign: "center",
            maxWidth: 860,
            marginTop: 36,
            textShadow: "0 6px 30px rgba(0,0,0,0.8)",
            opacity: interpolate(frame, [1.4 * fps, 2.1 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
          }}
        >
          salve para consultar · mande para quem está na residência
        </Interactive.Div>
      </AbsoluteFill>

      <Interactive.Div
        name="Assinatura"
        style={{
          position: "absolute",
          bottom: 340,
          left: 90,
          width: 900,
          fontFamily: inter,
          fontSize: 32,
          fontWeight: 600,
          lineHeight: 1.4,
          color: "#B9CFC5",
          textAlign: "center",
          textShadow: "0 4px 20px rgba(0,0,0,0.85)",
          opacity: interpolate(frame, [2.6 * fps, 3.4 * fps], [0, 1], {
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
