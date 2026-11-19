import React, { useMemo, useState } from 'react';
import { Check, Crosshair, Search, X } from 'lucide-react';
import {
  BrandId,
  DeviceCapabilities,
  PhoneModelProfile,
  SensitivityProfile,
} from '../types/app';
import { BRAND_METADATA } from '../utils/deviceOptimizer';
import {
  generateProfilesForModel,
  getAllRegisteredModels,
  getModelsForBrand,
} from '../utils/sensitivityProfiles';
import { BrandBadge, GoldCrownIcon } from './Icons';

const BRAND_LIST: (BrandId | 'all')[] = [
  'all',
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

interface SensitivityProfilesModalProps {
  open: boolean;
  onClose: () => void;
  capabilities: DeviceCapabilities | null;
  selectedBrand: BrandId;
  selectedModelId: string;
  activeProfileId: string;
  models?: PhoneModelProfile[];
  onSelectBrand: (brand: BrandId) => void;
  onApplyProfile: (model: PhoneModelProfile, profile: SensitivityProfile) => void;
}

export const SensitivityProfilesModal: React.FC<SensitivityProfilesModalProps> = ({
  open,
  onClose,
  capabilities,
  selectedBrand,
  selectedModelId,
  activeProfileId,
  models,
  onSelectBrand,
  onApplyProfile,
}) => {
  const allModels = useMemo(() => models ?? getAllRegisteredModels(), [models]);
  const [brandFilter, setBrandFilter] = useState<BrandId | 'all'>(selectedBrand);
  const [query, setQuery] = useState('');
  const [openModelId, setOpenModelId] = useState<string>(selectedModelId);

  const brandModels = useMemo(
    () => getModelsForBrand(brandFilter, allModels),
    [brandFilter, allModels]
  );

  const filteredModels = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return brandModels;
    return brandModels.filter(
      (model) =>
        model.model.toLowerCase().includes(term) ||
        model.manufacturer.toLowerCase().includes(term)
    );
  }, [brandModels, query]);

  const activeModel = useMemo(
    () => allModels.find((model) => model.id === openModelId) ?? filteredModels[0] ?? null,
    [allModels, openModelId, filteredModels]
  );

  const profiles = useMemo(
    () => (activeModel ? generateProfilesForModel(activeModel, capabilities) : []),
    [activeModel, capabilities]
  );

  const totalProfiles = allModels.length * 6;

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Perfis de sensibilidade por marca e modelo"
    >
      <div
        data-testid="profiles-modal"
        className="nexus-card rounded-2xl border-[1.8px] border-[#ff2e2e] w-full max-w-md max-h-[92vh] overflow-y-auto no-scrollbar p-3 text-white shadow-[0_0_28px_rgba(255,20,20,0.6)]"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-2 pb-2 mb-2 border-b border-red-900/60">
          <div className="flex items-center gap-1.5 min-w-0">
            <GoldCrownIcon className="w-6 h-6 shrink-0" />
            <div className="min-w-0">
              <h2 className="font-display text-[17px] font-black tracking-wide uppercase leading-none">
                Perfis por Modelo
              </h2>
              <p className="text-[10.5px] text-white/70 mt-0.5">
                {allModels.length} aparelhos · {totalProfiles} perfis gerados
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar perfis"
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Brand filter */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1.5">
          {BRAND_LIST.map((brand) => {
            const active = brandFilter === brand;
            const label =
              brand === 'all' ? 'Todos' : BRAND_METADATA[brand as BrandId].label;
            return (
              <button
                key={brand}
                type="button"
                onClick={() => {
                  setBrandFilter(brand);
                  if (brand !== 'all') onSelectBrand(brand);
                }}
                className={`shrink-0 rounded-lg px-2.5 py-1 text-[11px] font-bold cursor-pointer transition-colors ${
                  active
                    ? 'bg-red-600 text-white shadow-[0_0_10px_rgba(239,68,68,0.7)]'
                    : 'bg-black/60 border border-red-900/70 text-white/80 hover:border-red-500'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="flex items-center gap-1.5 rounded-xl bg-black/60 border border-red-950 px-2 py-1.5 mb-2">
          <Search className="w-3.5 h-3.5 text-red-400 shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar modelo (ex: Moto G24, Galaxy A15)"
            aria-label="Buscar modelo"
            className="bg-transparent outline-none text-[11.5px] text-white placeholder:text-white/40 w-full"
          />
        </div>

        {/* Model list */}
        <div className="max-h-[168px] overflow-y-auto no-scrollbar space-y-1 mb-2 pr-0.5">
          {filteredModels.length === 0 && (
            <p className="text-[11px] text-white/60 px-1 py-2">
              Nenhum modelo encontrado nessa marca.
            </p>
          )}
          {filteredModels.map((model) => {
            const isOpen = activeModel?.id === model.id;
            return (
              <button
                key={model.id}
                type="button"
                onClick={() => setOpenModelId(model.id)}
                className={`w-full text-left rounded-xl px-2.5 py-1.5 flex items-center justify-between gap-2 cursor-pointer transition-colors ${
                  isOpen
                    ? 'border-[1.6px] border-[#ff3b3b] bg-[#3b0506]/90'
                    : 'border border-[#991b1b]/70 bg-[#140203]/90 hover:border-[#ef4444]'
                }`}
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <BrandBadge brand={model.brand} />
                  <span className="text-[11.5px] font-semibold truncate">
                    {model.model}
                  </span>
                </div>
                <span className="text-[10px] font-mono-num text-white/60 shrink-0">
                  {model.screenHz}Hz · {model.touchHz}Hz
                </span>
              </button>
            );
          })}
        </div>

        {/* Profiles of selected model */}
        {activeModel && (
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5">
              <Crosshair className="w-3.5 h-3.5 text-red-400" />
              <span className="text-[11px] font-bold text-white/85 uppercase">
                {profiles.length} perfis · {activeModel.model}
              </span>
            </div>

            {profiles.map((profile) => {
              const applied = activeProfileId === profile.id;
              return (
                <div
                  key={profile.id}
                  data-testid={`profile-card-${profile.styleId}`}
                  className={`rounded-xl px-2.5 py-1.5 border ${
                    applied
                      ? 'border-[#22c55e] bg-[#04140a]/90'
                      : 'border-red-950/80 bg-black/50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[12px] font-bold text-white truncate">
                          {profile.name}
                        </span>
                        {profile.recommended && (
                          <span className="text-[9px] font-black text-[#4ade80] uppercase shrink-0">
                            ★ recomendado
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-white/60 leading-tight">
                        {profile.playStyle} · DPI {profile.dpi} · Botão{' '}
                        {profile.fireButtonSize}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onApplyProfile(activeModel, profile)}
                      aria-label={`Aplicar perfil ${profile.name} em ${activeModel.model}`}
                      className={`shrink-0 rounded-lg px-2 py-1 text-[10.5px] font-bold flex items-center gap-1 cursor-pointer ${
                        applied
                          ? 'bg-[#16a34a] text-white'
                          : 'bg-red-600 hover:bg-red-500 text-white'
                      }`}
                    >
                      {applied ? <Check className="w-3 h-3" /> : null}
                      {applied ? 'Aplicado' : 'Aplicar'}
                    </button>
                  </div>

                  <p className="mt-1 text-[10px] font-mono-num text-white/75 leading-tight">
                    G {profile.sensitivity.geral} · RD {profile.sensitivity.redDot} · 2x{' '}
                    {profile.sensitivity.mira2x} · 4x {profile.sensitivity.mira4x} · AWM{' '}
                    {profile.sensitivity.miraAwm} · OLH {profile.sensitivity.olhadinha}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
