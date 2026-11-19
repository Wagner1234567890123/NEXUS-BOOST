import React from 'react';
import {
  BatteryCharging,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Hexagon,
  Layers,
  Star,
  Trash2,
  Trophy,
} from 'lucide-react';

export type MoreActionId =
  | 'memory'
  | 'cpu'
  | 'background'
  | 'graphics'
  | 'economy';

interface MoreFunctionsScreenProps {
  economyMode: boolean;
  gpuHighPerf: boolean;
  onRunAction: (action: MoreActionId) => void;
  onOpenPremium: () => void;
  onClearGameData: () => void;
  onBack: () => void;
}

export const MoreFunctionsScreen: React.FC<MoreFunctionsScreenProps> = ({
  economyMode,
  gpuHighPerf,
  onRunAction,
  onOpenPremium,
  onClearGameData,
  onBack,
}) => {
  const rows: {
    id: MoreActionId;
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    active?: boolean;
  }[] = [
    {
      id: 'memory',
      title: 'Limpeza de Memória',
      subtitle: 'Livre mais memória RAM',
      icon: (
        <div className="w-8 h-8 rounded-lg border border-[#ff2e2e]/70 bg-[#2b0404] flex items-center justify-center text-[#ff2929]">
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="4" y="4" width="16" height="16" rx="2" />
            <circle cx="12" cy="10" r="2.2" fill="currentColor" />
            <path d="M8.5 16.5c.8-2 6.2-2 7 0" strokeLinecap="round" />
          </svg>
        </div>
      ),
    },
    {
      id: 'cpu',
      title: 'Acelerar Processador',
      subtitle: 'Máximo desempenho',
      icon: (
        <div className="w-8 h-8 rounded-lg border border-[#ff2e2e]/70 bg-[#2b0404] flex items-center justify-center text-[#ff2929]">
          <Cpu className="w-5 h-5" />
        </div>
      ),
    },
    {
      id: 'background',
      title: 'Desativar Apps em Segundo Plano',
      subtitle: 'Deixe seu jogo mais leve',
      icon: (
        <div className="w-8 h-8 rounded-lg border border-[#ff2e2e]/70 bg-[#2b0404] flex items-center justify-center text-[#ff2929]">
          <Layers className="w-5 h-5" />
        </div>
      ),
    },
    {
      id: 'graphics',
      title: 'Melhorar Desempenho Gráfico',
      subtitle: gpuHighPerf ? 'Gráficos mais fluidos (Ativo)' : 'Gráficos mais fluidos',
      icon: (
        <div className="w-8 h-8 rounded-lg border border-[#ff2e2e]/70 bg-[#2b0404] flex items-center justify-center text-[#ff2929]">
          <Hexagon className="w-5 h-5" />
        </div>
      ),
      active: gpuHighPerf,
    },
    {
      id: 'economy',
      title: 'Modo Economia',
      subtitle: economyMode ? 'Economize bateria (Ativo)' : 'Economize bateria',
      icon: (
        <div className="w-8 h-8 rounded-lg border border-[#ff2e2e]/70 bg-[#2b0404] flex items-center justify-center text-[#ff2929]">
          <BatteryCharging className="w-5 h-5" />
        </div>
      ),
      active: economyMode,
    },
  ];

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
        <Star
          className="w-8 h-8 text-[#ff1e1e] fill-[#ff1e1e] shrink-0"
          style={{ filter: 'drop-shadow(0 0 8px rgba(255,30,30,0.85))' }}
        />
        <div className="leading-tight">
          <h1 className="font-display text-[22px] font-black tracking-wide text-white uppercase leading-none">
            MAIS FUNÇÕES
          </h1>
          <p className="text-[11.5px] text-white/85 mt-0.5">
            Tudo para um desempenho perfeito!
          </p>
        </div>
      </header>

      {/* 5 Feature Rows */}
      <div className="flex flex-col gap-2">
        {rows.map((row) => (
          <button
            key={row.id}
            type="button"
            onClick={() => onRunAction(row.id)}
            className={`nexus-card-interactive rounded-2xl px-3 py-2 flex items-center justify-between gap-2.5 text-left cursor-pointer min-h-[54px] ${
              row.active ? 'ring-1 ring-red-400/80' : ''
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              {row.icon}
              <div className="min-w-0 leading-tight">
                <div className="text-[13.5px] font-bold text-white truncate">
                  {row.title}
                </div>
                <div className="text-[11px] text-white/80 truncate mt-0.5">
                  {row.subtitle}
                </div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#ff2929] stroke-[2.8] shrink-0" />
          </button>
        ))}
      </div>

      {/* Gold Premium Banner */}
      <button
        type="button"
        onClick={onOpenPremium}
        className="nexus-gold-banner rounded-full px-3.5 py-2 flex items-center gap-3 text-left cursor-pointer hover:brightness-110 active:scale-[0.99] transition-all"
      >
        <div className="w-9 h-9 rounded-full bg-amber-500/15 border border-amber-400/50 flex items-center justify-center shrink-0">
          <Trophy
            className="w-6 h-6 text-[#facc15] fill-[#facc15]"
            style={{ filter: 'drop-shadow(0 0 6px rgba(250,204,21,0.7))' }}
          />
        </div>
        <div className="min-w-0 leading-tight">
          <div className="text-[14px] font-extrabold text-[#fde047] truncate">
            Outras Funções Premium
          </div>
          <div className="text-[11px] text-white/95 truncate mt-0.5">
            Recursos extras para você jogar melhor!
          </div>
        </div>
      </button>

      {/* Bottom Clear Game Data CTA */}
      <button
        type="button"
        onClick={onClearGameData}
        className="w-full rounded-full py-2.5 px-5 nexus-red-cta flex items-center justify-center gap-2.5 cursor-pointer transition-transform active:scale-[0.985] mb-0.5"
      >
        <Trash2 className="w-5 h-5 text-[#ff3b3b] drop-shadow-[0_0_6px_rgba(255,40,40,0.85)]" />
        <span className="font-display text-[19px] font-black tracking-wider text-white uppercase">
          LIMPAR DADOS DO JOGO
        </span>
      </button>
    </div>
  );
};
