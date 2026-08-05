// Gera as legendas a partir do texto falado em cada clipe.
//
// Não há transcrição automática nesta máquina: os modelos de ASR vivem em
// hosts que o proxy bloqueia. O texto vem à mão, em `roteiro.json`, e este
// script cuida da temporização.
//
// Como a temporização é derivada:
//   1. `ffmpeg silencedetect` acha os silêncios de cada clipe, o que separa o
//      áudio em blocos contínuos de fala.
//   2. O texto do clipe é dividido em blocos na mesma proporção — cada bloco
//      de fala recebe uma fatia do texto proporcional ao seu peso silábico.
//   3. Dentro de cada bloco, cada palavra recebe uma fatia proporcional ao seu
//      número de sílabas, não de caracteres: em português a sílaba prevê a
//      duração melhor que a letra ("psiquiatria" tem 11 letras e 4 sílabas).
//
// Não é alinhamento forçado e não vai ficar perfeito no milissegundo. Fica bom
// o suficiente para legenda de leitura, que é o objetivo.
//
// Uso: node scripts/gerar-legendas.mjs

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const raiz = process.cwd();
const roteiro = JSON.parse(
  fs.readFileSync(path.join(raiz, "scripts", "roteiro.json"), "utf8"),
);

/** Conta sílabas de forma aproximada: grupos de vogais, com ditongos juntos. */
const silabas = (palavra) => {
  const limpa = palavra
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z]/g, "");
  if (limpa === "") return 1;
  const grupos = limpa.match(/[aeiou]+/g);
  return grupos ? Math.max(1, grupos.length) : 1;
};

/** Blocos de fala contínua, deduzidos dos silêncios detectados. */
const blocosDeFala = (arquivo) => {
  const saida = execFileSync(
    "npx",
    [
      "remotion",
      "ffmpeg",
      "-y",
      "-hide_banner",
      "-i",
      arquivo,
      "-af",
      "silencedetect=noise=-32dB:d=0.28",
      "-f",
      "wav",
      "/dev/null",
    ],
    { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] },
  );
  const texto = saida.toString();

  const duracao = Number(
    /Duration: (\d+):(\d+):([\d.]+)/.exec(texto)?.slice(1).reduce(
      (acc, v, i) => acc + Number(v) * [3600, 60, 1][i],
      0,
    ) ?? 0,
  );

  const marcas = [...texto.matchAll(/silence_(start|end): ([\d.]+)/g)].map(
    (m) => ({ tipo: m[1], t: Number(m[2]) }),
  );

  const blocos = [];
  let inicio = 0;
  for (const marca of marcas) {
    if (marca.tipo === "start") {
      if (marca.t - inicio > 0.35) blocos.push([inicio, marca.t]);
    } else {
      inicio = marca.t;
    }
  }
  if (duracao - inicio > 0.35) blocos.push([inicio, duracao]);
  return blocos;
};

const legendasDoClipe = (arquivo, texto) => {
  const blocos = blocosDeFala(arquivo);
  const palavras = texto.trim().split(/\s+/).filter(Boolean);
  const pesos = palavras.map(silabas);
  const pesoTotal = pesos.reduce((a, b) => a + b, 0);

  // Reparte as palavras entre os blocos, proporcionalmente à duração de cada um.
  const duracaoTotal = blocos.reduce((a, [i, f]) => a + (f - i), 0);
  const fatias = [];
  let cursor = 0;
  blocos.forEach(([ini, fim], idx) => {
    const alvo =
      idx === blocos.length - 1
        ? pesoTotal
        : (pesoTotal * (fim - ini)) / duracaoTotal;
    let acumulado = 0;
    const desteBloco = [];
    while (
      cursor < palavras.length &&
      (idx === blocos.length - 1 || acumulado < alvo)
    ) {
      desteBloco.push(cursor);
      acumulado += pesos[cursor];
      cursor += 1;
    }
    fatias.push({ ini, fim, indices: desteBloco });
  });

  const legendas = [];
  for (const { ini, fim, indices } of fatias) {
    if (indices.length === 0) continue;
    const pesoBloco = indices.reduce((a, i) => a + pesos[i], 0);
    let t = ini;
    for (const i of indices) {
      const dur = ((fim - ini) * pesos[i]) / pesoBloco;
      legendas.push({
        // O espaço vai colado na palavra: as legendas são sensíveis a espaço em
        // branco e o componente renderiza com `whiteSpace: "pre"`.
        text: legendas.length === 0 ? palavras[i] : ` ${palavras[i]}`,
        startMs: Math.round(t * 1000),
        endMs: Math.round((t + dur) * 1000),
        timestampMs: Math.round((t + dur / 2) * 1000),
        confidence: null,
      });
      t += dur;
    }
  }
  return legendas;
};

const resultado = {};
for (const [clipe, texto] of Object.entries(roteiro)) {
  const arquivo = path.join(raiz, "public", "media", `${clipe}.mp4`);
  resultado[clipe] = legendasDoClipe(arquivo, texto);
  const n = resultado[clipe].length;
  console.log(`${clipe}: ${n} palavras temporizadas`);
}

const destino = path.join(raiz, "src", "NoexisArk", "legendas.ts");
fs.writeFileSync(
  destino,
  "// Gerado por scripts/gerar-legendas.mjs a partir de scripts/roteiro.json.\n" +
    "// Não editar à mão — reexecute o script depois de mudar o roteiro.\n" +
    "//\n" +
    "// Vai como módulo, não como JSON no public/: buscar por fetch exigiria um\n" +
    "// delayRender(), e delayRender pendurado já derrubou este render uma vez.\n\n" +
    'import type { Caption } from "@remotion/captions";\n\n' +
    "export const legendas: Record<string, Caption[]> = " +
    JSON.stringify(resultado, null, 2) +
    ";\n",
);
console.log(`\nEscrito em ${path.relative(raiz, destino)}`);
