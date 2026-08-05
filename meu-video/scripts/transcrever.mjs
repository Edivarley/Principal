// Transcreve os clipes de fala e grava as legendas.
//
// PRECISA RODAR NA SUA MÁQUINA, não no ambiente do Claude Code: o download do
// modelo sai do Hugging Face, que o proxy de lá bloqueia.
//
// Dois detalhes que decidem o resultado:
//
//   model: "medium"      — e NÃO "medium.en". Os modelos terminados em `.en`
//                          são só inglês. Foi isso que transformou a fala em
//                          "Lava satin" e "Productive cement" no SRT anterior.
//   language: "Portuguese" — o nome por extenso, não o código "pt".
//
// Uso:  node scripts/transcrever.mjs

import {
  downloadWhisperModel,
  installWhisperCpp,
  toCaptions,
  transcribe,
} from "@remotion/install-whisper-cpp";
import fs from "node:fs";
import path from "node:path";
import { rodar } from "./ffmpeg.mjs";

const raiz = process.cwd();
const whisper = path.join(raiz, "whisper.cpp");
const versao = "1.5.5";
const clipes = ["cam1", "cam2", "cam3", "cam4"];

const modelo = "medium";

await installWhisperCpp({ to: whisper, version: versao, printOutput: true });
await downloadWhisperModel({ model: modelo, folder: whisper, printOutput: true });

// O downloader não valida o que recebeu. Se a rede devolver uma página de erro,
// ela é gravada como se fosse o modelo e o whisper morre com "bad magic" — e,
// pior, a execução seguinte vê o arquivo no lugar, pula o download e falha
// igual. O menor modelo tem ~75 MB; qualquer coisa abaixo de 50 MB é lixo.
const arquivoModelo = path.join(whisper, `ggml-${modelo}.bin`);
const tamanho = fs.statSync(arquivoModelo).size;
if (tamanho < 50 * 1024 * 1024) {
  fs.rmSync(arquivoModelo, { force: true });
  const espiada = fs.existsSync(arquivoModelo)
    ? ""
    : `\nO que veio no lugar: ${tamanho} bytes.`;
  throw new Error(
    `O download do modelo falhou — o arquivo tinha ${tamanho} bytes.${espiada}\n` +
      "Já apaguei o arquivo inválido, então é só rodar de novo. Se repetir, o " +
      "acesso a huggingface.co está bloqueado nesta rede.",
  );
}

const resultado = {};

for (const clipe of clipes) {
  const mp4 = path.join(raiz, "public", "media", `${clipe}.mp4`);
  const wav = path.join(raiz, "public", "media", `${clipe}.wav`);

  // whisper.cpp só aceita wav 16 kHz mono.
  rodar(["-y", "-loglevel", "error", "-i", mp4, "-ar", "16000", "-ac", "1", wav]);

  const saida = await transcribe({
    inputPath: wav,
    whisperPath: whisper,
    whisperCppVersion: versao,
    model: modelo,
    language: "Portuguese",
    tokenLevelTimestamps: true,
    printOutput: false,
  });

  const { captions } = toCaptions({ whisperCppOutput: saida });
  resultado[clipe] = captions;
  fs.rmSync(wav, { force: true });
  console.log(`${clipe}: ${captions.length} palavras`);
}

fs.writeFileSync(
  path.join(raiz, "src", "NoexisArk", "legendas.ts"),
  "// Gerado por scripts/transcrever.mjs. Não editar à mão.\n" +
    "//\n" +
    "// Vai como módulo, não como JSON no public/: buscar por fetch exigiria um\n" +
    "// delayRender(), e delayRender pendurado já derrubou este render uma vez.\n\n" +
    'import type { Caption } from "@remotion/captions";\n\n' +
    "export const legendas: Record<string, Caption[]> = " +
    JSON.stringify(resultado, null, 2) +
    ";\n",
);

console.log("\nEscrito em src/NoexisArk/legendas.ts — agora é só renderizar.");
