import { Composition, Folder } from "remotion";
import "./index.css";
import { ReelNoexisArk } from "./NoexisArk/ReelNoexisArk";
import { Scene01Hook } from "./NoexisArk/Scene01Hook";
import { Scene02Fluxo } from "./NoexisArk/Scene02Fluxo";
import { Scene03Acervo } from "./NoexisArk/Scene03Acervo";
import { Scene04Registro } from "./NoexisArk/Scene04Registro";
import { Scene05Portas } from "./NoexisArk/Scene05Portas";
import { Scene06Cautela } from "./NoexisArk/Scene06Cautela";
import { Scene07Cta } from "./NoexisArk/Scene07Cta";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ReelNoexisArk"
        component={ReelNoexisArk}
        durationInFrames={1530}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ hookSrc: "", ctaSrc: "" }}
      />

      <Folder name="Cenas">
        <Composition
          id="Cena01-Gancho"
          component={Scene01Hook}
          durationInFrames={180}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{ hookSrc: "" }}
        />
        <Composition
          id="Cena02-Problema"
          component={Scene02Fluxo}
          durationInFrames={210}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Cena03-Acervo"
          component={Scene03Acervo}
          durationInFrames={270}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Cena04-Registro"
          component={Scene04Registro}
          durationInFrames={360}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Cena05-Entradas"
          component={Scene05Portas}
          durationInFrames={270}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Cena06-Cautela"
          component={Scene06Cautela}
          durationInFrames={150}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Cena07-Chamada"
          component={Scene07Cta}
          durationInFrames={180}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{ ctaSrc: "" }}
        />
      </Folder>
    </>
  );
};
