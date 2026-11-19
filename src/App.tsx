import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  AppSettingsState,
  BrandId,
  DeviceCapabilities,
  FpsOption,
  NavTabId,
  PerformanceFlags,
  ScreenId,
  SensitivityValues,
} from './types/app';
import {
  BRAND_METADATA,
  clearAllOptimizerData,
  collectDeviceCapabilities,
  DEFAULT_SENSITIVITY,
  generateBrandSensitivity,
  measureRealRefreshRate,
  runRealMemoryCleanup,
} from './utils/deviceOptimizer';
import { PhoneShell } from './components/PhoneShell';
import { HomeScreen } from './components/screens/HomeScreen';
import { FpsBoostScreen } from './components/screens/FpsBoostScreen';
import { SensitivityScreen } from './components/screens/SensitivityScreen';
import { SlowWalkScreen } from './components/screens/SlowWalkScreen';
import { GenerateSensitivityScreen } from './components/screens/GenerateSensitivityScreen';
import {
  MoreActionId,
  MoreFunctionsScreen,
} from './components/screens/MoreFunctionsScreen';
import { InfoDrawer } from './components/InfoDrawer';

const STORAGE_KEY = 'max_performance_nexus_settings_v1';

const INITIAL_SETTINGS: AppSettingsState = {
  boostActive: false,
  selectedFps: 240,
  appliedFps: 240,
  detectedDeviceLabel: 'Motorola Moto G04s',
  selectedBrand: 'motorola',
  sensitivity: { ...DEFAULT_SENSITIVITY },
  slowWalkEnabled: true,
  slowWalkSpeed: 0.35,
  performanceFlags: {
    maxPerformance: true,
    reduceStutter: true,
    stabilizeFps: true,
    antiLag: true,
    memoryOpt: true,
  },
  economyMode: false,
  gpuHighPerf: true,
};

function loadSavedSettings(): AppSettingsState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_SETTINGS;
    const parsed = JSON.parse(raw) as Partial<AppSettingsState>;
    return {
      ...INITIAL_SETTINGS,
      ...parsed,
      sensitivity: {
        ...INITIAL_SETTINGS.sensitivity,
        ...(parsed.sensitivity || {}),
      },
      performanceFlags: {
        ...INITIAL_SETTINGS.performanceFlags,
        ...(parsed.performanceFlags || {}),
      },
    };
  } catch {
    return INITIAL_SETTINGS;
  }
}

