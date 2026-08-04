# Reel — Noexis Ark

Peça para @edivarley. Pilar: ativo do perfil / método de leitura.
Composição: `ReelNoexisArk` · 1080×1920 · 30fps · 1530 frames (51s).

---

## Estrutura

| Cena | Frames | Duração | Conteúdo |
|---|---|---|---|
| 1 — Gancho | 0–180 | 6s | **Gravado** · pergunta em tela + "211 estudos já triados" |
| 2 — O problema | 165–375 | 7s | Enxurrada de títulos reais → "O problema não é acesso. É triagem." |
| 3 — O acervo | 360–630 | 9s | Nome, descrição, contador 211, abas, cadência |
| 4 — Um registro | 615–975 | 12s | Anatomia de um registro, campo a campo |
| 5 — Três entradas | 960–1230 | 9s | Tema · área clínica · desenho do estudo |
| 6 — Cautela | 1215–1365 | 5s | O que o acervo é e o que não é |
| 7 — Chamada | 1350–1530 | 6s | **Gravado** · link na bio + assinatura CRM/RQE |

As cenas 1 e 7 são marcações de gravação. Sem elas o reel fica sem presença
física — o formato que, na linha de base do perfil, ficou em 318 reproduções
contra 1.315–10.974 dos reels com rosto.

## Como inserir os trechos gravados

1. Grave os dois trechos em 9:16 (o texto das marcações traz a fala sugerida).
2. Salve como `public/hook.mp4` e `public/cta.mp4`.
3. No Studio, abra `ReelNoexisArk` e preencha `hookSrc` e `ctaSrc` no painel de
   props — ou edite os `defaultProps` em `src/Root.tsx`:

```tsx
defaultProps={{ hookSrc: "hook.mp4", ctaSrc: "cta.mp4" }}
```

4. Renderize:

```bash
npx remotion render ReelNoexisArk out/reel-noexis-ark.mp4
```

Sobreposições e assinatura ficam por cima do vídeo automaticamente.

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

## Dados exibidos em tela

Levantados no acervo em **04/08/2026**. Confira antes de publicar:

- **211** estudos, entradas de 09/01/2026 a 30/07/2026
- **10 revistas monitoradas** — a tela diz "monitoramento diário · 10 revistas",
  que descreve a captação (10 cenários ativos no Make), não o acervo. Com
  registro, hoje, são **7**: Molecular Psychiatry (107), Nature Mental Health
  (26), Biological Psychiatry (23), JAMA Psychiatry (20), American Journal of
  Psychiatry (15), World Psychiatry (12), Neuropsychopharmacology (8).
  Lancet Psychiatry, The Lancet e NEJM estão configuradas e nunca entraram.
- Última entrada em 30/07 — cinco dias antes desta montagem. Os cenários estão
  ativos, então o que não promoveu nada foi o filtro `Score Científico > 70`.
  Vale conferir antes de publicar: se o intervalo aumentar, "monitoramento
  diário" fica frágil diante de quem abre o link.

Estudo usado como exemplo na cena 4 (registro real do acervo):
*Efficacy and safety of adjunctive transcranial alternating current stimulation
in bipolar depression* · Molecular Psychiatry · Ensaio Clínico Randomizado ·
força de evidência Alta.
