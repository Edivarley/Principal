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
 * As revistas acompanhadas, entrando uma a uma.
 *
 * A lista é a mesma que a página do Ark declara em "Sobre a curadoria" — são
 * as revistas monitoradas, o que não é o mesmo que as revistas já presentes no
 * acervo. Se preferir mostrar só as que já têm registro, corte a lista aqui.
 */
const revistas = [
  "Molecular Psychiatry",
  "Nature Mental Health",
  "World Psychiatry",
  "JAMA Psychiatry",
  "Lancet Psychiatry",
  "American Journal of Psychiatry",
  "Biological Psychiatry",
  "Neuropsychopharmacology",
  "The Lancet",
  "New England Journal of Medicine",
];

export const Revistas: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill
      name="Revistas"
      style={{
        opacity: interpolate(
          frame,
          [0, 0.25 * fps, durationInFrames - 10, durationInFrames],
          [0, 1, 1, 0],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          },
        ),
      }}
    >
      <AbsoluteFill
        name="Véu das revistas"
        style={{
          background:
            "linear-gradient(180deg, rgba(7,32,26,0.45) 0%, rgba(7,32,26,0.93) 22%, rgba(7,32,26,0.93) 78%, rgba(7,32,26,0.45) 100%)",
        }}
      />

      <Interactive.Div
        name="Rótulo das revistas"
        style={{
          position: "absolute",
          top: 330,
          left: 90,
          width: 900,
          fontFamily: inter,
          fontSize: 34,
          fontWeight: 700,
          letterSpacing: 7,
          color: "#C9A227",
          textAlign: "center",
          opacity: interpolate(frame, [0, 0.4 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        ACOMPANHADAS TODO DIA
      </Interactive.Div>

      {revistas.map((revista, i) => (
        <Interactive.Div
          key={revista}
          name={revista}
          style={{
            position: "absolute",
            top: 440 + i * 96,
            left: 70,
            width: 940,
            fontFamily: inter,
            fontSize: 48,
            fontWeight: 600,
            lineHeight: 1.15,
            color: "#F4F1E8",
            textAlign: "center",
            opacity: interpolate(frame, [6 + i * 5, 16 + i * 5], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
            translate: interpolate(
              frame,
              [6 + i * 5, 20 + i * 5],
              ["0px 22px", "0px 0px"],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              },
            ),
          }}
        >
          {revista}
        </Interactive.Div>
      ))}
    </AbsoluteFill>
  );
};
