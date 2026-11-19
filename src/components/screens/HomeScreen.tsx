import React from 'react';
import { ChevronRight, Settings, Zap } from 'lucide-react';
import { ScreenId } from '../../types/app';
import {
  CrosshairTargetIcon,
  GreenCheckCircleIcon,
  HumanSilhouetteIcon,
  RocketIcon,
  StabilityKitIcon,
  TrophyFeatureIcon,
} from '../Icons';

interface HomeScreenProps {
  boostActive: boolean;
  onToggleBoost: () => void;
  onNavigate: (screen: ScreenId) => void;
  onOpenShizukuInfo: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  boostActive,
  onToggleBoost,
  onNavigate,
  onOpenShizukuInfo,
}) => {
  return (
    <div className="flex flex-col flex-1 justify-between gap-1.5 pt-0.5">
      {/* Top App Header */}
      <header className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <RocketIcon className="w-8 h-8 shrink-0" />
          <div className="leading-none">
            <div className="flex items-baseline gap-1 font-display text-[22px] font-black italic tracking-wide leading-none">
              <span className="text-white drop-shadow-[0_1px_4px_rgba(255,255,255,0.25)]">
                NEXUS
              </span>
              <span className="text-[#ff1e1e] drop-shadow-[0_0_8px_rgba(255,20,20,0.8)]">
                BOOST
              </span>
            </div>
            <div className="flex items-center gap-1 text-[12px] font-semibold text-white/95 mt-0.5">
              <span>Max Performance</span>
              <span aria-hidden="true">👑</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('more')}
          aria-label="Abrir configurações e mais funções"
          className="min-w-[44px] min-h-[44px] flex items-center justify-center text-white hover:text-red-400 transition-colors cursor-pointer"
        >
          <Settings className="w-7 h-7 stroke-[2]" />
        </button>
      </header>

      {/* Hero Artwork + Title Block */}
      <section className="relative flex items-center h-[196px] overflow-hidden rounded-xl">
        {/* Background crimson atmospheric glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 28% 45%, rgba(255,20,20,0.38) 0%, rgba(120,0,0,0.18) 45%, transparent 75%)',
          }}
        />

        {/* Exact Character Illustration from reference */}
        <div className="relative h-full w-[58%] shrink-0">
          <img
            src="/assets/hero_character.png"
            alt="Personagem NEXUS BOOST com coroa dourada e máscara N"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover object-left-top"
            style={{
              WebkitMaskImage:
                'linear-gradient(to right, rgba(0,0,0,1) 74%, rgba(0,0,0,0) 100%)',
              maskImage:
                'linear-gradient(to right, rgba(0,0,0,1) 74%, rgba(0,0,0,0) 100%)',
            }}
          />
        </div>

        {/* Right Side Slanted Display Typography */}
        <div className="relative z-10 flex flex-col items-center justify-center w-[46%] -ml-4 pr-1 text-center -rotate-6">
          <span
            className="font-display font-black italic text-[40px] leading-[0.84] tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-400"
            style={{ filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.95))' }}
          >
            NEXUS
          </span>
          <span
            className="font-display font-black italic text-[42px] leading-[0.86] tracking-tight text-[#ff1a1a]"
            style={{
              textShadow: '0 3px 8px rgba(0,0,0,0.95), 0 0 14px rgba(255,20,20,0.6)',
            }}
          >
            BOOST
          </span>
          <div className="mt-1.5 font-display font-extrabold italic text-[14.5px] leading-[1.08] tracking-wide text-white uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
            <div>JOGUE SEM LAG</div>
            <div>E FAÇA MAIS CAPA!</div>
          </div>
        </div>
      </section>

      {/* Primary ATIVAR CTA */}
      <button
        type="button"
        onClick={onToggleBoost}
        className={`relative w-full rounded-full py-2 px-4 flex flex-col items-center justify-center overflow-hidden cursor-pointer transition-all nexus-red-cta ${
          boostActive
            ? 'ring-2 ring-red-400 shadow-[0_0_26px_rgba(255,40,40,0.9)]'
            : ''
        }`}
      >
        {/* Decorative inner curved energy arcs matching image */}
        <svg
          viewBox="0 0 40 50"
          className="absolute left-1.5 top-1/2 -translate-y-1/2 w-6 h-9 opacity-60 pointer-events-none"
          fill="none"
        >
          <path d="M22 4C10 14 10 36 22 46" stroke="#ff9a9a" strokeWidth="1.6" />
          <path d="M30 8C20 16 20 34 30 42" stroke="#ff5c5c" strokeWidth="1.3" />
        </svg>
        <svg
          viewBox="0 0 40 50"
          className="absolute right-1.5 top-1/2 -translate-y-1/2 w-6 h-9 opacity-60 pointer-events-none"
          fill="none"
        >
          <path d="M18 4C30 14 30 36 18 46" stroke="#ff9a9a" strokeWidth="1.6" />
          <path d="M10 8C20 16 20 34 10 42" stroke="#ff5c5c" strokeWidth="1.3" />
        </svg>

        <div className="flex items-center gap-2 leading-none">
          <Zap
            className={`w-6 h-6 ${
              boostActive ? 'text-yellow-300 fill-yellow-300' : 'text-[#ff3b3b] fill-[#ff3b3b]'
            } drop-shadow-[0_0_6px_rgba(255,80,80,0.9)]`}
          />
          <span className="font-display text-[28px] font-black tracking-wider text-white uppercase leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
            {boostActive ? 'ATIVADO' : 'ATIVAR'}
          </span>
        </div>
        <span className="text-[11px] font-semibold text-white/95 tracking-tight mt-0.5">
          {boostActive ? 'NEXUS BOOST em execução' : 'Toque para ativar o NEXUS BOOST'}
        </span>
      </button>

      {/* Shizuku Status Pill */}
      <button
        type="button"
        onClick={onOpenShizukuInfo}
        className="w-full rounded-full py-1.5 px-3.5 flex items-center justify-between nexus-green-pill cursor-pointer transition-transform active:scale-[0.99]"
      >
        <span className="w-5" aria-hidden="true" />
        <div className="flex items-center gap-2">
          <GreenCheckCircleIcon className="w-5 h-5" />
          <span className="text-[14px] font-bold text-white tracking-tight">
            Shizuku: Pronto
          </span>
        </div>
        <ChevronRight className="w-5 h-5 text-[#22c55e] stroke-[2.8]" />
      </button>

      {/* 2x3 Feature Cards Grid */}
      <div className="grid grid-cols-2 gap-2 pb-1">
        <button
          type="button"
          onClick={() => onNavigate('fps')}
          className="nexus-card-interactive rounded-xl px-2.5 py-2 flex items-center gap-2 text-left cursor-pointer min-h-[54px]"
        >
          <TrophyFeatureIcon className="w-7 h-7 shrink-0" />
          <div className="min-w-0 leading-tight">
            <div className="font-display text-[14.5px] font-extrabold text-white tracking-wide uppercase truncate">
              FPS BOOST
            </div>
            <div className="text-[10.5px] text-white/85 truncate">Até 240 FPS</div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('sensitivity')}
          className="nexus-card-interactive rounded-xl px-2.5 py-2 flex items-center gap-2 text-left cursor-pointer min-h-[54px]"
        >
          <CrosshairTargetIcon className="w-7 h-7 shrink-0" />
          <div className="min-w-0 leading-tight">
            <div className="font-display text-[14.5px] font-extrabold text-white tracking-wide uppercase truncate">
              SENSIBILIDADE
            </div>
            <div className="text-[10.5px] text-white/85 truncate">Gerar Agora</div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('slow-walk')}
          className="nexus-card-interactive rounded-xl px-2.5 py-2 flex items-center gap-2 text-left cursor-pointer min-h-[54px]"
        >
          <HumanSilhouetteIcon className="w-7 h-7 shrink-0" />
          <div className="min-w-0 leading-tight">
            <div className="font-display text-[14.5px] font-extrabold text-white tracking-wide uppercase truncate">
              BONECO LENTO
            </div>
            <div className="text-[10.5px] text-white/85 truncate">Movimento Suave</div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('generate-sensitivity')}
          className="nexus-card-interactive rounded-xl px-2.5 py-2 flex items-center gap-2 text-left cursor-pointer min-h-[54px]"
        >
          <TrophyFeatureIcon className="w-7 h-7 shrink-0" />
          <div className="min-w-0 leading-tight">
            <div className="font-display text-[14.5px] font-extrabold text-white tracking-wide uppercase truncate">
              OTIMIZAÇÃO
            </div>
            <div className="text-[10.5px] text-white/85 truncate">Desempenho Máximo</div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('generate-sensitivity')}
          className="nexus-card-interactive rounded-xl px-2.5 py-2 flex items-center gap-2 text-left cursor-pointer min-h-[54px]"
        >
          <CrosshairTargetIcon className="w-7 h-7 shrink-0" />
          <div className="min-w-0 leading-tight">
            <div className="font-display text-[14.5px] font-extrabold text-white tracking-wide uppercase truncate">
              REDUÇÃO DE LAG
            </div>
            <div className="text-[10.5px] text-white/85 truncate">Jogo Mais Liso</div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('fps')}
          className="nexus-card-interactive rounded-xl px-2.5 py-2 flex items-center gap-2 text-left cursor-pointer min-h-[54px]"
        >
          <StabilityKitIcon className="w-7 h-7 shrink-0" />
          <div className="min-w-0 leading-tight">
            <div className="font-display text-[14.5px] font-extrabold text-white tracking-wide uppercase truncate">
              ESTABILIDADE
            </div>
            <div className="text-[10.5px] text-white/85 truncate">FPS Sempre Alto</div>
          </div>
        </button>
      </div>
    </div>
  );
};
