// Prepara os clipes de câmera para a composição.
//
// Duas coisas, ambas resolvidas aqui e não no export:
//
// 1. GOP curto (-g 15). Os arquivos originais trazem um keyframe a cada 250
//    frames — 8,3 segundos. Com isso o scrubbing no studio fica lento e o
//    render pode dessincronizar áudio e vídeo.
//
// 2. Correção de cor. A parede verde puxa a pele para oliva. A correção vai
//    nos clipes de câmera, nunca no export final: aplicada no quadro pronto,
//    ela derrubaria também o verde e o dourado da identidade, que são cor
//    chapada de marca e não dominante a corrigir.
//
// Uso: node scripts/preparar-camera.mjs

import fs from "node:fs";
import path from "node:path";
import { rodar } from "./ffmpeg.mjs";

const raiz = process.cwd();
const origem = path.join(raiz, "public", "media");

const grade = [
  "eq=brightness=0.04:contrast=1.10:saturation=1.06",
  "colorbalance=rs=0.04:gs=-0.03:bs=0.01:rm=0.03:gm=-0.04:bm=0.02",
  "unsharp=luma_msize_x=5:luma_msize_y=5:luma_amount=0.5:chroma_msize_x=5:chroma_msize_y=5:chroma_amount=0.0",
].join(",");

for (const [i, entrada] of ["fala1", "fala2", "fala3", "fala4"].entries()) {
  const de = path.join(origem, `${entrada}.mp4`);
  const para = path.join(origem, `cam${i + 1}.mp4`);
  if (!fs.existsSync(de)) {
    console.error(`faltando: ${path.relative(raiz, de)}`);
    process.exit(1);
  }
  rodar([
    "-y",
    "-loglevel", "error",
    "-i", de,
    "-vf", grade,
    "-c:v", "libx264",
    "-crf", "16",
    "-preset", "slow",
    "-g", "15",
    "-keyint_min", "15",
    "-sc_threshold", "0",
    "-pix_fmt", "yuv420p",
    "-c:a", "aac",
    "-b:a", "192k",
    "-ar", "48000",
    para,
  ]);
  console.log(`cam${i + 1}.mp4  ←  ${entrada}.mp4`);
}
