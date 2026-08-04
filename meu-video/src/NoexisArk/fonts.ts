import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

/**
 * Fontes servidas do próprio projeto (`public/fonts/`).
 *
 * O renderizador roda sem acesso ao CDN do Google Fonts, então os arquivos
 * ficam versionados aqui — o render funciona offline e sempre com o mesmo
 * desenho de letra.
 */
export const inter = "Inter";
export const lora = "Lora";

await Promise.all([
  loadFont({
    family: "Inter",
    url: staticFile("fonts/Inter-latin.woff2"),
    weight: "400",
  }),
  loadFont({
    family: "Inter",
    url: staticFile("fonts/Inter-latin.woff2"),
    weight: "600",
  }),
  loadFont({
    family: "Inter",
    url: staticFile("fonts/Inter-latin.woff2"),
    weight: "700",
  }),
  loadFont({
    family: "Lora",
    url: staticFile("fonts/Lora-italic-latin.woff2"),
    weight: "400",
    style: "italic",
  }),
]);
