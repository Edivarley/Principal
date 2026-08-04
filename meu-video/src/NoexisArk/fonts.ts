/**
 * As famílias são declaradas em `src/fontes.css`, com os arquivos .woff2
 * embutidos como data URI.
 *
 * Duas tentativas anteriores não sobreviveram ao render: o CDN do Google Fonts
 * é inalcançável pelo renderizador, e carregar via `@remotion/fonts` — servindo
 * o arquivo por HTTP ou como data URI — deixava o `delayRender()` da fonte
 * pendurado até estourar o tempo limite, em quadros variáveis a cada execução.
 * Declarada em CSS, a fonte não entra no caminho crítico do render.
 */
export const inter = "Inter";
export const lora = "Lora";
