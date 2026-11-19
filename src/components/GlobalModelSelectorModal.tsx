import React, { useMemo, useState } from 'react';
import { Check, Plus, RefreshCw, Search, Smartphone, X, Zap } from 'lucide-react';
import { BrandId, PhoneModelProfile } from '../types/app';
import {
  calibrateCustomModelSensitivity,
  searchGlobalDevices,
} from '../data/globalDevices';
import { BRAND_METADATA } from '../utils/deviceOptimizer';

interface GlobalModelSelectorModalProps {
  open: boolean;
  devices: PhoneModelProfile[];
  selectedModelId: string;
  initialBrandFilter: BrandId | 'all';
  dbVersion: string;
  onSelectModelAndGenerate: (model: PhoneModelProfile) => void;
  onUpdateDatabase: () => void;
  onAddCustomModel: (model: PhoneModelProfile) => void;
  onClose: () => void;
}

const FILTER_TABS: { id: BrandId | 'all'; label: string }[] = [
  { id: 'all', label: 'Todas' },
  { id: 'motorola', label: 'Motorola' },
  { id: 'samsung', label: 'Samsung' },
  { id: 'xiaomi', label: 'Xiaomi' },
  { id: 'redmi', label: 'Redmi' },
  { id: 'poco', label: 'POCO' },
  { id: 'realme', label: 'Realme' },
  { id: 'infinix', label: 'Infinix' },
  { id: 'tecno', label: 'Tecno' },
  { id: 'other', label: 'Outras' },
];

