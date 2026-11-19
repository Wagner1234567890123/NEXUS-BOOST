import React from 'react';
import { Gamepad2, Home, SlidersHorizontal, Wifi } from 'lucide-react';
import { NavTabId, ScreenId } from '../types/app';
import { RocketIcon } from './Icons';

interface PhoneShellProps {
  activeScreen: ScreenId;
  onNavigateTab: (tab: NavTabId) => void;
  children: React.ReactNode;
  compact?: boolean;
}

export function getActiveTabForScreen(screen: ScreenId): NavTabId {
  switch (screen) {
    case 'home':
    case 'slow-walk':
      return 'home';
    case 'fps':
    case 'generate-sensitivity':
      return 'boost';
    case 'sensitivity':
    case 'more':
      return 'more';
  }
}

export const PhoneShell: React.FC<PhoneShellProps> = ({
  activeScreen,
  onNavigateTab,
  children,
  compact = false,
}) => {
  const activeTab = getActiveTabForScreen(activeScreen);

  return (
    <div
      className={`relative flex flex-col overflow-hidden nexus-bg-pattern nexus-frame-border rounded-[28px] select-none ${
        compact ? 'w-[360px] h-[720px]' : 'w-full max-w-[390px] h-[760px] sm:h-[780px]'
      }`}
    >
      {/* Top Status Bar */}
      <div className="flex items-center justify-between px-4 pt-2 pb-1 text-[12px] font-bold tracking-tight text-white shrink-0 z-10">
        <span className="font-mono-num">15:24</span>
        <div className="flex items-center gap-1.5">
          {/* Shield/Signal icon matching status bar */}
          <svg viewBox="0 0 18 18" className="w-3.5 h-3.5 fill-white/95">
            <path d="M9 1.5L3 4v4.5c0 3.7 2.55 7.15 6 8 3.45-.85 6-4.3 6-8V4L9 1.5zm.5 10.5l-1.5-2h1.2V6l1.8 2.5H9.8V12h-.3z" />
          </svg>
          <Wifi className="w-3.5 h-3.5 text-white stroke-[2.4]" />
          {/* Battery icon */}
          <svg viewBox="0 0 22 12" className="w-4 h-3">
            <rect x="1" y="1" width="17" height="10" rx="2" stroke="#ffffff" strokeWidth="1.4" fill="none" />
            <rect x="2.6" y="2.6" width="13" height="6.8" rx="1" fill="#ffffff" />
            <rect x="18.5" y="3.8" width="2.2" height="4.4" rx="0.8" fill="#ffffff" />
          </svg>
          <span className="font-mono-num text-[11.5px] font-bold">95%</span>
        </div>
      </div>

      {/* Main Screen Content */}
      <div className="flex-1 min-h-0 flex flex-col overflow-y-auto no-scrollbar px-2.5 pb-1.5 relative z-10">
        {children}
      </div>

      {/* Bottom Navigation Bar */}
      <nav
        aria-label="Navegação principal"
        className="relative shrink-0 bg-gradient-to-b from-[#170204] via-[#0c0102] to-[#050001] border-t-[1.5px] border-[#e11d1d] shadow-[0_-4px_14px_rgba(255,20,20,0.4)] px-2 pt-1.5 pb-2 z-20"
      >
        <div className="grid grid-cols-4 items-center">
          <button
            type="button"
            onClick={() => onNavigateTab('home')}
            className="flex flex-col items-center justify-center min-h-[44px] gap-0.5 cursor-pointer transition-transform active:scale-95"
          >
            <Home
              className={`w-[22px] h-[22px] ${
                activeTab === 'home'
                  ? 'text-[#ff1f1f] fill-[#ff1f1f] drop-shadow-[0_0_8px_rgba(255,30,30,0.9)]'
                  : 'text-white fill-white'
              }`}
            />
            <span
              className={`text-[11px] font-bold leading-none ${
                activeTab === 'home' ? 'text-[#ff2929]' : 'text-white'
              }`}
            >
              Início
            </span>
          </button>

          <button
            type="button"
            onClick={() => onNavigateTab('boost')}
            className="flex flex-col items-center justify-center min-h-[44px] gap-0.5 cursor-pointer transition-transform active:scale-95"
          >
            <RocketIcon
              className="w-[23px] h-[23px]"
              color={activeTab === 'boost' ? '#ff1f1f' : '#ffffff'}
              glow={activeTab === 'boost'}
            />
            <span
              className={`text-[11px] font-bold leading-none ${
                activeTab === 'boost' ? 'text-[#ff2929]' : 'text-white'
              }`}
            >
              Boost
            </span>
          </button>

          <button
            type="button"
            onClick={() => onNavigateTab('games')}
            className="flex flex-col items-center justify-center min-h-[44px] gap-0.5 cursor-pointer transition-transform active:scale-95"
          >
            <Gamepad2
              className={`w-[23px] h-[23px] ${
                activeTab === 'games'
                  ? 'text-[#ff1f1f] drop-shadow-[0_0_8px_rgba(255,30,30,0.9)]'
                  : 'text-white'
              }`}
              strokeWidth={2.2}
            />
            <span
              className={`text-[11px] font-bold leading-none ${
                activeTab === 'games' ? 'text-[#ff2929]' : 'text-white'
              }`}
            >
              Jogos
            </span>
          </button>

          <button
            type="button"
            onClick={() => onNavigateTab('more')}
            className="flex flex-col items-center justify-center min-h-[44px] gap-0.5 cursor-pointer transition-transform active:scale-95"
          >
            <SlidersHorizontal
              className={`w-[21px] h-[21px] ${
                activeTab === 'more'
                  ? 'text-[#ff1f1f] drop-shadow-[0_0_8px_rgba(255,30,30,0.9)]'
                  : 'text-white'
              }`}
              strokeWidth={2.4}
            />
            <span
              className={`text-[11px] font-bold leading-none ${
                activeTab === 'more' ? 'text-[#ff2929]' : 'text-white'
              }`}
            >
              Mais
            </span>
          </button>
        </div>
      </nav>
    </div>
  );
};
