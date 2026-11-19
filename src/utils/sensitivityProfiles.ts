import {
  BrandId,
  DeviceCapabilities,
  ModelProfileBundle,
  PhoneModelProfile,
  ProfileStyleId,
  SensitivityProfile,
  SensitivityValues,
} from '../types/app';
import {
  GLOBAL_DEVICE_DATABASE,
  GLOBAL_DB_UPDATE_PACK,
  loadCustomModels,
} from '../data/globalDevices';

/**
 * Gerador de VÁRIOS perfis de sensibilidade para cada marca e modelo cadastrado.
 *
 * Cada modelo do banco (GLOBAL_DEVICE_DATABASE + pacote de atualização + modelos
 * criados pelo usuário) recebe um conjunto completo de perfis de jogo. Os valores
 * partem da sensibilidade calibrada do aparelho (tela / taxa de toque) e recebem
 * um deslocamento próprio de cada estilo de jogo.
 */

interface ProfileTemplate {
  styleId: ProfileStyleId;
  name: string;
  playStyle: string;
  description: string;
  /** Deslocamento aplicado sobre a sensibilidade base do aparelho. */
  delta: Record<keyof SensitivityValues, number>;
  /** Deslocamento extra de DPI sugerido para o estilo. */
  dpiDelta: number;
  fireButtonSize: number;
  recommended?: boolean;
}

const PROFILE_TEMPLATES: ProfileTemplate[] = [
  {
    styleId: 'equilibrado',
    name: 'Equilibrado',
    playStyle: 'Todas as armas',
    description: 'Perfil base do aparelho. Melhor equilíbrio entre capa, mira e AWM.',
    delta: { geral: 0, redDot: 0, mira2x: 0, mira4x: 0, miraAwm: 0, olhadinha: 0 },
    dpiDelta: 0,
    fireButtonSize: 58,
    recommended: true,
  },
  {
    styleId: 'rush',
    name: 'Rush / Agressivo',
    playStyle: 'Rush e X1',
    description: 'Resposta rápida de red dot e olhadinha para entrar de capa no inimigo.',
    delta: { geral: 6, redDot: 5, mira2x: 3, mira4x: -2, miraAwm: -6, olhadinha: 5 },
    dpiDelta: 22,
    fireButtonSize: 62,
  },
  {
    styleId: 'precisao',
    name: 'Precisão / Sniper',
    playStyle: 'AWM e 4x',
    description: 'Mira travada e AWM estável para tiro de longa distância.',
    delta: { geral: -7, redDot: -3, mira2x: 2, mira4x: 7, miraAwm: 11, olhadinha: -5 },
    dpiDelta: -18,
    fireButtonSize: 52,
  },
  {
    styleId: 'quatro-dedos',
    name: '4 Dedos / Claw',
    playStyle: 'Claw e 4 dedos',
    description: 'Geral alto para quem joga com vários dedos e faz capa rápida.',
    delta: { geral: 9, redDot: 7, mira2x: 4, mira4x: 2, miraAwm: 0, olhadinha: 9 },
    dpiDelta: 34,
    fireButtonSize: 66,
  },
  {
    styleId: 'capa-rapida',
    name: 'Capa Rápida',
    playStyle: 'One tap',
    description: 'Red dot no máximo para capa de um toque com giro curto.',
    delta: { geral: 3, redDot: 10, mira2x: 6, mira4x: 1, miraAwm: -4, olhadinha: 3 },
    dpiDelta: 28,
    fireButtonSize: 64,
  },
  {
    styleId: 'anti-tremor',
    name: 'Anti-Tremor',
    playStyle: 'Mira suave',
    description: 'Suaviza a mira para quem tem mão pesada ou tela pequena.',
    delta: { geral: -11, redDot: -7, mira2x: -5, mira4x: -3, miraAwm: -5, olhadinha: -9 },
    dpiDelta: -26,
    fireButtonSize: 56,
  },
];

function clamp(val: number): number {
  return Math.max(0, Math.min(100, Math.round(val)));
}

function clampDpi(val: number): number {
  return Math.max(300, Math.min(760, Math.round(val / 2) * 2));
}

function baseDpiFromSensitivity(values: SensitivityValues, model: PhoneModelProfile): number {
  const touchBonus = model.touchHz >= 360 ? 40 : model.touchHz >= 240 ? 24 : 0;
  const hzBonus = model.screenHz >= 144 ? 18 : model.screenHz >= 120 ? 10 : 0;
  return clampDpi(408 + (100 - values.geral) * 1.7 + touchBonus + hzBonus);
}

