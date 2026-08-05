import { createTikTokStyleCaptions, type TikTokPage } from "@remotion/captions";
import { useMemo } from "react";
import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { inter } from "./fonts";
import { legendas } from "./legendas";

/**
 * Legenda queimada, no padrão de leitura vertical.
 *
 * Fica acima dos 320px de baixo, que a interface do Instagram cobre com
 * legenda e botões.
 */

const Pagina: React.FC<{ page: TikTokPage }> = ({ page }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill name="Página de legenda">
      <Interactive.Div
        name="Bloco da legenda"
        style={{
          position: "absolute",
          bottom: 360,
          left: 70,
          width: 940,
          fontFamily: inter,
          fontSize: 56,
          fontWeight: 700,
          lineHeight: 1.25,
          letterSpacing: -0.5,
          color: "#F4F1E8",
          textAlign: "center",
          whiteSpace: "pre-wrap",
          textShadow: "0 6px 26px rgba(0,0,0,0.95), 0 2px 8px rgba(0,0,0,0.9)",
          scale: interpolate(frame, [0, 4], [0.97, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            output: "perceptual-scale",
          }),
        }}
      >
        {page.tokens.map((token) => (
          <span
            key={`${token.fromMs}-${token.text}`}
            style={{
              color:
                page.startMs + (frame / fps) * 1000 >= token.fromMs &&
                page.startMs + (frame / fps) * 1000 < token.toMs
                  ? "#E3C567"
                  : "#F4F1E8",
            }}
          >
            {token.text}
          </span>
        ))}
      </Interactive.Div>
    </AbsoluteFill>
  );
};

export const Legenda: React.FC<{ clipe: string }> = ({ clipe }) => {
  const { fps } = useVideoConfig();

  const { pages } = useMemo(
    () =>
      createTikTokStyleCaptions({
        captions: legendas[clipe] ?? [],
        combineTokensWithinMilliseconds: 1100,
      }),
    [clipe],
  );

  return (
    <AbsoluteFill name="Legenda">
      {pages.map((page, index) => {
        const nextPage = pages[index + 1] ?? null;
        const startFrame = (page.startMs / 1000) * fps;
        const endFrame = Math.min(
          nextPage ? (nextPage.startMs / 1000) * fps : Infinity,
          startFrame + (1100 / 1000) * fps,
        );
        if (endFrame - startFrame <= 0) {
          return null;
        }
        return (
          <Sequence
            key={page.startMs}
            from={startFrame}
            durationInFrames={endFrame - startFrame}
            name={`Legenda ${index + 1}`}
          >
            <Pagina page={page} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
