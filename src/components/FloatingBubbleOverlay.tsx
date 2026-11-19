import React, { useEffect, useRef, useState } from 'react';
import {
  BatteryCharging,
  Crosshair,
  Eye,
  ExternalLink,
  Gamepad2,
  Hand,
  Hexagon,
  PlusCircle,
  Sparkles,
  Trash2,
  User,
  X,
  Zap,
} from 'lucide-react';
import { AppSettingsState, FpsOption, PerformanceFlags } from '../types/app';
import { RocketIcon } from './Icons';
import {
  disableGameOverlay,
  enableGameOverlay,
  getGameOverlayState,
  isNativeAndroid,
  GameOverlayState,
} from '../utils/nativeOverlay';

interface FloatingBubbleOverlayProps {
  visible: boolean;
  settings: AppSettingsState;
  onTogglePerformanceFlag: (key: keyof PerformanceFlags) => void;
  onToggleSlowWalk: () => void;
  onToggleEconomy: () => void;
  onToggleGpuHighPerf: () => void;
  onSelectFps: (fps: FpsOption) => void;
  onCleanMemory: () => void;
  onDeactivateBoost: () => void;
  onHideBubble?: () => void;
  onOpenProfiles?: () => void;
}

const QUICK_FPS_OPTIONS: FpsOption[] = [60, 90, 120, 144, 240];

