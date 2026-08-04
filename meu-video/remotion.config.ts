/**
 * Note: When using the Node.JS APIs, the config file
 * doesn't apply. Instead, pass options directly to the APIs.
 *
 * All configuration options: https://remotion.dev/docs/config
 */

import { Config } from "@remotion/cli/config";
import { enableTailwind } from '@remotion/tailwind-v4';

Config.setRspack(true);
// Quadros em PNG, não JPEG. Com JPEG a saída é marcada como yuvj420p (faixa
// cheia) e nem --pixel-format nem setPixelFormat revertem a marcação; o
// Instagram espera yuv420p. PNG também evita artefato de compressão nas áreas
// chapadas de verde e nas bordas do texto.
Config.setVideoImageFormat("png");
Config.setOverwriteOutput(true);
Config.overrideBundlerConfig(enableTailwind);
