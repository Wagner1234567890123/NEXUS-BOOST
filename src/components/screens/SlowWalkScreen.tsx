import React from 'react';
import { ChevronLeft } from 'lucide-react';
import {
  GreenCheckCircleIcon,
  HumanSilhouetteIcon,
  WalkingFigureSvg,
} from '../Icons';

interface SlowWalkScreenProps {
  enabled: boolean;
  speed: number;
  onToggleEnabled: () => void;
  onChangeSpeed: (speed: number) => void;
  onApply: () => void;
  onBack: () => void;
}

export const SlowWalkScreen: React.FC<SlowWalkScreenProps> = ({
  enabled,
  speed,
  onToggleEnabled,
  onChangeSpeed,
  onApply,
  onBack,
}) => {
  const sliderPct = Math.round(((speed - 0.1) / 0.9) * 100);
  const animDuration = `${Math.max(1.2, 1.4 / Math.max(0.15, speed)).toFixed(2)}s`;

  return (
    <div className="flex flex-col flex-1 justify-between gap-2 pt-0.5">
      {/* Header */}
      <header className="flex items-center gap-2 px-0.5">
        <button
          type="button"
          onClick={onBack}
          aria-label="Voltar"
          className="min-w-[38px] min-h-[40px] flex items-center justify-center text-white hover:text-red-400 cursor-pointer"
        >
          <ChevronLeft className="w-7 h-7 stroke-[2.6]" />
        </button>
        <HumanSilhouetteIcon className="w-8 h-8 shrink-0" />
        <div className="leading-tight">
          <h1 className="font-display text-[22px] font-black tracking-wide text-white uppercase leading-none">
            BONECO LENTO
          </h1>
          <p className="text-[11.5px] text-white/85 mt-0.5">
            Deixa o boneco mais lento no jogo!
          </p>
        </div>
      </header>

      {/* Enable Toggle Card */}
      <div className="nexus-card rounded-2xl px-3.5 py-2.5 flex items-center justify-between">
        <span className="text-[14.5px] font-bold text-white">
          Ativar Boneco Lento
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          aria-label="Ativar Boneco Lento"
          onClick={onToggleEnabled}
          className={`w-[50px] h-[26px] rounded-full p-0.5 transition-colors flex items-center cursor-pointer ${
            enabled
              ? 'bg-[#e11d1d] justify-end shadow-[0_0_12px_rgba(239,68,68,0.7)]'
              : 'bg-zinc-800 border border-red-800/70 justify-start'
          }`}
        >
          <span className="w-[21px] h-[21px] rounded-full bg-white shadow-sm block" />
        </button>
      </div>

      {/* Effect Speed Slider Card */}
      <div className="nexus-card rounded-2xl px-3.5 py-2.5 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-[14px] font-semibold text-white">
            Velocidade do Efeito:
          </span>
          <span className="px-2.5 py-0.5 rounded-md border border-white/40 bg-black/80 font-mono-num text-[13.5px] font-bold text-white">
            {speed.toFixed(2)}x
          </span>
        </div>

        <input
          type="range"
          min={0.1}
          max={1.0}
          step={0.05}
          value={speed}
          aria-label="Velocidade do Efeito"
          onChange={(e) => onChangeSpeed(Number(e.target.value))}
          className="nexus-slider w-full"
          style={{
            background: `linear-gradient(to right, #dc2626 0%, #ef4444 ${sliderPct}%, #27272a ${sliderPct}%, #27272a 100%)`,
            borderRadius: '9999px',
            height: '6px',
          }}
        />
      </div>

      {/* Visual Demo Card */}
      <div className="nexus-card rounded-2xl px-3 py-2.5 flex flex-col gap-1.5">
        <span className="text-[12.5px] font-semibold text-white">
          Demonstração Visual:
        </span>

        <div
          className="relative h-[116px] rounded-xl border border-[#8f1d1d] overflow-hidden flex items-center justify-center"
          style={{
            backgroundColor: '#090203',
            backgroundImage:
              'linear-gradient(to right, rgba(220,38,38,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(220,38,38,0.14) 1px, transparent 1px)',
            backgroundSize: '16px 16px',
          }}
        >
          {/* Ambient glow under figures */}
          <div
            className="absolute inset-x-10 bottom-2 h-4 rounded-full blur-md pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, rgba(255,30,30,0.45) 0%, rgba(56,189,248,0.2) 60%, transparent 100%)',
            }}
          />

          {/* 4 Walking Figures (1 red lead + 3 cyan trailing echoes) */}
          <div className="relative w-[195px] h-[96px] flex items-center justify-center">
            <div
              className={`absolute left-[14px] z-40 ${enabled ? 'walk-lead-anim' : ''}`}
              style={enabled ? { animationDuration: animDuration } : undefined}
            >
              <WalkingFigureSvg
                stroke="#ff1e1e"
                strokeWidth={2.7}
                fill="rgba(255, 20, 20, 0.2)"
                className="w-[54px] h-[94px] drop-shadow-[0_0_8px_rgba(255,30,30,0.8)]"
              />
            </div>

            <div
              className={`absolute left-[48px] z-30 opacity-85 ${enabled ? 'walk-echo-anim' : ''}`}
              style={enabled ? { animationDuration: animDuration } : undefined}
            >
              <WalkingFigureSvg
                stroke="#7dd3fc"
                strokeWidth={2}
                fill="rgba(56, 189, 248, 0.06)"
                className="w-[54px] h-[94px]"
              />
            </div>

            <div
              className={`absolute left-[84px] z-20 opacity-65 ${enabled ? 'walk-echo-anim' : ''}`}
              style={
                enabled
                  ? { animationDuration: animDuration, animationDelay: '0.18s' }
                  : undefined
              }
            >
              <WalkingFigureSvg
                stroke="#bae6fd"
                strokeWidth={1.8}
                fill="rgba(56, 189, 248, 0.04)"
                className="w-[54px] h-[94px]"
              />
            </div>

            <div
              className={`absolute left-[120px] z-10 opacity-45 ${enabled ? 'walk-echo-anim' : ''}`}
              style={
                enabled
                  ? { animationDuration: animDuration, animationDelay: '0.36s' }
                  : undefined
              }
            >
              <WalkingFigureSvg
                stroke="#e0f2fe"
                strokeWidth={1.5}
                fill="transparent"
                className="w-[54px] h-[94px]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3 Green Checkpoints */}
      <ul className="flex flex-col gap-1.5 px-1.5">
        <li className="flex items-center gap-2 text-[12.5px] font-medium text-white">
          <GreenCheckCircleIcon className="w-[18px] h-[18px] shrink-0" />
          <span>Movimento mais suave e preciso.</span>
        </li>
        <li className="flex items-center gap-2 text-[12.5px] font-medium text-white">
          <GreenCheckCircleIcon className="w-[18px] h-[18px] shrink-0" />
          <span>Ajuda a mirar e dar mais capa.</span>
        </li>
        <li className="flex items-center gap-2 text-[12.5px] font-medium text-white">
          <GreenCheckCircleIcon className="w-[18px] h-[18px] shrink-0" />
          <span>Funciona em todos os modos.</span>
        </li>
      </ul>

      {/* Bottom Apply Button */}
      <button
        type="button"
        onClick={onApply}
        className="w-full rounded-full py-2.5 px-6 nexus-red-cta font-display text-[22px] font-black tracking-wider text-white uppercase cursor-pointer transition-transform active:scale-[0.985] mb-0.5"
      >
        APLICAR
      </button>
    </div>
  );
};
