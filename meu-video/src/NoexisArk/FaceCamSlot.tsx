import { Video } from "@remotion/media";
import { AbsoluteFill, Interactive, staticFile } from "remotion";
import { inter } from "./fonts";

/**
 * Reserva o trecho gravado com o Edivarley em cena.
 *
 * Enquanto `src` estiver vazio, renderiza uma marcação de gravação.
 * Para usar o vídeo real: coloque o arquivo em `public/` e preencha
 * `hookSrc` / `ctaSrc` nos defaultProps da composição.
 */
export const FaceCamSlot: React.FC<{
  src: string;
  etiqueta: string;
  fala: string;
}> = ({ src, etiqueta, fala }) => {
  if (src !== "") {
    return (
      <Video
        name="Gravação em cena"
        src={staticFile(src)}
        objectFit="cover"
        style={{ width: "100%", height: "100%" }}
      />
    );
  }

  return (
    <AbsoluteFill
      name="Marcação de gravação"
      style={{
        backgroundColor: "#0A2A20",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 100,
      }}
    >
      <Interactive.Div
        name="Moldura"
        style={{
          position: "absolute",
          top: 250,
          left: 90,
          width: 900,
          height: 1350,
          border: "6px dashed #2F5B4A",
          borderRadius: 32,
        }}
      />
      <Interactive.Div
        name="Etiqueta do slot"
        style={{
          position: "absolute",
          top: 1010,
          left: 150,
          width: 780,
          fontFamily: inter,
          fontSize: 40,
          fontWeight: 700,
          letterSpacing: 6,
          color: "#C9A227",
          textAlign: "center",
        }}
      >
        {etiqueta}
      </Interactive.Div>
      <Interactive.Div
        name="Fala sugerida"
        style={{
          position: "absolute",
          top: 1090,
          left: 150,
          width: 780,
          fontFamily: inter,
          fontSize: 44,
          fontWeight: 400,
          lineHeight: 1.45,
          color: "#F4F1E8",
          textAlign: "center",
        }}
      >
        {fala}
      </Interactive.Div>
    </AbsoluteFill>
  );
};
