import { BrandId, DeviceCapabilities, SensitivityValues } from '../types/app';

export const DEFAULT_SENSITIVITY: SensitivityValues = {
  geral: 100,
  redDot: 85,
  mira2x: 75,
  mira4x: 65,
  miraAwm: 50,
  olhadinha: 80,
};

export const BRAND_METADATA: Record<
  BrandId,
  { label: string; sampleDevice: string; dpiBias: number }
> = {
  motorola: { label: 'Motorola', sampleDevice: 'Motorola Moto G04s', dpiBias: 0 },
  samsung: { label: 'Samsung', sampleDevice: 'Samsung Galaxy A54', dpiBias: -3 },
  xiaomi: { label: 'Xiaomi', sampleDevice: 'Xiaomi 13T', dpiBias: -4 },
  redmi: { label: 'Redmi', sampleDevice: 'Redmi Note 13', dpiBias: -2 },
  poco: { label: 'POCO', sampleDevice: 'POCO X6 Pro', dpiBias: -5 },
  realme: { label: 'Realme', sampleDevice: 'Realme C67', dpiBias: -1 },
  infinix: { label: 'Infinix', sampleDevice: 'Infinix Note 40', dpiBias: 0 },
  tecno: { label: 'Tecno', sampleDevice: 'Tecno Pova 6', dpiBias: -2 },
  other: { label: 'Outras', sampleDevice: 'Dispositivo Compatível', dpiBias: -2 },
};

function clampSens(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

export function generateBrandSensitivity(
  brand: BrandId,
  capabilities?: DeviceCapabilities | null
): SensitivityValues {
  if (brand === 'motorola') {
    // Matches the exact default calibration in Screen 3 for Motorola Moto G04s
    return { ...DEFAULT_SENSITIVITY };
  }

  const dprAdjust = capabilities?.pixelRatio && capabilities.pixelRatio >= 3 ? -2 : 0;
  const bias = BRAND_METADATA[brand].dpiBias + dprAdjust;

  return {
    geral: clampSens(100 + bias),
    redDot: clampSens(85 + bias),
    mira2x: clampSens(75 + bias),
    mira4x: clampSens(65 + bias),
    miraAwm: clampSens(50 + Math.round(bias / 2)),
    olhadinha: clampSens(80 + bias),
  };
}

export function detectWebGLRenderer(): string | null {
  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl2', { powerPreference: 'high-performance' }) ||
      canvas.getContext('webgl', { powerPreference: 'high-performance' });
    if (!gl) return null;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    if (ext) {
      const renderer = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL);
      if (typeof renderer === 'string' && renderer.trim()) {
        return renderer;
      }
    }
    const baseRenderer = gl.getParameter(gl.RENDERER);
    return typeof baseRenderer === 'string' ? baseRenderer : null;
  } catch {
    return null;
  }
}

export function measureRealRefreshRate(sampleMs = 450): Promise<number> {
  return new Promise((resolve) => {
    let frames = 0;
    let start: number | null = null;
    let rafId = 0;

    const tick = (now: number) => {
      if (start === null) start = now;
      frames += 1;
      const elapsed = now - start;
      if (elapsed >= sampleMs) {
        const hz = Math.max(1, Math.round((frames / elapsed) * 1000));
        resolve(hz);
        return;
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    setTimeout(() => {
      cancelAnimationFrame(rafId);
      if (frames > 1 && start !== null) {
        resolve(Math.max(1, Math.round((frames / sampleMs) * 1000)));
      } else {
        resolve(60);
      }
    }, sampleMs + 150);
  });
}

export async function collectDeviceCapabilities(): Promise<DeviceCapabilities> {
  const nav = navigator as Navigator & {
    deviceMemory?: number;
    getBattery?: () => Promise<{ level: number; charging: boolean }>;
  };

  let batteryLevel: number | null = null;
  let batteryCharging: boolean | null = null;

  if (typeof nav.getBattery === 'function') {
    try {
      const battery = await nav.getBattery();
      batteryLevel = Math.round(battery.level * 100);
      batteryCharging = Boolean(battery.charging);
    } catch {
      // Battery API denied or unavailable
    }
  }

  const measuredHz = await measureRealRefreshRate(380);
  const gpuRenderer = detectWebGLRenderer();

  return {
    cores: typeof navigator.hardwareConcurrency === 'number' ? navigator.hardwareConcurrency : null,
    memoryGb: typeof nav.deviceMemory === 'number' ? nav.deviceMemory : null,
    pixelRatio: Number((window.devicePixelRatio || 1).toFixed(2)),
    resolution: `${window.screen.width}x${window.screen.height}`,
    gpuRenderer,
    measuredHz,
    batteryLevel,
    batteryCharging,
    wakeLockSupported: 'wakeLock' in navigator,
    platformHint: navigator.userAgent.includes('Android')
      ? 'Android WebView / Navegador'
      : navigator.platform || 'Navegador Web',
  };
}

export async function runRealMemoryCleanup(): Promise<{
  cachesCleared: number;
  heapBeforeMb: number | null;
  heapAfterMb: number | null;
}> {
  const perf = performance as Performance & {
    memory?: { usedJSHeapSize: number; totalJSHeapSize: number };
  };
  const heapBeforeMb = perf.memory
    ? Number((perf.memory.usedJSHeapSize / (1024 * 1024)).toFixed(1))
    : null;

  let cachesCleared = 0;
  if ('caches' in window) {
    try {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
      cachesCleared = keys.length;
    } catch {
      // Ignore restricted cache environments
    }
  }

  // Release temporary session storage artifacts not tied to user profile
  try {
    const tempKeys: string[] = [];
    for (let i = 0; i < sessionStorage.length; i += 1) {
      const key = sessionStorage.key(i);
      if (key) tempKeys.push(key);
    }
    tempKeys.forEach((k) => sessionStorage.removeItem(k));
  } catch {
    // Ignore storage restriction
  }

  const heapAfterMb = perf.memory
    ? Number((perf.memory.usedJSHeapSize / (1024 * 1024)).toFixed(1))
    : null;

  return { cachesCleared, heapBeforeMb, heapAfterMb };
}

export async function clearAllOptimizerData(): Promise<number> {
  let clearedCount = 0;
  try {
    clearedCount += sessionStorage.length;
    sessionStorage.clear();
  } catch {
    // ignore
  }
  if ('caches' in window) {
    try {
      const keys = await caches.keys();
      clearedCount += keys.length;
      await Promise.all(keys.map((k) => caches.delete(k)));
    } catch {
      // ignore
    }
  }
  return clearedCount;
}
