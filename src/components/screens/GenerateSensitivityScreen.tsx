import React from 'react';
import { ChevronLeft, Crosshair, Eye, Hand, PlusCircle, User, Zap } from 'lucide-react';
import { BrandId, PerformanceFlags } from '../../types/app';
import { BRAND_METADATA } from '../../utils/deviceOptimizer';
import {
  BrandBadge,
  CrosshairTargetIcon,
  GreenCheckCircleIcon,
  RocketIcon,
} from '../Icons';

const BRAND_LIST: BrandId[] = [
  'motorola',
  'samsung',
  'xiaomi',
  'redmi',
  'poco',
  'realme',
  'infinix',
  'tecno',
  'other',
];

interface GenerateSensitivityScreenProps {
  selectedBrand: BrandId;
  performanceFlags: PerformanceFlags;
  onSelectBrand: (brand: BrandId) => void;
  onOpenModelSelector?: (brand: BrandId | 'all') => void;
  onGenerateNow: () => void;
  onToggleFlag: (key: keyof PerformanceFlags) => void;
  onBack: () => void;
}

export const GenerateSensitivityScreen: React.FC<GenerateSensitivityScreenProps> = ({
  selectedBrand,
  performanceFlags,
  onSelectBrand,
  onOpenModelSelector,
  onGenerateNow,
  onToggleFlag,
  onBack,
}) => {
  const perfItems: {
    key: keyof PerformanceFlags;
    label: string;
    icon: React.ReactNode;
  }[] = [
    {
      key: 'maxPerformance',
      label: 'Modo Desempenho Máximo',
      icon: <User className="w-4 h-4 text-white fill-white/85" />,
    },
    {
      key: 'reduceStutter',
      label: 'Redução de Travamentos',
      icon: <Crosshair className="w-4 h-4 text-white" />,
    },
    {
      key: 'stabilizeFps',
      label: 'Estabilizar FPS',
      icon: <Hand className="w-4 h-4 text-white" />,
    },
    {
      key: 'antiLag',
      label: 'Modo Anti-Lag',
      icon: <Eye className="w-4 h-4 text-white" />,
    },
    {
      key: 'memoryOpt',
      label: 'Otimização de Memória',
      icon: <PlusCircle className="w-4 h-4 text-white" />,
    },
  ];

  return (
    <div className="flex flex-col flex-1 justify-between gap-1.5 pt-0.5">
      {/* Header */}
      <header className="flex items-center gap-2 px-0.5">
        <button
          type="button"
          onClick={onBack}
          aria-label="Voltar"
          className="min-w-[38px] min-h-[38px] flex items-center justify-center text-white hover:text-red-400 cursor-pointer"
        >
          <ChevronLeft className="w-7 h-7 stroke-[2.6]" />
        </button>
        <CrosshairTargetIcon className="w-7 h-7 shrink-0" />
        <div className="leading-tight">
          <h1 className="font-display text-[21px] font-black tracking-wide text-white uppercase leading-none">
            GERAR SENSIBILIDADE
          </h1>
          <p className="text-[11px] text-white/85 mt-0.5">
            Escolha sua marca para gerar:
          </p>
        </div>
      </header>

      {/* 3x3 Brand Grid Container */}
      <div className="nexus-card rounded-2xl p-2 grid grid-cols-3 gap-1.5">
        {BRAND_LIST.map((brand) => {
          const isSelected = selectedBrand === brand;
          return (
            <button
              key={brand}
              type="button"
              onClick={() => {
                onSelectBrand(brand);
                onOpenModelSelector?.(brand);
              }}
              className={`rounded-xl py-1.5 px-1 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
                isSelected
                  ? 'border-[1.6px] border-[#ff3b3b] bg-[#3b0506]/90 shadow-[0_0_12px_rgba(255,40,40,0.5)]'
                  : 'border border-[#991b1b]/80 bg-[#140203]/90 hover:border-[#ef4444]'
              }`}
            >
              <BrandBadge brand={brand} />
              <span className="text-[11.5px] font-semibold text-white leading-none">
                {BRAND_METADATA[brand].label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Green Personalized Info Banner */}
      <button
        type="button"
        onClick={() => onOpenModelSelector?.('all')}
        className="nexus-green-pill rounded-2xl px-3 py-1.5 flex items-center gap-2.5 w-full text-left cursor-pointer hover:brightness-110 transition-all"
      >
        <GreenCheckCircleIcon className="w-5 h-5 shrink-0" />
        <p className="text-[11.5px] font-medium leading-tight text-white">
          Será gerada uma sensibilidade personalizada de acordo com o seu dispositivo!
        </p>
      </button>

      {/* GERAR AGORA Button */}
      <button
        type="button"
        onClick={onGenerateNow}
        className="w-[82%] mx-auto rounded-full py-1.5 px-5 nexus-red-cta flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-[0.985]"
      >
        <Zap className="w-4 h-4 text-[#4ade80] fill-[#4ade80] drop-shadow-[0_0_6px_rgba(74,222,128,0.85)]" />
        <span className="font-display text-[17px] font-black tracking-wider text-white uppercase">
          GERAR AGORA
        </span>
      </button>

      {/* FUNÇÕES DE DESEMPENHO Card */}
      <div className="nexus-card rounded-2xl px-3 py-2 flex flex-col gap-1.5 mb-0.5">
        <div className="flex items-center gap-1.5">
          <RocketIcon className="w-4 h-4 shrink-0" />
          <h2 className="font-display text-[14.5px] font-black tracking-wide text-white uppercase">
            FUNÇÕES DE DESEMPENHO
          </h2>
        </div>

        <div className="flex flex-col gap-1.5">
          {perfItems.map((item) => {
            const active = performanceFlags[item.key];
            return (
              <div
                key={item.key}
                className="flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-4 h-4 flex items-center justify-center shrink-0">
                    {item.icon}
                  </span>
                  <span className="text-[12px] font-medium text-white truncate">
                    {item.label}
                  </span>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={active}
                  aria-label={item.label}
                  onClick={() => onToggleFlag(item.key)}
                  className={`w-[38px] h-[20px] rounded-full p-0.5 transition-colors flex items-center shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#e11d1d] justify-end shadow-[0_0_8px_rgba(239,68,68,0.65)]'
                      : 'bg-zinc-800 border border-red-900 justify-start'
                  }`}
                >
                  <span className="w-[15px] h-[15px] rounded-full bg-white block" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
