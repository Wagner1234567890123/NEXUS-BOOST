import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { FpsOption } from '../../types/app';
import {
  FlameBadgeIcon,
  GoldCrownIcon,
  GreenCheckCircleIcon,
  RocketIcon,
} from '../Icons';

const FPS_OPTIONS: { value: FpsOption; tag?: string }[] = [
  { value: 60, tag: '(Baixo)' },
  { value: 75 },
  { value: 90 },
  { value: 120 },
  { value: 144 },
  { value: 165 },
  { value: 180 },
  { value: 210 },
  { value: 225 },
  { value: 240, tag: '(Máximo)' },
];

interface FpsBoostScreenProps {
  selectedFps: FpsOption;
  onSelectFps: (fps: FpsOption) => void;
  onApplyFps: () => void;
  onBack: () => void;
}

export const FpsBoostScreen: React.FC<FpsBoostScreenProps> = ({
  selectedFps,
  onSelectFps,
  onApplyFps,
  onBack,
}) => {
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
        <RocketIcon className="w-8 h-8 shrink-0" />
        <div className="leading-tight">
          <h1 className="font-display text-[22px] font-black tracking-wide text-white uppercase leading-none">
            FPS BOOST
          </h1>
          <p className="text-[11.5px] text-white/85 mt-0.5">
            Aumente o FPS do seu jogo!
          </p>
        </div>
      </header>

      {/* Main Selector + Flaming Orb Card */}
      <div className="nexus-card rounded-2xl px-2.5 py-2.5 flex items-center justify-between gap-2 relative overflow-hidden">
        {/* Left FPS Radio List */}
        <div className="flex flex-col flex-1 min-w-0 divide-y divide-white/10">
          {FPS_OPTIONS.map((opt) => {
            const isSelected = selectedFps === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onSelectFps(opt.value)}
                className={`flex items-center gap-2 px-1.5 py-[5.5px] text-left cursor-pointer transition-all ${
                  isSelected
                    ? 'rounded-full border border-[#ff2b2b] bg-gradient-to-r from-[#5a0606]/90 to-[#290202]/90 shadow-[0_0_12px_rgba(255,30,30,0.45)] my-0.5'
                    : 'hover:bg-white/5 rounded-md'
                }`}
              >
                {isSelected ? (
                  <FlameBadgeIcon className="w-[18px] h-[18px] shrink-0" />
                ) : (
                  <GoldCrownIcon className="w-[18px] h-[16px] shrink-0" />
                )}

                {/* Radio Circle */}
                <span
                  className={`w-3.5 h-3.5 rounded-full border-[1.5px] flex items-center justify-center shrink-0 ${
                    isSelected
                      ? 'border-[#ff4d4d] bg-[#660000] shadow-[0_0_6px_rgba(255,30,30,0.85)]'
                      : 'border-white/80 bg-transparent'
                  }`}
                >
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-[#ff2b2b] shadow-[0_0_6px_#ff3333]" />
                  )}
                </span>

                <span
                  className={`font-mono-num text-[12.5px] whitespace-nowrap ${
                    isSelected ? 'font-bold text-white' : 'font-semibold text-white/95'
                  }`}
                >
                  {opt.value} FPS
                  {opt.tag && (
                    <span className="font-sans text-[11px] font-medium text-white/85 ml-1.5">
                      {opt.tag}
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Flaming Crown FPS Orb */}
        <div className="w-[126px] shrink-0 flex flex-col items-center justify-center relative py-3">
          {/* Golden Crown resting above orb */}
          <img
            src="/assets/fps_crown.png"
            alt="Coroa dourada FPS"
            referrerPolicy="no-referrer"
            className="w-[74px] h-[42px] object-contain -mb-2.5 z-20 pointer-events-none select-none"
            style={{
              WebkitMaskImage:
                'radial-gradient(ellipse at center, black 62%, transparent 98%)',
              maskImage:
                'radial-gradient(ellipse at center, black 62%, transparent 98%)',
            }}
          />

          {/* Fiery Glowing Ring */}
          <div className="relative w-[114px] h-[114px] rounded-full border-[3px] border-[#ff3c00] bg-gradient-to-b from-[#330200] via-[#170000] to-[#2e0300] flex flex-col items-center justify-center fps-flame-ring z-10">
            {/* Subtle crosshair lines inside orb */}
            <div className="absolute inset-1 rounded-full border border-orange-400/30 pointer-events-none" />
            <span className="font-display font-black italic text-[20px] leading-none text-white tracking-wider">
              FPS
            </span>
            <span
              className="font-display font-black text-[44px] leading-[0.9] text-[#ff1e1e] tabular-nums my-0.5"
              style={{ textShadow: '0 0 12px rgba(255,20,20,0.85)' }}
            >
              {selectedFps}
            </span>
            <span className="font-display font-black italic text-[17px] leading-none text-white tracking-wide uppercase">
              {selectedFps === 240 ? 'MÁXIMO' : selectedFps >= 144 ? 'ALTO' : 'ESTÁVEL'}
            </span>
          </div>
        </div>
      </div>

      {/* Gold Compatibility Banner */}
      <div className="nexus-gold-banner rounded-full px-3.5 py-2 flex items-center gap-2.5">
        <GreenCheckCircleIcon className="w-6 h-6 shrink-0" />
        <p className="flex-1 text-center text-[12px] font-bold leading-snug text-[#fde047]">
          Seu dispositivo suporta até
          <br />
          {selectedFps} FPS com estabilidade!
        </p>
      </div>

      {/* Bottom Apply Button */}
      <button
        type="button"
        onClick={onApplyFps}
        className="w-full rounded-full py-2.5 px-6 nexus-red-cta font-display text-[22px] font-black tracking-wider text-white uppercase cursor-pointer transition-transform active:scale-[0.985] mb-0.5"
      >
        APLICAR FPS
      </button>
    </div>
  );
};