/**
 * Ajuste fino por hardware: telas mais rápidas e toque mais rápido pedem
 * sensibilidade um pouco menor para não "passar" do alvo.
 */
function hardwareAdjust(
  values: SensitivityValues,
  model: PhoneModelProfile,
  capabilities?: DeviceCapabilities | null
): SensitivityValues {
  let bias = 0;
  if (model.screenHz >= 144) bias -= 3;
  else if (model.screenHz >= 120) bias -= 1;
  if (model.touchHz >= 480) bias -= 2;
  else if (model.touchHz >= 360) bias += 1;
  if (capabilities?.pixelRatio && capabilities.pixelRatio >= 3) bias -= 1;

  return {
    geral: clamp(values.geral + bias),
    redDot: clamp(values.redDot + bias),
    mira2x: clamp(values.mira2x + bias),
    mira4x: clamp(values.mira4x + bias),
    miraAwm: clamp(values.miraAwm + Math.round(bias / 2)),
    olhadinha: clamp(values.olhadinha + bias),
  };
}

export function generateProfilesForModel(
  model: PhoneModelProfile,
  capabilities?: DeviceCapabilities | null
): SensitivityProfile[] {
  const base = hardwareAdjust(model.sensitivity, model, capabilities);
  const baseDpi = baseDpiFromSensitivity(base, model);

  return PROFILE_TEMPLATES.map((template) => ({
    id: `${model.id}::${template.styleId}`,
    styleId: template.styleId,
    name: template.name,
    playStyle: template.playStyle,
    description: template.description,
    recommended: Boolean(template.recommended),
    dpi: clampDpi(baseDpi + template.dpiDelta),
    fireButtonSize: template.fireButtonSize,
    sensitivity: {
      geral: clamp(base.geral + template.delta.geral),
      redDot: clamp(base.redDot + template.delta.redDot),
      mira2x: clamp(base.mira2x + template.delta.mira2x),
      mira4x: clamp(base.mira4x + template.delta.mira4x),
      miraAwm: clamp(base.miraAwm + template.delta.miraAwm),
      olhadinha: clamp(base.olhadinha + template.delta.olhadinha),
    },
  }));
}

export function generateProfilesForModels(
  models: PhoneModelProfile[],
  capabilities?: DeviceCapabilities | null
): ModelProfileBundle[] {
  return models.map((model) => ({
    model,
    profiles: generateProfilesForModel(model, capabilities),
  }));
}

/** Banco completo: base global + pacote de atualização + modelos do usuário. */
export function getAllRegisteredModels(): PhoneModelProfile[] {
  const byId = new Map<string, PhoneModelProfile>();
  for (const item of GLOBAL_DEVICE_DATABASE) byId.set(item.id, item);
  for (const item of GLOBAL_DB_UPDATE_PACK) {
    if (!byId.has(item.id)) byId.set(item.id, { ...item, isCustom: true });
  }
  for (const item of loadCustomModels()) byId.set(item.id, item);
  return Array.from(byId.values());
}

export function getModelsForBrand(
  brand: BrandId | 'all',
  models?: PhoneModelProfile[]
): PhoneModelProfile[] {
  const source = models ?? getAllRegisteredModels();
  if (brand === 'all') return source;
  return source.filter((model) => model.brand === brand);
}

export function findRegisteredModel(
  id: string,
  models?: PhoneModelProfile[]
): PhoneModelProfile | null {
  const source = models ?? getAllRegisteredModels();
  return source.find((model) => model.id === id) ?? null;
}

export function countProfilesByBrand(
  models?: PhoneModelProfile[]
): { brand: BrandId; models: number; profiles: number }[] {
  const source = models ?? getAllRegisteredModels();
  const map = new Map<BrandId, { models: number; profiles: number }>();
  for (const model of source) {
    const current = map.get(model.brand) ?? { models: 0, profiles: 0 };
    current.models += 1;
    current.profiles += PROFILE_TEMPLATES.length;
    map.set(model.brand, current);
  }
  return Array.from(map.entries()).map(([brand, value]) => ({ brand, ...value }));
}

export function profileStyleLabel(styleId: ProfileStyleId): string {
  return PROFILE_TEMPLATES.find((item) => item.styleId === styleId)?.name ?? styleId;
}

export function profileSummary(profile: SensitivityProfile): string {
  const s = profile.sensitivity;
  return `Geral ${s.geral} · Red ${s.redDot} · 2x ${s.mira2x} · 4x ${s.mira4x} · AWM ${s.miraAwm} · Olhadinha ${s.olhadinha}`;
}
