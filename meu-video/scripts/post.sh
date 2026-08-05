#!/usr/bin/env bash
# Pós-processamento do reel: normalização de áudio e encode de entrega.
#
# A correção de cor NÃO está aqui de propósito. Ela roda em
# scripts/preparar-camera.mjs, sobre os clipes de câmera. Aplicada no quadro
# pronto, a mesma cadeia derrubaria o verde e o dourado da identidade junto com
# o dominante da parede — são cor chapada de marca, não dominante a corrigir.
#
# O loudnorm roda em duas passagens e mede sozinho. Valores medidos fixos no
# script envelhecem: bastam um take novo ou um corte diferente para a medição
# anterior deixar de valer.
#
# Uso: scripts/post.sh out/reel-noexis-ark.mp4 out/reel-final.mp4

set -euo pipefail

ENTRADA="${1:-out/reel-noexis-ark.mp4}"
SAIDA="${2:-out/reel-final.mp4}"

FF="$(python3 -c 'import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())')"

ALVO_I="-14"
ALVO_TP="-1.0"
ALVO_LRA="6"

echo "→ passagem 1: medindo"
MEDIDAS="$("$FF" -hide_banner -i "$ENTRADA" \
  -af "acompressor=threshold=-20dB:ratio=3:attack=8:release=180,loudnorm=I=$ALVO_I:TP=$ALVO_TP:LRA=$ALVO_LRA:print_format=json" \
  -f null - 2>&1 | sed -n '/^{/,/^}/p')"

le() { echo "$MEDIDAS" | grep "\"$1\"" | sed 's/.*: *"\([^"]*\)".*/\1/'; }

I="$(le input_i)"; TP="$(le input_tp)"; LRA="$(le input_lra)"; TH="$(le input_thresh)"
echo "   medido: I=$I TP=$TP LRA=$LRA thresh=$TH"

echo "→ passagem 2: normalizando e encodando"
"$FF" -hide_banner -loglevel error -y -i "$ENTRADA" \
  -af "acompressor=threshold=-20dB:ratio=3:attack=8:release=180,loudnorm=I=$ALVO_I:TP=$ALVO_TP:LRA=$ALVO_LRA:measured_I=$I:measured_TP=$TP:measured_LRA=$LRA:measured_thresh=$TH:linear=true" \
  -c:v libx264 -profile:v high -level 4.1 -crf 18 -maxrate 8M -bufsize 16M \
  -pix_fmt yuv420p -r 30 -movflags +faststart \
  -c:a aac -b:a 192k -ar 48000 \
  "$SAIDA"

echo "→ conferência"
"$FF" -hide_banner -i "$SAIDA" -af loudnorm=print_format=summary -f null - 2>&1 |
  grep -E "Input Integrated|Input True Peak|Input LRA" || true
"$FF" -hide_banner -i "$SAIDA" 2>&1 | grep -E "Duration|Stream #"