export const FloatingBubbleOverlay: React.FC<FloatingBubbleOverlayProps> = ({
  visible,
  settings,
  onTogglePerformanceFlag,
  onToggleSlowWalk,
  onToggleEconomy,
  onToggleGpuHighPerf,
  onSelectFps,
  onCleanMemory,
  onDeactivateBoost,
  onHideBubble,
  onOpenProfiles,
}) => {
  const [panelOpen, setPanelOpen] = useState(false);
  const [pos, setPos] = useState<{ x: number; y: number }>(() => ({
    x: typeof window !== 'undefined' ? Math.max(16, window.innerWidth - 78) : 280,
    y: typeof window !== 'undefined' ? Math.round(window.innerHeight * 0.38) : 220,
  }));
  const [isDragging, setIsDragging] = useState(false);
  const [overlayState, setOverlayState] = useState<GameOverlayState>({
    native: isNativeAndroid(),
    granted: false,
    running: false,
  });
  const [overlayBusy, setOverlayBusy] = useState(false);
  const [overlayMsg, setOverlayMsg] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    void getGameOverlayState().then((state) => {
      if (alive) setOverlayState(state);
    });
    return () => {
      alive = false;
    };
  }, []);

  const dragStateRef = useRef<{
    pointerId: number | null;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
    moved: boolean;
  }>({
    pointerId: null,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
    moved: false,
  });

  // Keep bubble inside viewport on window resize
  useEffect(() => {
    const handleResize = () => {
      setPos((prev) => ({
        x: Math.min(Math.max(8, prev.x), Math.max(8, window.innerWidth - 66)),
        y: Math.min(Math.max(8, prev.y), Math.max(8, window.innerHeight - 66)),
      }));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!visible) return null;

  const bubbleSize = 58;

  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragStateRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      originX: pos.x,
      originY: pos.y,
      moved: false,
    };
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const state = dragStateRef.current;
    if (state.pointerId !== e.pointerId) return;

    const dx = e.clientX - state.startX;
    const dy = e.clientY - state.startY;
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
      state.moved = true;
    }

    const maxX = Math.max(8, window.innerWidth - bubbleSize - 8);
    const maxY = Math.max(8, window.innerHeight - bubbleSize - 8);

    setPos({
      x: Math.min(Math.max(8, state.originX + dx), maxX),
      y: Math.min(Math.max(8, state.originY + dy), maxY),
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    const state = dragStateRef.current;
    if (state.pointerId !== e.pointerId) return;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    dragStateRef.current.pointerId = null;
    setIsDragging(false);

    if (!state.moved) {
      setPanelOpen((prev) => !prev);
    }
  };

  // Compute safe floating panel position next to bubble
  const vw = typeof window !== 'undefined' ? window.innerWidth : 390;
  const vh = typeof window !== 'undefined' ? window.innerHeight : 780;
  const panelWidth = Math.min(296, vw - 24);
  const panelLeft =
    pos.x > vw / 2
      ? Math.max(12, pos.x - panelWidth - 10)
      : Math.min(vw - panelWidth - 12, pos.x + bubbleSize + 10);
  const panelTop = Math.min(Math.max(12, pos.y - 40), Math.max(12, vh - 460));

  const supportsDocPip =
    typeof window !== 'undefined' &&
    'documentPictureInPicture' in window;

  const handleOpenBrowserPip = async () => {
    try {
      const pipApi = (
        window as Window & {
          documentPictureInPicture?: {
            requestWindow: (opts: { width: number; height: number }) => Promise<Window>;
          };
        }
      ).documentPictureInPicture;
      if (!pipApi) return;

      const pipWindow = await pipApi.requestWindow({ width: 290, height: 320 });
      pipWindow.document.body.style.margin = '0';
      pipWindow.document.body.style.background = '#090203';
      pipWindow.document.body.style.color = '#ffffff';
      pipWindow.document.body.style.fontFamily = 'system-ui, sans-serif';
      pipWindow.document.body.innerHTML = `
        <div style="padding:14px;border:2px solid #ff1e1e;min-height:100vh;box-sizing:border-box;">
          <div style="font-weight:900;font-size:15px;margin-bottom:8px;">MAX PERFORMANCE 👑</div>
          <div style="font-size:12px;color:#4ade80;margin-bottom:10px;">● Bolinha Ativa · ${settings.selectedFps} FPS</div>
          <div style="font-size:12px;line-height:1.7;">
            <div>Boneco Lento: <b>${settings.slowWalkEnabled ? `ON (${settings.slowWalkSpeed.toFixed(2)}x)` : 'OFF'}</b></div>
            <div>Desempenho Máximo: <b>${settings.performanceFlags.maxPerformance ? 'ON' : 'OFF'}</b></div>
            <div>Redução Travamentos: <b>${settings.performanceFlags.reduceStutter ? 'ON' : 'OFF'}</b></div>
            <div>Estabilizar FPS: <b>${settings.performanceFlags.stabilizeFps ? 'ON' : 'OFF'}</b></div>
            <div>Modo Anti-Lag: <b>${settings.performanceFlags.antiLag ? 'ON' : 'OFF'}</b></div>
            <div>Otimização Memória: <b>${settings.performanceFlags.memoryOpt ? 'ON' : 'OFF'}</b></div>
          </div>
        </div>
      `;
    } catch {
      // User dismissed or browser blocked PiP
    }
  };

  const toggleRows: {
    label: string;
    active: boolean;
    onToggle: () => void;
    icon: React.ReactNode;
  }[] = [
    {
      label: `Boneco Lento (${settings.slowWalkSpeed.toFixed(2)}x)`,
      active: settings.slowWalkEnabled,
      onToggle: onToggleSlowWalk,
      icon: <User className="w-3.5 h-3.5 text-red-400" />,
    },
    {
      label: 'Modo Desempenho Máximo',
      active: settings.performanceFlags.maxPerformance,
      onToggle: () => onTogglePerformanceFlag('maxPerformance'),
      icon: <Zap className="w-3.5 h-3.5 text-red-400" />,
    },
    {
      label: 'Redução de Travamentos',
      active: settings.performanceFlags.reduceStutter,
      onToggle: () => onTogglePerformanceFlag('reduceStutter'),
      icon: <Crosshair className="w-3.5 h-3.5 text-red-400" />,
    },
    {
      label: 'Estabilizar FPS',
      active: settings.performanceFlags.stabilizeFps,
      onToggle: () => onTogglePerformanceFlag('stabilizeFps'),
      icon: <Hand className="w-3.5 h-3.5 text-red-400" />,
    },
    {
      label: 'Modo Anti-Lag',
      active: settings.performanceFlags.antiLag,
      onToggle: () => onTogglePerformanceFlag('antiLag'),
      icon: <Eye className="w-3.5 h-3.5 text-red-400" />,
    },
    {
      label: 'Otimização de Memória',
      active: settings.performanceFlags.memoryOpt,
      onToggle: () => onTogglePerformanceFlag('memoryOpt'),
      icon: <PlusCircle className="w-3.5 h-3.5 text-red-400" />,
    },
    {
      label: 'Desempenho Gráfico Alto',
      active: settings.gpuHighPerf,
      onToggle: onToggleGpuHighPerf,
      icon: <Hexagon className="w-3.5 h-3.5 text-red-400" />,
    },
    {
      label: 'Modo Economia',
      active: settings.economyMode,
      onToggle: onToggleEconomy,
      icon: <BatteryCharging className="w-3.5 h-3.5 text-red-400" />,
    },
  ];

  return (
    <>
      {/* Draggable Floating Bubble */}
      <button
        type="button"
        aria-label={panelOpen ? 'Fechar painel flutuante MAX PERFORMANCE' : 'Abrir painel flutuante MAX PERFORMANCE'}
        data-testid="floating-bubble-trigger"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: `${bubbleSize}px`,
          height: `${bubbleSize}px`,
          touchAction: 'none',
        }}
        className={`fixed z-50 rounded-full flex flex-col items-center justify-center border-2 border-[#ff3b3b] bg-gradient-to-b from-[#6d0000] via-[#1c0203] to-[#080102] shadow-[0_0_22px_rgba(255,30,30,0.85),inset_0_0_10px_rgba(255,80,80,0.45)] cursor-grab active:cursor-grabbing select-none ${
          isDragging ? 'scale-105' : 'transition-transform duration-150 hover:scale-105'
        }`}
      >
        <RocketIcon className="w-5 h-5" />
        <span className="font-display text-[10px] font-black tracking-wider text-white leading-none mt-0.5">
          {settings.selectedFps} FPS
        </span>
      </button>

      {/* Floating Control Panel */}
      {panelOpen && (
        <aside
          data-testid="floating-control-panel"
          style={{
            left: `${panelLeft}px`,
            top: `${panelTop}px`,
            width: `${panelWidth}px`,
          }}
          className="fixed z-50 nexus-card rounded-2xl border-[1.8px] border-[#ff2e2e] shadow-[0_0_28px_rgba(255,20,20,0.65)] p-3 text-white max-h-[82vh] overflow-y-auto no-scrollbar"
        >
          {/* Panel Header */}
          <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-red-900/60">
            <div className="flex items-center gap-1.5 min-w-0">
              <RocketIcon className="w-5 h-5 shrink-0" />
              <div className="min-w-0">
                <div className="font-display text-[15px] font-black tracking-wide uppercase leading-none truncate">
                  MAX PERFORMANCE 👑
                </div>
                <div className="text-[10px] text-green-400 font-semibold mt-0.5">
                  Controle Flutuante Ativo
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setPanelOpen(false)}
              aria-label="Fechar painel flutuante"
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 text-white cursor-pointer shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick FPS Selector inside Floating Panel */}
          <div className="mb-2.5">
            <div className="text-[11px] font-bold text-white/85 mb-1 flex items-center justify-between">
              <span>FPS Alvo:</span>
              <span className="font-mono-num text-red-400">{settings.selectedFps} FPS</span>
            </div>
            <div className="grid grid-cols-5 gap-1">
              {QUICK_FPS_OPTIONS.map((fps) => {
                const active = settings.selectedFps === fps;
                return (
                  <button
                    key={fps}
                    type="button"
                    onClick={() => onSelectFps(fps)}
                    className={`py-1 rounded-lg font-mono-num text-[11px] font-bold cursor-pointer transition-colors ${
                      active
                        ? 'bg-red-600 text-white shadow-[0_0_8px_rgba(239,68,68,0.8)]'
                        : 'bg-black/60 border border-red-900/70 text-white/80 hover:border-red-500'
                    }`}
                  >
                    {fps}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Individual Toggles */}
          <div className="space-y-1.5 mb-2.5">
            {toggleRows.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between gap-2 rounded-xl bg-black/50 border border-red-950/80 px-2.5 py-1.5"
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  {row.icon}
                  <span className="text-[11.5px] font-medium text-white truncate">
                    {row.label}
                  </span>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={row.active}
                  aria-label={row.label}
                  onClick={row.onToggle}
                  className={`w-[36px] h-[19px] rounded-full p-0.5 transition-colors flex items-center shrink-0 cursor-pointer ${
                    row.active
                      ? 'bg-[#e11d1d] justify-end shadow-[0_0_8px_rgba(239,68,68,0.65)]'
                      : 'bg-zinc-800 border border-red-900 justify-start'
                  }`}
                >
                  <span className="w-[14px] h-[14px] rounded-full bg-white block" />
                </button>
              </div>
            ))}
          </div>

          {/* Bolinha do sistema sobre o jogo (Android) */}
          <button
            type="button"
            disabled={overlayBusy}
            onClick={async () => {
              setOverlayBusy(true);
              const result = overlayState.running
                ? await disableGameOverlay()
                : await enableGameOverlay();
              setOverlayMsg(result.message);
              setOverlayState(await getGameOverlayState());
              setOverlayBusy(false);
            }}
            className={`mb-1.5 w-full rounded-xl py-1.5 px-2 border text-[11px] font-bold flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60 ${
              overlayState.running
                ? 'bg-green-900/50 border-green-500/80 text-green-200'
                : 'bg-red-950/60 border-red-600/80 hover:bg-red-900/80 text-white'
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>
              {overlayState.running
                ? 'Bolinha no jogo: ATIVA'
                : overlayState.native
                  ? 'Ativar bolinha no jogo'
                  : 'Bolinha no jogo (APK)'}
            </span>
          </button>

          {overlayMsg && (
            <div className="mb-1.5 rounded-lg bg-black/60 border border-red-900/70 px-2 py-1 text-[10px] leading-snug text-white/85">
              {overlayMsg}
            </div>
          )}

          {/* Perfis por modelo */}
          {onOpenProfiles && (
            <button
              type="button"
              onClick={() => {
                setPanelOpen(false);
                onOpenProfiles();
              }}
              className="mb-1.5 w-full rounded-xl py-1.5 px-2 bg-red-950/60 border border-red-600/80 hover:bg-red-900/80 text-[11px] font-bold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Crosshair className="w-3.5 h-3.5 text-red-300" />
              <span>Perfis por Marca/Modelo</span>
            </button>
          )}

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-1.5">
            <button
              type="button"
              onClick={onCleanMemory}
              className="rounded-xl py-1.5 px-2 bg-black/70 border border-red-700/80 hover:border-red-400 text-[11px] font-bold flex items-center justify-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-red-400" />
              <span>Limpar RAM</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setPanelOpen(false);
                onDeactivateBoost();
              }}
              className="rounded-xl py-1.5 px-2 bg-red-950/70 border border-red-600/80 hover:bg-red-900/80 text-[11px] font-bold flex items-center justify-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5 text-red-300" />
              <span>Desativar</span>
            </button>
          </div>

          {onHideBubble && (
            <button
              type="button"
              onClick={() => {
                setPanelOpen(false);
                onHideBubble();
              }}
              className="mt-1.5 w-full rounded-xl py-1.5 px-2 bg-black/70 border border-red-700/80 hover:border-red-400 text-[11px] font-bold text-white/85 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Ocultar Bolinha</span>
            </button>
          )}

          {supportsDocPip && (
            <button
              type="button"
              onClick={handleOpenBrowserPip}
              className="mt-1.5 w-full rounded-xl py-1.5 px-2 bg-black/70 border border-amber-500/50 hover:border-amber-400 text-[11px] font-bold text-amber-300 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Abrir Janela Flutuante (PiP)</span>
            </button>
          )}

          <p className="mt-2 text-[10px] leading-tight text-white/60 text-center">
            No navegador, a bolinha flutua por toda a tela do app. Sobrepor apps externos nativos (Free Fire no Android) requer permissão nativa <span className="text-white/80">SYSTEM_ALERT_WINDOW</span> no APK Android.
          </p>
        </aside>
      )}
    </>
  );
};
