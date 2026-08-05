// Resolve um ffmpeg completo.
//
// O ffmpeg que vem com o Remotion e o que vem com o Playwright são builds
// mínimos — têm crop, scale e trim, e só. Faltam `eq`, `colorbalance`,
// `unsharp`, `loudnorm`, `acompressor` e `volumedetect`, que são justamente os
// filtros da correção de cor e da normalização de áudio.
//
// O binário completo vem do pacote `imageio-ffmpeg` do PyPI, que empacota um
// ffmpeg estático. Instale com:  pip install imageio-ffmpeg

import { execFileSync } from "node:child_process";

export const ffmpeg = (() => {
  try {
    return execFileSync(
      "python3",
      ["-c", "import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())"],
      { encoding: "utf8" },
    ).trim();
  } catch {
    throw new Error(
      "ffmpeg completo não encontrado. Rode: pip install imageio-ffmpeg",
    );
  }
})();

export const rodar = (args) =>
  execFileSync(ffmpeg, ["-hide_banner", ...args], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    maxBuffer: 64 * 1024 * 1024,
  });
