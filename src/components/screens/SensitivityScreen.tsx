import React from 'react';
import { ChevronLeft, RotateCw, Save } from 'lucide-react';
import { SensitivityValues } from '../../types/app';
import {
  CpuChipIcon,
  CrosshairTargetIcon,
  GreenCheckCircleIcon,
} from '../Icons';

interface SensitivityScreenProps {
  detectedDeviceLabel: string;
  sensitivity: SensitivityValues;
  onChangeSensitivity: (key: keyof SensitivityValues, value: number) => void;
  onSave: () => void;
  onRestore: () => void;
  onOpenGenerator: () => void;
  onOpenModelSelector?: () => void;
  onBack: () => void;
}

const SLIDER_ROWS: { key: keyof SensitivityValues; label: string }[] = [
  { key: 'geral', label: 'Geral' },
  { key: 'redDot', label: 'Red Dot' },
  { key: 'mira2x', label: 'Mira 2x' },
  { key: 'mira4x', label: 'Mira 4x' },
  { key: 'miraAwm', label: 'Mira AWM' },
  { key: 'olhadinha', label: 'Olhadinha' },
];

export const SensitivityScreen: React.FC<SensitivityScreenProps> = ({
  detectedDeviceLabel,
  sensitivity,
  onChangeSensitivity,
  onSave,
  onRestore,
  onOpenGenerator,
  onOpenModelSelector,
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
        <CrosshairTargetIcon className="w-8 h-8 shrink-0" />
        <div className="leading-tight">
          <h1 className="font-display text-[22px] font-black tracking-wide text-white uppercase leading-none">
            SENSIBILIDADE
          </h1>
          <p className="text-[11.5px] text-white/85 mt-0.5">
            Gere a sensibilidade ideal!
          </p>
        </div>
      </header>

      {/* Top Generate Button */}
      <button
        type="button"
        onClick={onOpenGenerator}
        className="w-full nexus-red-cta rounded-2xl px-4 py-2.5 flex items-center justify-center gap-3.5 cursor-pointer"
      >
        <CpuChipIcon className="w-9 h-9 shrink-0" />
        <div className="text-left leading-tight">
          <div className="font-display text-[19px] font-black tracking-wide text-white uppercase">
            GERAR SENSIBILIDADE
          </div>
          <div className="font-display text-[17px] font-black tracking-wide text-white uppercase">
            PARA MEU DISPOSITIVO
          </div>
        </div>
      </button>

      {/* Detected Compatibility Banner */}
      <button
        type="button"
        onClick={onOpenModelSelector || onOpenGenerator}
        className="nexus-card rounded-full px-3.5 py-2 flex items-center gap-2.5 w-full text-left cursor-pointer hover:border-red-400 transition-colors"
      >
        <GreenCheckCircleIcon className="w-5 h-5 shrink-0" />
        <div className="flex-1 text-center leading-tight">
          <div className="text-[12.5px] font-bold text-[#4ade80]">
            Compatibilidade Detectada:
          </div>
          <div className="text-[12.5px] font-medium text-white">
            {detectedDeviceLabel}
          </div>
        </div>
      </button>

      {/* Automatic Suggestion Banner */}
      <div className="nexus-card rounded-full px-3.5 py-2 flex flex-col items-center justify-center text-center leading-tight">
        <div className="text-[12.5px] font-bold text-[#4ade80]">
          Sugestão Automática:
        </div>
        <div className="flex items-center justify-center gap-1.5 text-[12.5px] font-medium text-white mt-0.5">
          {/* Curved swoosh arrow icon matching screenshot */}
          <svg viewBox="0 0 18 18" className="w-3.5 h-3.5 stroke-white shrink-0" fill="none" strokeWidth="2">
            <path d="M12 4C7 5 5 10 8 14" strokeLinecap="round" />
            <path d="M5 12L8.2 14.3L10.5 11" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Sensibilidade Personalizada</span>
        </div>
      </div>

      {/* Generated Sliders Box */}
      <div className="nexus-card rounded-2xl px-3 py-2.5 flex flex-col gap-2">
        <div className="text-[12.5px] font-semibold text-white/95">
          Ajustes Gerados:
        </div>

        <div className="flex flex-col gap-2">
          {SLIDER_ROWS.map((row) => {
            const val = sensitivity[row.key];
            return (
              <div key={row.key} className="flex items-center gap-2">
                <span className="w-[74px] text-[12.5px] font-medium text-white shrink-0">
                  {row.label}
                </span>

                <div className="flex-1 flex items-center">
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={val}
                    aria-label={row.label}
                    onChange={(e) =>
                      onChangeSensitivity(row.key, Number(e.target.value))
                    }
                    className="nexus-slider w-full"
                    style={{
                      background: `linear-gradient(to right, #dc2626 0%, #ef4444 ${val}%, #18181b ${val}%, #18181b 100%)`,
                      borderRadius: '9999px',
                      height: '6px',
                    }}
                  />
                </div>

                <div className="w-[42px] h-[24px] rounded-md border border-white/30 bg-black/70 flex items-center justify-center font-mono-num text-[12.5px] font-bold text-white shrink-0">
                  {val}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Save & Restore Row */}
      <div className="grid grid-cols-2 gap-2.5 pb-0.5">
        <button
          type="button"
          onClick={onSave}
          className="rounded-full py-2 px-3 flex items-center justify-center gap-2 border-[1.5px] border-[#ef4444] bg-gradient-to-b from-[#5c0808] to-[#260202] shadow-[0_0_12px_rgba(239,68,68,0.35)] text-white text-[13.5px] font-bold cursor-pointer hover:brightness-110 active:scale-[0.98]"
        >
          <Save className="w-4 h-4 text-[#ff4d4d]" />
          <span>Salvar</span>
        </button>

        <button
          type="button"
          onClick={onRestore}
          className="rounded-full py-2 px-3 flex items-center justify-center gap-2 border-[1.5px] border-[#ef4444] bg-gradient-to-b from-[#1f0304] to-[#0a0102] shadow-[0_0_10px_rgba(220,38,38,0.25)] text-white text-[13.5px] font-bold cursor-pointer hover:brightness-125 active:scale-[0.98]"
        >
          <RotateCw className="w-4 h-4 text-white" />
          <span>Restaurar</span>
        </button>
      </div>
    </div>
  );
};
