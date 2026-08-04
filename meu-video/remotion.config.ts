/**
 * Note: When using the Node.JS APIs, the config file
 * doesn't apply. Instead, pass options directly to the APIs.
 *
 * All configuration options: https://remotion.dev/docs/config
 */

import { Config } from "@remotion/cli/config";
import { enableTailwind } from '@remotion/tailwind-v4';

Config.setRspack(true);
Config.setVideoImageFormat("jpeg");
// Instagram espera vídeo em faixa limitada; sem isto os quadros JPEG saem
// marcados como yuvj420p (faixa cheia) e o player desloca as cores.
Config.setPixelFormat("yuv420p");
Config.setOverwriteOutput(true);
Config.overrideBundlerConfig(enableTailwind);
