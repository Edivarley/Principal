# Reel — Noexis Ark

Peça para @edivarley. Pilar: ativo do perfil / método de leitura.
Composição: `ReelNoexisArk` · 1080×1920 · 30fps · 1140 frames (38s).

Montado sobre as gravações enviadas: quatro clipes de fala e três capturas de
tela da página.

---

## Estrutura

| Trecho | Frames | Duração | Conteúdo |
|---|---|---|---|
| Fala 1 | 0–305 | 10,2s | Sobreposição do gancho nos 3,7s iniciais |
| Fala 2 | 305–605 | 10,0s | B-roll do acervo (tabela) entre 2,3s e 7,8s |
| Fala 3 | 605–923 | 10,6s | Três B-rolls: por tema, por área clínica, por desenho |
| Fala 4 | 923–1140 | 7,2s | Faixa de cautela, depois "link na bio" e assinatura |

O áudio vem inteiro dos clipes de fala. As vistas da página entram por cima,
mudas — o vídeo da fala continua montado por baixo, então a fala nunca é
cortada.

## Ordem dos clipes

`fala1…fala4` correspondem a `Video_Project_7, 8, 9, 10`, na ordem numérica dos
arquivos. **Não consegui verificar essa ordem**: não tenho transcrição de áudio
nesta sessão, então não sei o que é dito em cada clipe.

Se a ordem narrativa for outra, troque a prop `falas` em `src/Root.tsx` — é só
isso, o reel inteiro se reordena:

```tsx
defaultProps={{ falas: ["fala3", "fala1", "fala2", "fala4"] }}
```

O que depende da ordem estar certa: o gancho aparece sobre o primeiro clipe e a
chamada sobre o último. Se o clipe do "link na bio" não for o último, essas
sobreposições caem no lugar errado.

## Origem dos arquivos

| No projeto | Enviado | Uso |
|---|---|---|
| `public/media/fala1.mp4` | Video_Project_7 | espinha |
| `public/media/fala2.mp4` | Video_Project_8 | espinha |
| `public/media/fala3.mp4` | Video_Project_9 | espinha |
| `public/media/fala4.mp4` | Video_Project_10 | espinha |
| `public/media/vistas/acervo.png` | Video_Project_3 @ 4s | B-roll |
| `public/media/vistas/tema.png` | Video_Project_4 @ 1,5s | B-roll |
| `public/media/vistas/desenho.png` | Video_Project_4 @ 8s | B-roll |
| `public/media/vistas/area.png` | Video_Project_5 @ 6s | B-roll |

Os clipes de fala vieram em 1920×1080 com o conteúdo 9:16 no centro; foram
recortados em 608×1080 e a composição os amplia para 1080×1920.

**As gravações de tela viraram quadros congelados, não vídeo.** As capturas
rolam a página, e em qualquer recorte de 3 segundos a vista anunciada pelo
rótulo saía de quadro. Congelado, o que aparece é sempre a aba certa, com uma
leve aproximação para dar movimento. Os `.mp4` originais das telas ficaram em
`media-fonte/`, fora do bundle.

## Resolução

Os clipes de fala têm 608×1080 úteis e são ampliados para 1080×1920 — dá para
notar suavização. Se o projeto de origem for reexportado em 1080×1920 nativo, é
só substituir os arquivos em `public/media/` e renderizar de novo; a composição
não muda.

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