export const GlobalModelSelectorModal: React.FC<GlobalModelSelectorModalProps> = ({
  open,
  devices,
  selectedModelId,
  initialBrandFilter,
  dbVersion,
  onSelectModelAndGenerate,
  onUpdateDatabase,
  onAddCustomModel,
  onClose,
}) => {
  const [query, setQuery] = useState('');
  const [brandFilter, setBrandFilter] = useState<BrandId | 'all'>(initialBrandFilter);
  const [previewModel, setPreviewModel] = useState<PhoneModelProfile | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newManufacturer, setNewManufacturer] = useState('Samsung');
  const [newModelName, setNewModelName] = useState('');
  const [newBrand, setNewBrand] = useState<BrandId>('samsung');
  const [newHz, setNewHz] = useState<number>(120);

  // Sync brand filter whenever opened from a specific brand card
  React.useEffect(() => {
    if (open) {
      setBrandFilter(initialBrandFilter);
      const current = devices.find((d) => d.id === selectedModelId) || null;
      setPreviewModel(current);
    }
  }, [open, initialBrandFilter, selectedModelId, devices]);

  const filteredDevices = useMemo(
    () => searchGlobalDevices(devices, query, brandFilter),
    [devices, query, brandFilter]
  );

  if (!open) return null;

  const activeSelection =
    previewModel ||
    filteredDevices.find((d) => d.id === selectedModelId) ||
    filteredDevices[0] ||
    null;

  const handleCreateCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanModel = newModelName.trim();
    if (!cleanModel) return;

    const cleanManuf = newManufacturer.trim() || BRAND_METADATA[newBrand].label;
    const fullName = cleanModel.toLowerCase().startsWith(cleanManuf.toLowerCase())
      ? cleanModel
      : `${cleanManuf} ${cleanModel}`;

    const slug = `custom-${fullName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')}-${Date.now()}`;

    const created: PhoneModelProfile = {
      id: slug,
      brand: newBrand,
      manufacturer: cleanManuf,
      model: fullName,
      screenHz: newHz,
      touchHz: newHz * 2,
      sensitivity: calibrateCustomModelSensitivity(newHz),
      isCustom: true,
    };

    onAddCustomModel(created);
    setPreviewModel(created);
    setBrandFilter('all');
    setQuery(cleanModel);
    setNewModelName('');
    setShowAddForm(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3"
      onClick={onClose}
    >
      <div
        data-testid="global-model-selector-modal"
        className="w-full max-w-[386px] max-h-[88vh] nexus-card rounded-2xl border-[1.8px] border-[#ff2e2e] shadow-[0_0_28px_rgba(255,20,20,0.55)] flex flex-col overflow-hidden text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-3.5 pt-3 pb-2 border-b border-red-900/60 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <h2 className="font-display text-[19px] font-black uppercase tracking-wide leading-none">
              Base Mundial de Celulares
            </h2>
            <p className="text-[11px] text-white/75 mt-0.5 font-mono-num">
              {devices.length} modelos · v{dbVersion}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar seletor mundial"
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/10 text-white cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search + Update/Add Toolbar */}
        <div className="px-3 pt-2.5 pb-2 space-y-2 border-b border-red-950/80">
          <div className="relative">
            <Search className="w-4 h-4 text-red-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar modelo (ex: Moto G04s, S24, POCO X6, iPhone)..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-black/75 border border-red-800/80 focus:border-red-400 focus:outline-none text-[12.5px] text-white placeholder:text-white/45"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
            {FILTER_TABS.map((tab) => {
              const active = brandFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setBrandFilter(tab.id)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap cursor-pointer transition-colors ${
                    active
                      ? 'bg-red-600 text-white shadow-[0_0_8px_rgba(239,68,68,0.6)]'
                      : 'bg-black/60 border border-red-900/60 text-white/80 hover:border-red-500'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onUpdateDatabase}
              className="flex-1 py-1.5 px-2.5 rounded-xl bg-black/70 border border-green-500/60 hover:border-green-400 text-[11px] font-bold text-green-300 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Atualizar Base Mundial</span>
            </button>

            <button
              type="button"
              onClick={() => setShowAddForm((prev) => !prev)}
              className="py-1.5 px-2.5 rounded-xl bg-black/70 border border-red-700/80 hover:border-red-400 text-[11px] font-bold text-white flex items-center justify-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-red-400" />
              <span>Novo Modelo</span>
            </button>
          </div>

          {/* Add / Update Custom Model Form */}
          {showAddForm && (
            <form
              onSubmit={handleCreateCustom}
              className="rounded-xl bg-black/80 border border-red-800/80 p-2.5 space-y-2"
            >
              <div className="grid grid-cols-2 gap-1.5">
                <select
                  value={newBrand}
                  onChange={(e) => {
                    const b = e.target.value as BrandId;
                    setNewBrand(b);
                    setNewManufacturer(BRAND_METADATA[b].label);
                  }}
                  aria-label="Marca do modelo"
                  className="px-2 py-1.5 rounded-lg bg-zinc-950 border border-red-900 text-[11.5px] text-white"
                >
                  {FILTER_TABS.filter((t) => t.id !== 'all').map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.label}
                    </option>
                  ))}
                </select>
                <select
                  value={newHz}
                  onChange={(e) => setNewHz(Number(e.target.value))}
                  aria-label="Taxa de tela Hz"
                  className="px-2 py-1.5 rounded-lg bg-zinc-950 border border-red-900 text-[11.5px] text-white"
                >
                  <option value={60}>Tela 60 Hz</option>
                  <option value={90}>Tela 90 Hz</option>
                  <option value={120}>Tela 120 Hz</option>
                  <option value={144}>Tela 144 Hz</option>
                  <option value={165}>Tela 165 Hz</option>
                </select>
              </div>
              <div className="flex gap-1.5">
                <input
                  type="text"
                  value={newModelName}
                  onChange={(e) => setNewModelName(e.target.value)}
                  placeholder="Nome do modelo (ex: Galaxy A56 5G)"
                  className="flex-1 px-2.5 py-1.5 rounded-lg bg-zinc-950 border border-red-900 text-[11.5px] text-white placeholder:text-white/45"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-[11.5px] font-bold cursor-pointer"
                >
                  Salvar
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Scrollable Model List */}
        <div className="flex-1 min-h-[180px] overflow-y-auto px-3 py-2 space-y-1.5 no-scrollbar">
          {filteredDevices.length === 0 ? (
            <div className="text-center py-6 text-xs text-white/65">
              Nenhum modelo encontrado para &ldquo;{query}&rdquo;. Clique em &ldquo;Novo Modelo&rdquo; para cadastrar.
            </div>
          ) : (
            filteredDevices.map((device) => {
              const isChosen = activeSelection?.id === device.id;
              return (
                <button
                  key={device.id}
                  type="button"
                  onClick={() => setPreviewModel(device)}
                  className={`w-full rounded-xl px-2.5 py-2 flex items-center justify-between gap-2 text-left cursor-pointer transition-all ${
                    isChosen
                      ? 'border border-[#ff3b3b] bg-[#3f0506]/90 shadow-[0_0_12px_rgba(255,35,35,0.4)]'
                      : 'border border-red-950/80 bg-black/50 hover:border-red-700'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <Smartphone className="w-4 h-4 text-red-400 shrink-0" />
                    <div className="min-w-0">
                      <div className="text-[12.5px] font-bold text-white truncate">
                        {device.model}
                      </div>
                      <div className="text-[10.5px] text-white/65 font-mono-num">
                        {device.manufacturer} · {device.screenHz}Hz / Touch {device.touchHz}Hz
                      </div>
                    </div>
                  </div>
                  {isChosen && <Check className="w-4 h-4 text-green-400 shrink-0" />}
                </button>
              );
            })
          )}
        </div>

        {/* Selected Model Sensitivity Preview + GERAR CTA */}
        {activeSelection && (
          <div className="px-3 py-2.5 border-t border-red-900/70 bg-black/80 space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-bold text-green-400 truncate">
                {activeSelection.model}
              </span>
              <span className="font-mono-num text-white/75 shrink-0">
                {activeSelection.screenHz} Hz
              </span>
            </div>

            <div className="grid grid-cols-3 gap-1.5 text-[10.5px] font-mono-num">
              <div className="rounded-lg bg-zinc-950 border border-red-900/60 px-2 py-1 flex justify-between">
                <span className="text-white/70">Geral</span>
                <span className="font-bold text-white">{activeSelection.sensitivity.geral}</span>
              </div>
              <div className="rounded-lg bg-zinc-950 border border-red-900/60 px-2 py-1 flex justify-between">
                <span className="text-white/70">Red Dot</span>
                <span className="font-bold text-white">{activeSelection.sensitivity.redDot}</span>
              </div>
              <div className="rounded-lg bg-zinc-950 border border-red-900/60 px-2 py-1 flex justify-between">
                <span className="text-white/70">Mira 2x</span>
                <span className="font-bold text-white">{activeSelection.sensitivity.mira2x}</span>
              </div>
              <div className="rounded-lg bg-zinc-950 border border-red-900/60 px-2 py-1 flex justify-between">
                <span className="text-white/70">Mira 4x</span>
                <span className="font-bold text-white">{activeSelection.sensitivity.mira4x}</span>
              </div>
              <div className="rounded-lg bg-zinc-950 border border-red-900/60 px-2 py-1 flex justify-between">
                <span className="text-white/70">AWM</span>
                <span className="font-bold text-white">{activeSelection.sensitivity.miraAwm}</span>
              </div>
              <div className="rounded-lg bg-zinc-950 border border-red-900/60 px-2 py-1 flex justify-between">
                <span className="text-white/70">Olhad.</span>
                <span className="font-bold text-white">{activeSelection.sensitivity.olhadinha}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onSelectModelAndGenerate(activeSelection)}
              className="w-full rounded-full py-2 px-4 nexus-red-cta flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-[#4ade80] fill-[#4ade80]" />
              <span className="font-display text-[16px] font-black tracking-wider uppercase text-white">
                GERAR SENSIBILIDADE DO MODELO
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
