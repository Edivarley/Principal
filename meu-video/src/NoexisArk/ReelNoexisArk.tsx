import { Video } from "@remotion/media";
import { AbsoluteFill, Sequence, Series, staticFile } from "remotion";
import { Broll } from "./Broll";
import { Legenda } from "./Legenda";
import { Revistas } from "./Revistas";
import { Cautela, Chamada, Gancho } from "./Sobreposicoes";

/**
 * Reel montado sobre as gravações reais.
 *
 * A espinha são os quatro clipes de fala, tocados em sequência — o áudio vem
 * deles. As vistas da página entram por cima, mudas: o vídeo da fala continua
 * montado por baixo, então a fala não é interrompida.
 *
 * `falas` define a ordem narrativa. Trocar a ordem aqui reordena o reel
 * inteiro sem mexer em mais nada.
 */
export const ReelNoexisArk: React.FC<{
  falas: string[];
}> = ({ falas }) => {
  return (
    <AbsoluteFill name="Reel Noexis Ark" style={{ backgroundColor: "#07201A" }}>
      <Series>
        <Series.Sequence durationInFrames={305} name="Fala 1 — abertura">
          <Video
            name="Fala 1"
            src={staticFile(`media/${falas[0]}.mp4`)}
            objectFit="cover"
            style={{ width: "100%", height: "100%" }}
          />
          <Sequence durationInFrames={110} name="Gancho">
            <Gancho />
          </Sequence>
          <Legenda clipe={falas[0]} />
        </Series.Sequence>

        <Series.Sequence durationInFrames={300} name="Fala 2 — o acervo">
          <Video
            name="Fala 2"
            src={staticFile(`media/${falas[1]}.mp4`)}
            objectFit="cover"
            style={{ width: "100%", height: "100%" }}
          />
          <Sequence from={8} durationInFrames={92} name="Revistas">
            <Revistas />
          </Sequence>
          <Sequence from={112} durationInFrames={155} name="B-roll acervo">
            <Broll
              src="media/vistas/acervo.png"
              rotulo="Cada registro responde antes do PDF"
              legenda="desenho · força de evidência · ideia central · fonte"
              zoom={2.8}
              focoX="130%"
              focoY="76%"
            />
          </Sequence>
          <Legenda clipe={falas[1]} />
        </Series.Sequence>

        <Series.Sequence durationInFrames={318} name="Fala 3 — as entradas">
          <Video
            name="Fala 3"
            src={staticFile(`media/${falas[2]}.mp4`)}
            objectFit="cover"
            style={{ width: "100%", height: "100%" }}
          />
          <Sequence from={8} durationInFrames={130} name="B-roll por tema">
            <Broll
              src="media/vistas/tema.png"
              rotulo="Por tema"
              legenda="neurobiologia · psicofarmacologia · psicopatologia…"
              zoom={2.1}
              focoX="52%"
              focoY="80%"
            />
          </Sequence>
          <Sequence from={160} durationInFrames={150} name="B-roll por desenho">
            <Broll
              src="media/vistas/desenho.png"
              rotulo="Por desenho do estudo"
              legenda="meta-análise · ensaio randomizado · observacional…"
              zoom={2.1}
              focoX="52%"
              focoY="70%"
            />
          </Sequence>
          <Legenda clipe={falas[2]} />
        </Series.Sequence>

        <Series.Sequence durationInFrames={217} name="Fala 4 — chamada">
          <Video
            name="Fala 4"
            src={staticFile(`media/${falas[3]}.mp4`)}
            objectFit="cover"
            style={{ width: "100%", height: "100%" }}
          />
          <Sequence durationInFrames={95} name="Cautela">
            <Cautela />
          </Sequence>
          <Sequence from={100} name="Chamada">
            <Chamada />
          </Sequence>
          <Legenda clipe={falas[3]} />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
