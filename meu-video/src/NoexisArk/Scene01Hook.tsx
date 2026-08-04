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

export const Scene01Hook: React.FC<{ hookSrc: string }> = ({ hookSrc }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill name="Cena 1 — Gancho">
      <FaceCamSlot
        src={hookSrc}
        etiqueta="GRAVE AQUI · 6s"
        fala="“Saem centenas de artigos de psiquiatria por semana. Você não vai ler todos — e não precisa. Precisa de um filtro. Eu construí o meu, e ele é público.”"
      />

      <AbsoluteFill
        name="Sobreposição do gancho"
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          paddingTop: 300,
        }}
      >
        <Interactive.Div
          name="Pergunta do gancho"
          style={{
            fontFamily: inter,
            fontSize: 96,
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: -2,
            color: "#F4F1E8",
            textAlign: "center",
            maxWidth: 860,
            textShadow: "0 8px 40px rgba(0,0,0,0.75)",
            opacity: interpolate(frame, [0, 0.6 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
            translate: interpolate(
              frame,
              [0, 0.8 * fps],
              ["0px 40px", "0px 0px"],
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

        <Interactive.Div
          name="Traço dourado"
          style={{
            width: 160,
            height: 8,
            backgroundColor: "#C9A227",
            borderRadius: 4,
            marginTop: 48,
            marginBottom: 48,
            scale: interpolate(frame, [0.8 * fps, 1.4 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              output: "perceptual-scale",
            }),
          }}
        />

        <Interactive.Div
          name="Números do acervo"
          style={{
            fontFamily: inter,
            fontSize: 52,
            fontWeight: 600,
            color: "#E3C567",
            textAlign: "center",
            maxWidth: 860,
            textShadow: "0 6px 30px rgba(0,0,0,0.8)",
            opacity: interpolate(frame, [1.2 * fps, 2 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
          }}
        >
          211 estudos já triados
        </Interactive.Div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
