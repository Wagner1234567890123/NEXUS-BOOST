import React from 'react';
import { BrandId } from '../types/app';

export function RocketIcon({
  className = 'w-6 h-6',
  color = '#ff1f1f',
  glow = true,
}: {
  className?: string;
  color?: string;
  glow?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      style={glow ? { filter: 'drop-shadow(0 0 6px rgba(255,30,30,0.85))' } : undefined}
    >
      <path
        d="M27.2 4.8C22.4 5.2 17.5 7.4 13.7 11.2L10.8 14.1L6.2 13.6L3.6 16.2L8.4 18.6L13.4 23.6L15.8 28.4L18.4 25.8L17.9 21.2L20.8 18.3C24.6 14.5 26.8 9.6 27.2 4.8Z"
        fill={color}
      />
      <circle cx="19.5" cy="12.5" r="2.6" fill="#090203" />
      <path
        d="M8.5 23.5C6.5 23.8 5 25.4 4.5 27.5C6.6 27 8.2 25.5 8.5 23.5Z"
        fill={color}
      />
    </svg>
  );
}

export function GoldCrownIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 20"
      fill="none"
      className={className}
      style={{ filter: 'drop-shadow(0 0 4px rgba(250,204,21,0.55))' }}
    >
      <path
        d="M2.5 16L1.5 6L7.5 10.5L12 3L16.5 10.5L22.5 6L21.5 16H2.5Z"
        fill="url(#goldCrownGrad)"
        stroke="#fef08a"
        strokeWidth="0.9"
        strokeLinejoin="round"
      />
      <rect x="2.5" y="16.8" width="19" height="2" rx="0.8" fill="#eab308" />
      <circle cx="1.8" cy="5.2" r="1.3" fill="#fde047" />
      <circle cx="12" cy="2.3" r="1.4" fill="#fde047" />
      <circle cx="22.2" cy="5.2" r="1.3" fill="#fde047" />
      <defs>
        <linearGradient id="goldCrownGrad" x1="12" y1="3" x2="12" y2="16" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fef08a" />
          <stop offset="0.55" stopColor="#facc15" />
          <stop offset="1" stopColor="#ca8a04" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function FlameBadgeIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={{ filter: 'drop-shadow(0 0 5px rgba(255,60,0,0.85))' }}
    >
      <circle cx="12" cy="12" r="10.5" fill="#991b1b" stroke="#ff3b3b" strokeWidth="1.4" />
      <path
        d="M12.6 5.5C13.8 7.5 15.8 8.9 15.8 11.7C15.8 14.3 14.1 16.3 12 16.3C9.9 16.3 8.2 14.3 8.2 11.9C8.2 10.2 9.1 8.8 10.1 7.8C10 9.1 10.7 10 11.4 10.2C11.1 8.6 11.7 6.9 12.6 5.5Z"
        fill="#fb923c"
      />
      <path
        d="M12 10.5C12.8 11.5 13.5 12.3 13.5 13.5C13.5 14.7 12.8 15.6 12 15.6C11.2 15.6 10.5 14.7 10.5 13.6C10.5 12.5 11.2 11.6 12 10.5Z"
        fill="#fef08a"
      />
    </svg>
  );
}

export function GreenCheckCircleIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={{ filter: 'drop-shadow(0 0 5px rgba(34,197,94,0.7))' }}
    >
      <circle cx="12" cy="12" r="10.5" fill="#22c55e" />
      <path
        d="M7.5 12.3L10.6 15.3L16.7 8.9"
        stroke="#052e16"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CrosshairTargetIcon({
  className = 'w-6 h-6',
  color = '#ff1f1f',
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      style={{ filter: 'drop-shadow(0 0 5px rgba(255,30,30,0.75))' }}
    >
      <circle cx="16" cy="16" r="10.5" stroke={color} strokeWidth="2.2" />
      <circle cx="16" cy="16" r="5.2" stroke={color} strokeWidth="1.8" />
      <path
        d="M16 2.5V8.5M16 23.5V29.5M2.5 16H8.5M23.5 16H29.5"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="16" cy="16" r="1.8" fill={color} />
    </svg>
  );
}

