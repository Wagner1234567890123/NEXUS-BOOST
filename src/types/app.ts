export type ScreenId =
  | 'home'
  | 'fps'
  | 'sensitivity'
  | 'slow-walk'
  | 'generate-sensitivity'
  | 'more';

export type NavTabId = 'home' | 'boost' | 'games' | 'more';

export type FpsOption = 60 | 75 | 90 | 120 | 144 | 165 | 180 | 210 | 225 | 240;

export type BrandId =
  | 'motorola'
  | 'samsung'
  | 'xiaomi'
  | 'redmi'
  | 'poco'
  | 'realme'
  | 'infinix'
  | 'tecno'
  | 'other';

export interface SensitivityValues {
  geral: number;
  redDot: number;
  mira2x: number;
  mira4x: number;
  miraAwm: number;
  olhadinha: number;
}

export interface PerformanceFlags {
  maxPerformance: boolean;
  reduceStutter: boolean;
  stabilizeFps: boolean;
  antiLag: boolean;
  memoryOpt: boolean;
}

export interface DeviceCapabilities {
  cores: number | null;
  memoryGb: number | null;
  pixelRatio: number;
  resolution: string;
  gpuRenderer: string | null;
  measuredHz: number | null;
  batteryLevel: number | null;
  batteryCharging: boolean | null;
  wakeLockSupported: boolean;
  platformHint: string;
}

export interface PhoneModelProfile {
  id: string;
  brand: BrandId;
  manufacturer: string;
  model: string;
  screenHz: number;
  touchHz: number;
  sensitivity: SensitivityValues;
  isCustom?: boolean;
}

export interface AppSettingsState {
  boostActive: boolean;
  selectedFps: FpsOption;
  appliedFps: FpsOption;
  selectedModelId: string;
  detectedDeviceLabel: string;
  selectedBrand: BrandId;
  sensitivity: SensitivityValues;
  slowWalkEnabled: boolean;
  slowWalkSpeed: number;
  performanceFlags: PerformanceFlags;
  economyMode: boolean;
  gpuHighPerf: boolean;
}
