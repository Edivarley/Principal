import { Composition, Folder } from "remotion";
import "./index.css";
import { ReelNoexisArk } from "./reel/ReelNoexisArk";
import { Scene02Fluxo } from "./NoexisArk/Scene02Fluxo";
import { Scene03Acervo } from "./NoexisArk/Scene03Acervo";
import { Scene04Registro } from "./NoexisArk/Scene04Registro";
import { Scene05Portas } from "./NoexisArk/Scene05Portas";
import { Scene06Cautela } from "./NoexisArk/Scene06Cautela";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ReelNoexisArk"
        component={ReelNoexisArk}
        durationInFrames={1140}
        fps={30}
        width={1080}
        height={1920}
      />

      <Folder name="Cartoes">
        <Composition
          id="Cartao-Problema"
          component={Scene02Fluxo}
          durationInFrames={210}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Cartao-Acervo"
          component={Scene03Acervo}
          durationInFrames={270}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Cartao-Registro"
          component={Scene04Registro}
          durationInFrames={360}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Cartao-Entradas"
          component={Scene05Portas}
          durationInFrames={270}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Cartao-Cautela"
          component={Scene06Cautela}
          durationInFrames={150}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>
    </>
  );
};