export function TrophyFeatureIcon({
  className = 'w-6 h-6',
  color = '#ff1f1f',
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      style={{ filter: 'drop-shadow(0 0 5px rgba(255,30,30,0.75))' }}
    >
      <path
        d="M9 6H23V12.5C23 16.6 19.9 19.8 16 19.8C12.1 19.8 9 16.6 9 12.5V6Z"
        fill={color}
      />
      <path
        d="M9 8.5H5.5C5.5 12.8 7.2 14.5 9.2 14.5M23 8.5H26.5C26.5 12.8 24.8 14.5 22.8 14.5"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path d="M16 19.8V24.5M11 26.5H21" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function HumanSilhouetteIcon({
  className = 'w-6 h-6',
  color = '#ff1f1f',
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      style={{ filter: 'drop-shadow(0 0 5px rgba(255,30,30,0.75))' }}
    >
      <circle cx="16" cy="9.5" r="4.5" fill={color} />
      <path
        d="M8.5 25.5C8.5 20.4 11.8 16.8 16 16.8C20.2 16.8 23.5 20.4 23.5 25.5"
        fill={color}
      />
    </svg>
  );
}

export function StabilityKitIcon({
  className = 'w-6 h-6',
  color = '#ff1f1f',
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      style={{ filter: 'drop-shadow(0 0 5px rgba(255,30,30,0.75))' }}
    >
      <rect x="4.5" y="9" width="23" height="17" rx="3.5" stroke={color} strokeWidth="2.2" fill="rgba(255,20,20,0.16)" />
      <path d="M11.5 9V6.5C11.5 5.6 12.2 5 13 5H19C19.8 5 20.5 5.6 20.5 6.5V9" stroke={color} strokeWidth="2.2" />
      <path d="M16 13.5V21.5M12 17.5H20" stroke={color} strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

export function WalkingFigureSvg({
  stroke = '#ff1e1e',
  strokeWidth = 2.4,
  fill = 'rgba(255, 20, 20, 0.12)',
  className = 'w-12 h-24',
}: {
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 64 112" fill="none" className={className}>
      {/* Head */}
      <circle cx="33" cy="14" r="8.5" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
      {/* Torso & arms/legs walking right */}
      <path
        d="M32 23.5L26 52L17 77L12 103L19.5 104.5L26 80L31.5 62L39.5 79L48 103L55.5 100.5L47 74L37.5 52L41 36L52 46L56 41L42 26.5C39.5 24 35.8 23.2 32 23.5Z"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Left back arm */}
      <path
        d="M29 27L16 42L12 56L17.5 57.5L22 45L28.5 36"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BrandBadge({ brand }: { brand: BrandId }) {
  switch (brand) {
    case 'motorola':
      return (
        <div className="w-7 h-7 rounded-full bg-gradient-to-b from-sky-400 to-blue-700 flex items-center justify-center shadow-[0_0_8px_rgba(56,189,248,0.55)]">
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
            <path d="M12 3.5L7.6 18H9.8L12 11L14.2 18H16.4L12 3.5ZM12 7.2L10.3 13.5L8.4 8.5L5.2 18.2H3.5L8.1 4.5L12 14.5L15.9 4.5L20.5 18.2H18.8L15.6 8.5L13.7 13.5L12 7.2Z" />
          </svg>
        </div>
      );
    case 'samsung':
      return (
        <div className="w-12 h-6 rounded-full bg-gradient-to-b from-blue-500 to-blue-800 flex items-center justify-center border border-sky-300/40 shadow-[0_0_8px_rgba(59,130,246,0.5)]">
          <span className="text-[7px] font-extrabold tracking-tight text-white">SAMSUNG</span>
        </div>
      );
    case 'xiaomi':
      return (
        <div className="w-7 h-7 rounded-lg bg-gradient-to-b from-orange-400 to-orange-600 flex items-center justify-center shadow-[0_0_8px_rgba(249,115,22,0.55)]">
          <span className="text-[11px] font-black text-white tracking-tighter">MI</span>
        </div>
      );
    case 'redmi':
      return (
        <div className="w-7 h-7 rounded-lg border-2 border-amber-400 bg-amber-500/20 flex items-center justify-center shadow-[0_0_8px_rgba(251,191,36,0.5)]">
          <span className="text-[13px] font-black text-amber-300">R</span>
        </div>
      );
    case 'poco':
      return (
        <div className="w-7 h-7 rounded-lg border-2 border-yellow-400 bg-yellow-500/15 flex items-center justify-center shadow-[0_0_8px_rgba(250,204,21,0.5)]">
          <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-yellow-300" fill="none" strokeWidth="2.4">
            <path d="M12 4V11" strokeLinecap="round" />
            <path d="M7.5 6.8A6.5 6.5 0 1 0 16.5 6.8" strokeLinecap="round" />
          </svg>
        </div>
      );
    case 'realme':
      return (
        <div className="w-7 h-7 rounded-lg border-2 border-yellow-400 bg-yellow-500/20 flex items-center justify-center shadow-[0_0_8px_rgba(250,204,21,0.5)]">
          <span className="text-[13px] font-black text-yellow-300">R</span>
        </div>
      );
    case 'infinix':
      return (
        <div className="w-7 h-7 rounded-md border-2 border-emerald-400 bg-emerald-500/20 flex items-center justify-center shadow-[0_0_8px_rgba(52,211,153,0.55)]">
          <div className="w-3.5 h-3.5 rounded-sm bg-emerald-400/30 border border-emerald-300" />
        </div>
      );
    case 'tecno':
      return (
        <div className="w-7 h-7 rounded-md border-2 border-blue-400 bg-blue-500/20 flex items-center justify-center shadow-[0_0_8px_rgba(96,165,250,0.55)]">
          <span className="text-[12px] font-black text-sky-300">T</span>
        </div>
      );
    case 'other':
      return (
        <div className="w-7 h-7 rounded-full border-2 border-teal-400 bg-teal-500/20 flex items-center justify-center shadow-[0_0_8px_rgba(45,212,191,0.55)]">
          <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-teal-300" fill="none" strokeWidth="2">
            <path d="M4 13V11A8 8 0 0 1 20 11V13" />
            <rect x="3" y="12" width="3.5" height="5" rx="1.5" />
            <rect x="17.5" y="12" width="3.5" height="5" rx="1.5" />
            <circle cx="12" cy="14" r="1.5" fill="#5eead4" />
          </svg>
        </div>
      );
  }
}

export function CpuChipIcon({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className}>
      <rect x="8" y="8" width="16" height="16" rx="2.5" stroke="#ffffff" strokeWidth="2.2" />
      <rect x="12" y="12" width="8" height="8" rx="1" fill="#ffffff" />
      <path
        d="M12 4V8M16 4V8M20 4V8M12 24V28M16 24V28M20 24V28M4 12H8M4 16H8M4 20H8M24 12H28M24 16H28M24 20H28"
        stroke="#ffffff"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
