# Reel — Noexis Ark

Peça para @edivarley. Pilar: ativo do perfil / método de leitura.
Composição: `ReelNoexisArk` · 1080×1920 · 30fps · 1140 frames (38s).

Montado sobre as gravações enviadas: quatro clipes de fala e três capturas de
tela da página.

---

## Estrutura

| Trecho | Frames | Duração | Conteúdo |
|---|---|---|---|
| cam1 | 0–305 | 10,2s | Gancho nos 2,1s iniciais · punch-in a cada ~2,4s |
| cam2 | 305–605 | 10,0s | Tela do acervo em quadro cheio, eu no inset |
| cam3 | 605–923 | 10,6s | Três vistas: por tema, por área clínica, por desenho |
| cam4 | 923–1140 | 7,2s | Cautela, depois "Comenta ARK" e credencial |

Tudo que é editável está em `src/reel/config.ts`: gancho ativo, textos, tempos,
punches e retângulos de zoom. Nenhum desses valores mora dentro de componente.

**Rosto em quadro 100% da duração.** As telas nunca aparecem sozinhas — entram
em quadro cheio com o apresentador num inset circular. O dado da conta é que
reel sem rosto fez 318 reproduções contra 1.315 a 10.974 dos reels com presença
em cena.

**Espaço morto eliminado por construção.** `PrintFocado` calcula a escala como
`max(1080/r.w, 1920/r.h)`, então o retângulo escolhido sempre cobre o quadro.
Custo: com print de origem 1920×1080, cobrir um quadro em pé exige 1,78× de
ampliação no mínimo. Print capturado em retrato e em 2× de densidade zera isso.

## Cadeia de produção

```bash
node scripts/preparar-camera.mjs      # GOP 15 + correção de cor nos clipes
npx remotion render ReelNoexisArk out/reel-noexis-ark.mp4 --concurrency=3
bash scripts/post.sh                  # loudnorm duas passagens + encode final
```

A correção de cor fica nos clipes de câmera, não no export: aplicada no quadro
pronto, derrubaria o verde e o dourado da identidade junto com o dominante da
parede.

O ffmpeg do Remotion e o do Playwright são builds mínimos — sem `eq`,
`colorbalance`, `unsharp`, `loudnorm` nem `volumedetect`. O binário completo vem
de `pip install imageio-ffmpeg`, resolvido em `scripts/ffmpeg.mjs`.

## Legenda

> Você não precisa ler tudo. Precisa de um critério para escolher o que ler.
>
> O Noexis Ark é o acervo que eu mantenho aberto: estudos de psiquiatria e
> neurociência clínica das principais revistas da área, triados e organizados.
>
> Cada registro traz, antes do link:
> · o desenho do estudo (meta-análise, ensaio randomizado, observacional…)
> · a força de evidência atribuída
> · a ideia central em uma frase
>
> E o mesmo acervo abre por três entradas: tema, área clínica e desenho
> metodológico. A terceira é a que mais me interessa — ler por desenho é o que
> treina leitura crítica. Quando você compara dez observacionais seguidos,
> começa a enxergar o que aquele desenho sustenta e o que ele não sustenta.
>
> O que ele é: um mapa de leitura, ponto de partida para a fonte primária.
> O que ele não é: recomendação clínica, protocolo ou substituto do artigo
> original. As classificações de desenho e força de evidência são auxílio de
> leitura — a fonte primária prevalece sempre.
>
> Link na bio.
>
> Dr. Edivarley Costa Jr. · Médico Psiquiatra · CRM 42763 · RQE 25989
> Mestre em Psiquiatria (UNIFESP) · Professor de Pós-Graduação (PUC-Toledo)

## Hashtags

Conjunto fixo proposto para o pilar de método (8 tags, sem improviso a cada
post — a conta hoje tem 95 tags distintas em 28 publicações, o que impede ler
desempenho por campo semântico):

```
#psiquiatria #psiquiatriabaseadaemevidencia #residenciamedica
#residenciaempsiquiatria #medicinabaseadaemevidencias #neurociencia
#psicofarmacologia #leituracritica
```

## O que não vai em tela

Nenhuma contagem de estudos. O acervo cresce, e um número queimado no vídeo
envelhece sozinho — quem abrir o link depois vê outro valor.

Também não aparece "atualizado diariamente". Na conferência de 04/08/2026 a
última entrada era de 30/07, com os cenários do Make ativos: o que não promoveu
nada foi o filtro `Score Científico > 70`. Se o intervalo persistir, vale
conferir o filtro antes de prometer cadência diária para um público que abre o
link.

## Renderizar

```bash
npx remotion render ReelNoexisArk out/reel-noexis-ark.mp4 --concurrency=4
```

As fontes ficam embutidas como data URI em `src/fontes.css`, gerado a partir de
`public/fonts/*.woff2`. Não é decoração: o renderizador não alcança o CDN do
Google Fonts, e carregar por `@remotion/fonts` — servindo por HTTP ou como data
URI — deixava o `delayRender()` da fonte pendurado até estourar o tempo limite,
em quadros diferentes a cada execução. Declarada em CSS, a fonte sai do caminho
crítico do render.

`public/media/` e `media-fonte/` estão no `.gitignore` — são ~75 MB de vídeo, o
repositório guarda só o código.
