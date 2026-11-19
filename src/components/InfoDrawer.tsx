import React, { useEffect, useState } from 'react';
import { Check, Copy, X } from 'lucide-react';
import { DeviceCapabilities, SensitivityValues } from '../types/app';

interface InfoDrawerProps {
  mode: 'shizuku' | 'premium' | null;
  capabilities: DeviceCapabilities | null;
  sensitivity: SensitivityValues;
  selectedFps: number;
  onClose: () => void;
}

export const InfoDrawer: React.FC<InfoDrawerProps> = ({
  mode,
  capabilities,
  sensitivity,
  selectedFps,
  onClose,
}) => {
  const [liveFps, setLiveFps] = useState<number>(0);
  const [frameTimeMs, setFrameTimeMs] = useState<number>(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (mode !== 'premium') return;
    let rafId = 0;
    let frameCount = 0;
    let lastTime = performance.now();
    let prevFrame = lastTime;

    const loop = (now: number) => {
      frameCount += 1;
      const dt = now - prevFrame;
      prevFrame = now;

      if (now - lastTime >= 400) {
        const fps = Math.round((frameCount / (now - lastTime)) * 1000);
        setLiveFps(fps);
        setFrameTimeMs(Number(dt.toFixed(1)));
        frameCount = 0;
        lastTime = now;
      }
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [mode]);

  if (!mode) return null;

  const handleCopyConfig = async () => {
    const payload = `MAX PERFORMANCE 👑 | Alvo: ${selectedFps} FPS | Geral: ${sensitivity.geral}, Red Dot: ${sensitivity.redDot}, 2x: ${sensitivity.mira2x}, 4x: ${sensitivity.mira4x}, AWM: ${sensitivity.miraAwm}, Olhadinha: ${sensitivity.olhadinha}`;
    try {
      await navigator.clipboard.writeText(payload);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[360px] nexus-card rounded-2xl p-4 text-white border-[1.5px] border-[#ff2e2e] shadow-[0_0_24px_rgba(255,20,20,0.5)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-[19px] font-black uppercase tracking-wide text-white">
            {mode === 'shizuku'
              ? 'Diagnóstico Real do Dispositivo'
              : 'Outras Funções Premium'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar painel"
            className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full hover:bg-white/10 text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {mode === 'shizuku' ? (
          <div className="space-y-2.5 text-[12.5px]">
            <p className="text-white/85 leading-relaxed">
              Leitura real obtida pelo navegador/WebView neste dispositivo (sem conexões simuladas de ADB/Shizuku):
            </p>
            <div className="rounded-xl bg-black/60 border border-red-900/70 p-3 space-y-1.5 font-mono-num text-[12px]">
              <div className="flex justify-between gap-2">
                <span className="text-white/70">Ambiente:</span>
                <span className="text-white text-right truncate">
                  {capabilities?.platformHint ?? 'Detectando...'}
                </span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-white/70">Taxa real medida:</span>
                <span className="text-green-400 font-bold">
                  {capabilities?.measuredHz ? `${capabilities.measuredHz} Hz` : '...'}
                </span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-white/70">Núcleos CPU:</span>
                <span className="text-white">
                  {capabilities?.cores ?? 'N/D'}
                </span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-white/70">Memória RAM (API):</span>
                <span className="text-white">
                  {capabilities?.memoryGb ? `${capabilities.memoryGb} GB` : 'Restrito pelo navegador'}
                </span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-white/70">Resolução / DPR:</span>
                <span className="text-white">
                  {capabilities ? `${capabilities.resolution} (${capabilities.pixelRatio}x)` : '...'}
                </span>
              </div>
              {capabilities?.batteryLevel !== null && capabilities?.batteryLevel !== undefined && (
                <div className="flex justify-between gap-2">
                  <span className="text-white/70">Bateria real:</span>
                  <span className="text-white">
                    {capabilities.batteryLevel}% {capabilities.batteryCharging ? '(Carregando)' : ''}
                  </span>
                </div>
              )}
              {capabilities?.gpuRenderer && (
                <div className="pt-1 border-t border-white/10">
                  <span className="text-white/70 block">GPU WebGL:</span>
                  <span className="text-white/95 text-[11px] break-all">
                    {capabilities.gpuRenderer}
                  </span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-3 text-[12.5px]">
            <div className="rounded-xl bg-black/60 border border-amber-500/50 p-3">
              <div className="text-amber-300 font-bold mb-1">
                Monitor Real de Quadros (Tempo Real)
              </div>
              <div className="flex items-baseline justify-between font-mono-num">
                <span className="text-2xl font-black text-white">
                  {liveFps} <span className="text-xs text-red-400">FPS</span>
                </span>
                <span className="text-xs text-white/80">
                  Frame Time: {frameTimeMs} ms
                </span>
              </div>
            </div>

            <div className="rounded-xl bg-black/60 border border-red-900/70 p-3 space-y-2">
              <div className="font-bold text-white">
                Exportar Configuração Salva
              </div>
              <p className="text-white/75 text-[11.5px]">
                Copie sua sensibilidade e meta de FPS calibradas para uso no jogo.
              </p>
              <button
                type="button"
                onClick={handleCopyConfig}
                className="w-full nexus-red-cta rounded-full py-2 px-4 flex items-center justify-center gap-2 text-xs font-bold uppercase cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-green-300" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copiado!' : 'Copiar Ajustes'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