const SCREEN_LABELS: { id: ScreenId; label: string }[] = [
  { id: 'home', label: '1. Início' },
  { id: 'fps', label: '2. FPS Boost' },
  { id: 'sensitivity', label: '3. Sensibilidade' },
  { id: 'slow-walk', label: '4. Boneco Lento' },
  { id: 'generate-sensitivity', label: '5. Gerar Sensi' },
  { id: 'more', label: '6. Mais Funções' },
];

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>('home');
  const [viewMode, setViewMode] = useState<'single' | 'all6'>('single');
  const [settings, setSettings] = useState<AppSettingsState>(loadSavedSettings);
  const [capabilities, setCapabilities] = useState<DeviceCapabilities | null>(null);
  const [drawerMode, setDrawerMode] = useState<'shizuku' | 'premium' | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const wakeLockRef = useRef<{ release: () => Promise<void> } | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => {
      setToast(null);
    }, 2800);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // Ignore storage quota errors
    }
  }, [settings]);

  useEffect(() => {
    collectDeviceCapabilities().then((caps) => {
      setCapabilities(caps);
    });
    return () => {
      if (wakeLockRef.current) {
        wakeLockRef.current.release().catch(() => {});
      }
    };
  }, []);

  const handleNavigateTab = (tab: NavTabId) => {
    switch (tab) {
      case 'home':
        setActiveScreen('home');
        break;
      case 'boost':
        setActiveScreen('fps');
        break;
      case 'games':
        setActiveScreen('generate-sensitivity');
        break;
      case 'more':
        setActiveScreen('more');
        break;
    }
  };

  const handleToggleBoost = async () => {
    const nextActive = !settings.boostActive;

    if (nextActive) {
      // Real Web optimizations: measure display Hz + acquire WakeLock if available
      const hz = await measureRealRefreshRate(280);
      const nav = navigator as Navigator & {
        wakeLock?: { request: (type: 'screen') => Promise<{ release: () => Promise<void> }> };
      };
      let wakeLockMsg = '';
      if (nav.wakeLock) {
        try {
          wakeLockRef.current = await nav.wakeLock.request('screen');
          wakeLockMsg = ' · Tela ativa (WakeLock)';
        } catch {
          // WakeLock denied or unsupported in frame
        }
      }
      setSettings((prev) => ({ ...prev, boostActive: true }));
      showToast(`NEXUS BOOST ativado! Taxa medida: ${hz} Hz${wakeLockMsg}`);
    } else {
      if (wakeLockRef.current) {
        await wakeLockRef.current.release().catch(() => {});
        wakeLockRef.current = null;
      }
      setSettings((prev) => ({ ...prev, boostActive: false }));
      showToast('NEXUS BOOST desativado.');
    }
  };

  const handleApplyFps = async () => {
    const measured = await measureRealRefreshRate(300);
    setSettings((prev) => ({
      ...prev,
      appliedFps: prev.selectedFps,
      boostActive: true,
    }));
    showToast(
      `Perfil ${settings.selectedFps} FPS salvo! Tela atual operando em ${measured} Hz.`
    );
  };

  const handleChangeSensitivity = (key: keyof SensitivityValues, value: number) => {
    setSettings((prev) => ({
      ...prev,
      sensitivity: {
        ...prev.sensitivity,
        [key]: value,
      },
    }));
  };

  const handleSaveSensitivity = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // ignore
    }
    showToast('Sensibilidade salva localmente com sucesso!');
  };

  const handleRestoreSensitivity = () => {
    setSettings((prev) => ({
      ...prev,
      detectedDeviceLabel: 'Motorola Moto G04s',
      selectedBrand: 'motorola',
      sensitivity: { ...DEFAULT_SENSITIVITY },
    }));
    showToast('Sensibilidade restaurada para o padrão (100/85/75/65/50/80).');
  };

  const handleGenerateNow = () => {
    const generated = generateBrandSensitivity(settings.selectedBrand, capabilities);
    const deviceName = BRAND_METADATA[settings.selectedBrand].sampleDevice;
    setSettings((prev) => ({
      ...prev,
      detectedDeviceLabel: deviceName,
      sensitivity: generated,
    }));
    setActiveScreen('sensitivity');
    showToast(`Sensibilidade calibrada para ${BRAND_METADATA[settings.selectedBrand].label}!`);
  };

  const handleTogglePerformanceFlag = (key: keyof PerformanceFlags) => {
    setSettings((prev) => ({
      ...prev,
      performanceFlags: {
        ...prev.performanceFlags,
        [key]: !prev.performanceFlags[key],
      },
    }));
  };

  const handleApplySlowWalk = () => {
    setSettings((prev) => ({ ...prev, slowWalkEnabled: true }));
    showToast(
      `Boneco Lento aplicado em ${settings.slowWalkSpeed.toFixed(2)}x!`
    );
  };

  const handleMoreAction = async (action: MoreActionId) => {
    switch (action) {
      case 'memory': {
        const res = await runRealMemoryCleanup();
        const heapInfo =
          res.heapAfterMb !== null ? ` · Heap JS: ${res.heapAfterMb} MB` : '';
        showToast(
          `Limpeza executada (${res.cachesCleared} caches removidos${heapInfo}).`
        );
        break;
      }
      case 'cpu': {
        const cores = capabilities?.cores ?? navigator.hardwareConcurrency ?? 4;
        const hz = await measureRealRefreshRate(280);
        setSettings((prev) => ({
          ...prev,
          boostActive: true,
          performanceFlags: { ...prev.performanceFlags, maxPerformance: true },
        }));
        showToast(
          `Prioridade de renderização ativa (${cores} núcleos detectados · ${hz} Hz).`
        );
        break;
      }
      case 'background': {
        const res = await runRealMemoryCleanup();
        showToast(
          `Sessões temporárias e ${res.cachesCleared} caches em segundo plano limpos.`
        );
        break;
      }
      case 'graphics': {
        setSettings((prev) => {
          const next = !prev.gpuHighPerf;
          showToast(
            next
              ? `Desempenho gráfico alto ativado (${capabilities?.gpuRenderer ? 'WebGL' : 'GPU'}).`
              : 'Desempenho gráfico padrão restaurado.'
          );
          return { ...prev, gpuHighPerf: next };
        });
        break;
      }
      case 'economy': {
        setSettings((prev) => {
          const next = !prev.economyMode;
          showToast(
            next
              ? 'Modo Economia ativado (limita meta para 60 FPS).'
              : 'Modo Economia desativado.'
          );
          return {
            ...prev,
            economyMode: next,
            selectedFps: next ? 60 : prev.selectedFps,
          };
        });
        break;
      }
    }
  };

  const handleClearGameData = async () => {
    const count = await clearAllOptimizerData();
    showToast(`Dados temporários e caches (${count}) limpos com sucesso!`);
  };

  const renderScreen = (screen: ScreenId) => {
    switch (screen) {
      case 'home':
        return (
          <HomeScreen
            boostActive={settings.boostActive}
            onToggleBoost={handleToggleBoost}
            onNavigate={(target) => setActiveScreen(target)}
            onOpenShizukuInfo={() => setDrawerMode('shizuku')}
          />
        );
      case 'fps':
        return (
          <FpsBoostScreen
            selectedFps={settings.selectedFps}
            onSelectFps={(fps: FpsOption) =>
              setSettings((prev) => ({ ...prev, selectedFps: fps }))
            }
            onApplyFps={handleApplyFps}
            onBack={() => setActiveScreen('home')}
          />
        );
      case 'sensitivity':
        return (
          <SensitivityScreen
            detectedDeviceLabel={settings.detectedDeviceLabel}
            sensitivity={settings.sensitivity}
            onChangeSensitivity={handleChangeSensitivity}
            onSave={handleSaveSensitivity}
            onRestore={handleRestoreSensitivity}
            onOpenGenerator={() => setActiveScreen('generate-sensitivity')}
            onBack={() => setActiveScreen('home')}
          />
        );
      case 'slow-walk':
        return (
          <SlowWalkScreen
            enabled={settings.slowWalkEnabled}
            speed={settings.slowWalkSpeed}
            onToggleEnabled={() =>
              setSettings((prev) => ({
                ...prev,
                slowWalkEnabled: !prev.slowWalkEnabled,
              }))
            }
            onChangeSpeed={(spd) =>
              setSettings((prev) => ({ ...prev, slowWalkSpeed: spd }))
            }
            onApply={handleApplySlowWalk}
            onBack={() => setActiveScreen('home')}
          />
        );
      case 'generate-sensitivity':
        return (
          <GenerateSensitivityScreen
            selectedBrand={settings.selectedBrand}
            performanceFlags={settings.performanceFlags}
            onSelectBrand={(brand: BrandId) =>
              setSettings((prev) => ({ ...prev, selectedBrand: brand }))
            }
            onGenerateNow={handleGenerateNow}
            onToggleFlag={handleTogglePerformanceFlag}
            onBack={() => setActiveScreen('sensitivity')}
          />
        );
      case 'more':
        return (
          <MoreFunctionsScreen
            economyMode={settings.economyMode}
            gpuHighPerf={settings.gpuHighPerf}
            onRunAction={handleMoreAction}
            onOpenPremium={() => setDrawerMode('premium')}
            onClearGameData={handleClearGameData}
            onBack={() => setActiveScreen('home')}
          />
        );
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#040102] flex flex-col items-center justify-center py-2 px-2 sm:py-4 sm:px-4 relative overflow-x-hidden">
      {/* Subtle Ambient Crimson Backdrop */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 30%, rgba(153, 12, 18, 0.18) 0%, rgba(4, 1, 2, 1) 70%)',
        }}
      />

      {/* Desktop Screen Switcher Toolbar (Hidden on small mobile screens for pure native feel) */}
      <div className="hidden lg:flex items-center justify-between gap-4 w-full max-w-6xl mb-4 px-4 py-2 rounded-2xl border border-red-900/60 bg-black/70 backdrop-blur-md relative z-20">
        <div className="flex items-center gap-2">
          <span className="font-display text-lg font-black tracking-wide text-white">
            MAX PERFORMANCE 👑
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {viewMode === 'single' &&
            SCREEN_LABELS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveScreen(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer transition-colors ${
                  activeScreen === item.id
                    ? 'bg-red-600 text-white shadow-[0_0_10px_rgba(220,38,38,0.6)]'
                    : 'text-white/75 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            ))}
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => setViewMode('single')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer ${
              viewMode === 'single'
                ? 'bg-white text-black'
                : 'text-white/80 hover:bg-white/10'
            }`}
          >
            Tela Única
          </button>
          <button
            type="button"
            onClick={() => setViewMode('all6')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer ${
              viewMode === 'all6'
                ? 'bg-white text-black'
                : 'text-white/80 hover:bg-white/10'
            }`}
          >
            Ver Todas as 6 Telas
          </button>
        </div>
      </div>

      {/* Main Content: Single Interactive App or 6-Screen Comparison Grid */}
      {viewMode === 'all6' ? (
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center max-w-[1200px] w-full pb-8">
          {SCREEN_LABELS.map((item) => (
            <div key={item.id} className="flex flex-col items-center gap-2">
              <PhoneShell
                activeScreen={item.id}
                onNavigateTab={(tab) => {
                  setViewMode('single');
                  handleNavigateTab(tab);
                }}
                compact
              >
                {renderScreen(item.id)}
              </PhoneShell>
            </div>
          ))}
        </div>
      ) : (
        <main className="relative z-10 w-full flex justify-center">
          <PhoneShell
            activeScreen={activeScreen}
            onNavigateTab={handleNavigateTab}
          >
            {renderScreen(activeScreen)}
          </PhoneShell>
        </main>
      )}

      {/* Toast Feedback */}
      {toast && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl border border-red-500 bg-[#180304]/95 text-white text-xs sm:text-sm font-semibold shadow-[0_0_20px_rgba(255,30,30,0.65)] max-w-[90vw] text-center"
        >
          {toast}
        </div>
      )}

      {/* Real Device Info / Premium Tools Drawer */}
      <InfoDrawer
        mode={drawerMode}
        capabilities={capabilities}
        sensitivity={settings.sensitivity}
        selectedFps={settings.selectedFps}
        onClose={() => setDrawerMode(null)}
      />
    </div>
  );
}
