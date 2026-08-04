import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { inter } from "./fonts";

/** Títulos reais do acervo, usados como enxurrada de fundo. */
const titulos = [
  "Oral Semaglutide for Alcohol Use Disorder: A Randomized Clinical Trial",
  "Neuroinflammatory markers sTREM2 and YKL-40 in association with Alzheimer's disease pathology",
  "Effects of psychosocial stress on opioid self-administration in healthy participants",
  "Association between parental ADHD and adverse offspring outcomes: nationwide Swedish register study",
  "Efficacy and safety of adjunctive transcranial alternating current stimulation in bipolar depression",
  "The neuroimaging correlates of depression established across six large-scale population datasets",
  "Convergent neuroimmune signaling underlying rapid antidepressant response to ketamine and psychedelics",
  "Epigenetics, Posttraumatic Stress Disorder, and the Human Brain",
  "Depression in neurodegenerative disease: neurobiological mechanisms and emerging treatments",
  "Investigating the effect of increased dopamine signaling on cerebral blood flow in Major Depressive Disorder",
  "Translatable electrophysiological and behavioral abnormalities in a humanized model of SYNGAP1-disorder",
  "Autism-like behavior induced by conditional ablation of the Bassoon gene in GABAergic interneurons",
];

export const Scene02Fluxo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      name="Cena 2 — O problema"
      style={{ backgroundColor: "#0A2A20", overflow: "hidden" }}
    >
      <Interactive.Div
        name="Coluna de títulos"
        style={{
          position: "absolute",
          top: 0,
          left: 90,
          width: 900,
          display: "flex",
          flexDirection: "column",
          gap: 34,
          translate: interpolate(
            frame,
            [0, 7 * fps],
            ["0px 200px", "0px -1400px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.4, 0, 0.7, 0.2),
            },
          ),
          opacity: interpolate(frame, [0, 0.5 * fps, 4 * fps, 5.2 * fps], [0, 1, 1, 0.18], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.linear,
          }),
        }}
      >
        {titulos.map((titulo) => (
          <div
            key={titulo}
            style={{
              fontFamily: inter,
              fontSize: 34,
              fontWeight: 400,
              lineHeight: 1.35,
              color: "#7FA394",
              borderLeft: "4px solid #1D4A3A",
              paddingLeft: 28,
            }}
          >
            {titulo}
          </div>
        ))}
      </Interactive.Div>

      <AbsoluteFill
        name="Véu"
        style={{
          background:
            "linear-gradient(180deg, #0A2A20 0%, rgba(10,42,32,0.25) 18%, rgba(10,42,32,0.92) 42%, rgba(10,42,32,0.92) 62%, rgba(10,42,32,0.25) 80%, #0A2A20 100%)",
        }}
      />

      <AbsoluteFill
        name="Afirmação"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 100,
        }}
      >
        <Interactive.Div
          name="Linha 1"
          style={{
            fontFamily: inter,
            fontSize: 88,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: -1.5,
            color: "#F4F1E8",
            textAlign: "center",
            maxWidth: 860,
            opacity: interpolate(frame, [3.6 * fps, 4.3 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
          }}
        >
          O problema não é acesso.
        </Interactive.Div>

        <Interactive.Div
          name="Linha 2"
          style={{
            fontFamily: inter,
            fontSize: 104,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: -2,
            color: "#E3C567",
            textAlign: "center",
            maxWidth: 860,
            marginTop: 28,
            opacity: interpolate(frame, [4.6 * fps, 5.3 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
            scale: interpolate(frame, [4.6 * fps, 5.4 * fps], [0.88, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              output: "perceptual-scale",
            }),
          }}
        >
          É triagem.
        </Interactive.Div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
