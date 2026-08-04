import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { inter, lora } from "./fonts";

export const Scene04Registro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      name="Cena 4 — Anatomia de um registro"
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
          fontSize: 56,
          fontWeight: 700,
          lineHeight: 1.2,
          letterSpacing: -1,
          color: "#F4F1E8",
          textAlign: "center",
          maxWidth: 860,
          marginBottom: 56,
          opacity: interpolate(frame, [0, 0.7 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        Todo registro responde isto antes do PDF
      </Interactive.Div>

      <Interactive.Div
        name="Cartão do registro"
        style={{
          width: 880,
          backgroundColor: "#0F3A2C",
          border: "3px solid #1D4A3A",
          borderRadius: 36,
          padding: 52,
          display: "flex",
          flexDirection: "column",
          gap: 34,
          opacity: interpolate(frame, [0.6 * fps, 1.2 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          scale: interpolate(frame, [0.6 * fps, 1.4 * fps], [0.94, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            output: "perceptual-scale",
          }),
        }}
      >
        <Interactive.Div
          name="Estudo"
          style={{
            fontFamily: inter,
            fontSize: 40,
            fontWeight: 700,
            lineHeight: 1.3,
            color: "#F4F1E8",
            opacity: interpolate(frame, [1.2 * fps, 1.9 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
          }}
        >
          Adjunctive transcranial alternating current stimulation in bipolar
          depression
        </Interactive.Div>

        <Interactive.Div
          name="Revista"
          style={{
            fontFamily: inter,
            fontSize: 34,
            fontWeight: 600,
            color: "#B9CFC5",
            opacity: interpolate(frame, [2.4 * fps, 3 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
          }}
        >
          REVISTA · Molecular Psychiatry
        </Interactive.Div>

        <Interactive.Div
          name="Tipo de estudo"
          style={{
            fontFamily: inter,
            fontSize: 40,
            fontWeight: 700,
            color: "#7FD4A8",
            backgroundColor: "#123B2D",
            border: "2px solid #2F7D5B",
            borderRadius: 999,
            padding: "18px 34px",
            alignSelf: "flex-start",
            opacity: interpolate(frame, [3.4 * fps, 4 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
            translate: interpolate(
              frame,
              [3.4 * fps, 4.1 * fps],
              ["-30px 0px", "0px 0px"],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              },
            ),
          }}
        >
          Ensaio Clínico Randomizado
        </Interactive.Div>

        <Interactive.Div
          name="Força de evidência"
          style={{
            fontFamily: inter,
            fontSize: 40,
            fontWeight: 700,
            color: "#0A2A20",
            backgroundColor: "#C9A227",
            borderRadius: 999,
            padding: "18px 34px",
            alignSelf: "flex-start",
            opacity: interpolate(frame, [4.6 * fps, 5.2 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
            translate: interpolate(
              frame,
              [4.6 * fps, 5.3 * fps],
              ["-30px 0px", "0px 0px"],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              },
            ),
          }}
        >
          Força de evidência: Alta
        </Interactive.Div>

        <Interactive.Div
          name="Ideia central"
          style={{
            fontFamily: lora,
            fontStyle: "italic",
            fontSize: 42,
            lineHeight: 1.45,
            color: "#F4F1E8",
            borderLeft: "6px solid #C9A227",
            paddingLeft: 30,
            opacity: interpolate(frame, [6 * fps, 6.8 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
          }}
        >
          “Neuromodulação adjuvante pode reduzir sintomas depressivos bipolares
          com segurança aceitável.”
        </Interactive.Div>

        <Interactive.Div
          name="Acesso ao estudo"
          style={{
            fontFamily: inter,
            fontSize: 34,
            fontWeight: 600,
            color: "#7FA394",
            opacity: interpolate(frame, [8 * fps, 8.6 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
          }}
        >
          ACESSO · link para a fonte original
        </Interactive.Div>
      </Interactive.Div>

      <Interactive.Div
        name="Fecho da cena"
        style={{
          fontFamily: inter,
          fontSize: 46,
          fontWeight: 600,
          lineHeight: 1.3,
          color: "#E3C567",
          textAlign: "center",
          maxWidth: 860,
          marginTop: 50,
          opacity: interpolate(frame, [9.4 * fps, 10.1 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        Desenho e força de evidência vêm antes do achado.
      </Interactive.Div>
    </AbsoluteFill>
  );
};
