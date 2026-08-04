import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { AbsoluteFill } from "remotion";
import { Scene01Hook } from "./Scene01Hook";
import { Scene02Fluxo } from "./Scene02Fluxo";
import { Scene03Acervo } from "./Scene03Acervo";
import { Scene04Registro } from "./Scene04Registro";
import { Scene05Portas } from "./Scene05Portas";
import { Scene06Cautela } from "./Scene06Cautela";
import { Scene07Cta } from "./Scene07Cta";

export const ReelNoexisArk: React.FC<{
  hookSrc: string;
  ctaSrc: string;
}> = ({ hookSrc, ctaSrc }) => {
  return (
    <AbsoluteFill name="Reel Noexis Ark" style={{ backgroundColor: "#0A2A20" }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={180} name="Gancho">
          <Scene01Hook hookSrc={hookSrc} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 15 })}
        />

        <TransitionSeries.Sequence durationInFrames={210} name="O problema">
          <Scene02Fluxo />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 15 })}
        />

        <TransitionSeries.Sequence durationInFrames={270} name="O acervo">
          <Scene03Acervo />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 15 })}
        />

        <TransitionSeries.Sequence durationInFrames={360} name="Um registro">
          <Scene04Registro />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 15 })}
        />

        <TransitionSeries.Sequence durationInFrames={270} name="Três entradas">
          <Scene05Portas />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 15 })}
        />

        <TransitionSeries.Sequence durationInFrames={150} name="Cautela">
          <Scene06Cautela />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 15 })}
        />

        <TransitionSeries.Sequence durationInFrames={180} name="Chamada">
          <Scene07Cta ctaSrc={ctaSrc} />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
