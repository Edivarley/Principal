import { Video } from "@remotion/media";
import { AbsoluteFill, Sequence, Series, staticFile } from "remotion";
import { Legenda } from "../NoexisArk/Legenda";
import { PrintComApresentador } from "./componentes/PrintComApresentador";
import { Cautela, Chamada, Gancho, RotuloTela } from "./componentes/Textos";
import {
  type Bloco,
  blocos,
  cautela,
  chamada,
  fecho,
  fonte,
  ganchoAtivo,
  ganchos,
  recortes,
} from "./config";
import { cores } from "./tema";
import { usePunch } from "./usePunch";

const BlocoDeFala: React.FC<{ bloco: Bloco; primeiro: boolean; ultimo: boolean }> =
  ({ bloco, primeiro, ultimo }) => {
    const punch = usePunch(bloco.punches);

    return (
      <AbsoluteFill name={bloco.id}>
        <AbsoluteFill name="Câmera" style={{ overflow: "hidden" }}>
          <Video
            name={bloco.clipe}
            src={staticFile(`media/${bloco.clipe}.mp4`)}
            objectFit="cover"
            style={{
              width: "100%",
              height: "100%",
              scale: punch.scale,
              transformOrigin: punch.transformOrigin,
            }}
          />
        </AbsoluteFill>

        {primeiro ? (
          <Sequence durationInFrames={62} name="Gancho">
            <Gancho texto={ganchos[ganchoAtivo]} />
          </Sequence>
        ) : null}

        {(bloco.prints ?? []).map((p) => (
          <Sequence
            key={p.recorte}
            from={p.de}
            durationInFrames={p.frames}
            name={`Tela · ${p.rotulo}`}
          >
            <PrintComApresentador
              print={p.arquivo}
              de={recortes[p.recorte].de}
              para={recortes[p.recorte].para}
              fonteLargura={fonte.largura}
              fonteAltura={fonte.altura}
              clipe={bloco.clipe}
              desdeFrame={p.de}
            />
            <RotuloTela texto={p.rotulo} apoio={p.apoio} />
          </Sequence>
        ))}

        {ultimo ? (
          <>
            <Sequence
              from={fecho.cautelaDe}
              durationInFrames={fecho.cautelaFrames}
              name="Cautela"
            >
              <Cautela texto={cautela} />
            </Sequence>
            <Sequence from={fecho.chamadaDe} name="Chamada">
              <Chamada
                principal={chamada.principal}
                apoio={chamada.apoio}
                credencial={chamada.credencial}
              />
            </Sequence>
          </>
        ) : null}

        <Legenda clipe={bloco.clipe} />
      </AbsoluteFill>
    );
  };

/**
 * Reel montado sobre os quatro clipes de fala.
 *
 * Tudo que é editável — gancho, textos, tempos, punches e retângulos de zoom —
 * está em `config.ts`. Este arquivo só percorre a configuração.
 */
export const ReelNoexisArk: React.FC = () => {
  return (
    <AbsoluteFill name="Reel Noexis Ark" style={{ backgroundColor: cores.base }}>
      <Series>
        {blocos.map((bloco, i) => (
          <Series.Sequence
            key={bloco.id}
            durationInFrames={bloco.frames}
            name={bloco.id}
          >
            <BlocoDeFala
              bloco={bloco}
              primeiro={i === 0}
              ultimo={i === blocos.length - 1}
            />
          </Series.Sequence>
        ))}
      </Series>
    </AbsoluteFill>
  );
};
