import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { inter } from "../../NoexisArk/fonts";
import { cores, zonaSegura } from "../tema";

/** Gancho de abertura — sem véu de quadro inteiro, para não apagar o rosto. */
export const Gancho: React.FC<{ texto: string }> = ({ texto }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill name="Gancho">
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 760,
          background:
            "linear-gradient(180deg, rgba(14,32,24,0.92) 0%, rgba(14,32,24,0.78) 42%, rgba(14,32,24,0) 100%)",
          opacity: interpolate(
            frame,
            [0, 4, durationInFrames - 12, durationInFrames],
            [0, 1, 1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
        }}
      />
      <div
        style={{
          position: "absolute",
          top: zonaSegura.topo + 40,
          left: zonaSegura.lateral,
          width: 1080 - zonaSegura.lateral * 2,
          fontFamily: inter,
          fontSize: 86,
          fontWeight: 700,
          lineHeight: 1.06,
          letterSpacing: -2.5,
          color: cores.texto,
          textAlign: "center",
          opacity: interpolate(
            frame,
            [0, 8, durationInFrames - 12, durationInFrames],
            [0, 1, 1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
          translate: interpolate(frame, [0, 14], ["0px 26px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        {texto}
      </div>
    </AbsoluteFill>
  );
};

/** Rótulo sobre a tela, no topo do quadro, fora da zona da interface. */
export const RotuloTela: React.FC<{ texto: string; apoio?: string }> = ({
  texto,
  apoio,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill name="Rótulo da tela">
      {/* A tela do Notion é branca: sem esta faixa o rótulo dourado some. */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 560,
          background:
            "linear-gradient(180deg, rgba(14,32,24,0.96) 0%, rgba(14,32,24,0.9) 55%, rgba(14,32,24,0) 100%)",
          opacity: interpolate(frame, [0, 6], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      />
      <div
        style={{
          position: "absolute",
          top: zonaSegura.topo + 20,
          left: zonaSegura.lateral,
          width: 1080 - zonaSegura.lateral * 2,
          fontFamily: inter,
          fontSize: 52,
          fontWeight: 700,
          lineHeight: 1.2,
          letterSpacing: -1,
          color: cores.dourado,
          textAlign: "center",
          textShadow: "0 6px 28px rgba(0,0,0,0.85)",
          opacity: interpolate(frame, [2, 0.6 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          translate: interpolate(frame, [2, 0.7 * fps], ["0px 18px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        {texto}
      </div>

      {apoio ? (
        <div
          style={{
            position: "absolute",
            top: zonaSegura.topo + 110,
            left: zonaSegura.lateral,
            width: 1080 - zonaSegura.lateral * 2,
            fontFamily: inter,
            fontSize: 34,
            fontWeight: 600,
            lineHeight: 1.3,
            color: cores.texto,
            textAlign: "center",
            textShadow: "0 4px 20px rgba(0,0,0,0.9)",
            opacity: interpolate(frame, [0.5 * fps, 1.1 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
          }}
        >
          {apoio}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

/** Faixa de cautela — obrigatória em toda peça derivada de estudo. */
export const Cautela: React.FC<{ texto: string }> = ({ texto }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  return (
    <div
      style={{
        position: "absolute",
        top: 1120,
        left: zonaSegura.lateral - 10,
        width: 1080 - (zonaSegura.lateral - 10) * 2,
        backgroundColor: "rgba(14,32,24,0.92)",
        border: `2px solid ${cores.borda}`,
        borderRadius: 24,
        padding: 32,
        fontFamily: inter,
        fontSize: 38,
        fontWeight: 600,
        lineHeight: 1.35,
        color: cores.texto,
        textAlign: "center",
        opacity: interpolate(
          frame,
          [0, 0.4 * fps, durationInFrames - 10, durationInFrames],
          [0, 1, 1, 0],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          },
        ),
      }}
    >
      {texto}
    </div>
  );
};

/** Chamada final: comentário com palavra-chave, não clique em link. */
export const Chamada: React.FC<{
  principal: string;
  apoio: string;
  credencial: string;
}> = ({ principal, apoio, credencial }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill name="Chamada">
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 820,
          background:
            "linear-gradient(180deg, rgba(14,32,24,0.9) 0%, rgba(14,32,24,0.7) 45%, rgba(14,32,24,0) 100%)",
          opacity: interpolate(frame, [0, 0.4 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      />

      <div
        style={{
          position: "absolute",
          top: zonaSegura.topo + 60,
          left: zonaSegura.lateral,
          width: 1080 - zonaSegura.lateral * 2,
          fontFamily: inter,
          fontSize: 120,
          fontWeight: 700,
          letterSpacing: -3,
          color: cores.dourado,
          textAlign: "center",
          textShadow: "0 10px 44px rgba(0,0,0,0.9)",
          opacity: interpolate(frame, [0, 0.5 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          scale: interpolate(frame, [0, 0.8 * fps], [0.9, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            output: "perceptual-scale",
          }),
        }}
      >
        {principal}
      </div>

      <div
        style={{
          position: "absolute",
          top: zonaSegura.topo + 200,
          left: zonaSegura.lateral + 30,
          width: 1080 - (zonaSegura.lateral + 30) * 2,
          fontFamily: inter,
          fontSize: 46,
          fontWeight: 600,
          lineHeight: 1.3,
          color: cores.texto,
          textAlign: "center",
          textShadow: "0 6px 30px rgba(0,0,0,0.9)",
          opacity: interpolate(frame, [0.5 * fps, 1.1 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        {apoio}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: zonaSegura.base + 20,
          left: zonaSegura.lateral,
          width: 1080 - zonaSegura.lateral * 2,
          fontFamily: inter,
          fontSize: 26,
          fontWeight: 600,
          lineHeight: 1.4,
          color: cores.texto,
          textAlign: "center",
          opacity: interpolate(frame, [1 * fps, 1.7 * fps], [0, 0.6], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          textShadow: "0 4px 20px rgba(0,0,0,0.95)",
        }}
      >
        {credencial}
      </div>
    </AbsoluteFill>
  );
};
