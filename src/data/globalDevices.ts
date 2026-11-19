import { BrandId, PhoneModelProfile, SensitivityValues } from '../types/app';

const CUSTOM_DB_STORAGE_KEY = 'max_performance_global_devices_custom_v1';
const DB_VERSION_STORAGE_KEY = 'max_performance_global_db_version_v1';

export const BASE_DB_VERSION = '2026.11.1';
export const UPDATED_DB_VERSION = '2026.11.2-WORLD';

function clamp(val: number): number {
  return Math.max(0, Math.min(100, Math.round(val)));
}

function makeModel(
  id: string,
  brand: BrandId,
  manufacturer: string,
  model: string,
  screenHz: number,
  touchHz: number,
  geral: number,
  redDot: number,
  mira2x: number,
  mira4x: number,
  miraAwm: number,
  olhadinha: number
): PhoneModelProfile {
  return {
    id,
    brand,
    manufacturer,
    model,
    screenHz,
    touchHz,
    sensitivity: {
      geral: clamp(geral),
      redDot: clamp(redDot),
      mira2x: clamp(mira2x),
      mira4x: clamp(mira4x),
      miraAwm: clamp(miraAwm),
      olhadinha: clamp(olhadinha),
    },
  };
}

export const GLOBAL_DEVICE_DATABASE: PhoneModelProfile[] = [
  // ================= MOTOROLA =================
  makeModel('motorola-moto-g04s', 'motorola', 'Motorola', 'Motorola Moto G04s', 90, 180, 100, 85, 75, 65, 50, 80),
  makeModel('motorola-moto-g04', 'motorola', 'Motorola', 'Motorola Moto G04', 90, 180, 99, 85, 75, 65, 50, 80),
  makeModel('motorola-moto-g14', 'motorola', 'Motorola', 'Motorola Moto G14', 60, 120, 98, 86, 76, 66, 51, 81),
  makeModel('motorola-moto-g24', 'motorola', 'Motorola', 'Motorola Moto G24', 90, 180, 98, 84, 74, 64, 49, 79),
  makeModel('motorola-moto-g24-power', 'motorola', 'Motorola', 'Motorola Moto G24 Power', 90, 180, 97, 84, 74, 64, 49, 78),
  makeModel('motorola-moto-g34-5g', 'motorola', 'Motorola', 'Motorola Moto G34 5G', 120, 240, 95, 83, 73, 63, 48, 77),
  makeModel('motorola-moto-g54-5g', 'motorola', 'Motorola', 'Motorola Moto G54 5G', 120, 240, 94, 82, 72, 62, 47, 76),
  makeModel('motorola-moto-g73-5g', 'motorola', 'Motorola', 'Motorola Moto G73 5G', 120, 240, 93, 81, 71, 61, 46, 75),
  makeModel('motorola-moto-g84-5g', 'motorola', 'Motorola', 'Motorola Moto G84 5G', 120, 240, 92, 81, 71, 61, 46, 75),
  makeModel('motorola-moto-g85-5g', 'motorola', 'Motorola', 'Motorola Moto G85 5G', 120, 240, 91, 80, 70, 60, 45, 74),
  makeModel('motorola-moto-g52', 'motorola', 'Motorola', 'Motorola Moto G52', 90, 180, 96, 84, 74, 64, 49, 78),
  makeModel('motorola-moto-g60', 'motorola', 'Motorola', 'Motorola Moto G60', 120, 240, 94, 82, 72, 62, 47, 76),
  makeModel('motorola-moto-g32', 'motorola', 'Motorola', 'Motorola Moto G32', 90, 180, 97, 85, 75, 65, 50, 79),
  makeModel('motorola-moto-g22', 'motorola', 'Motorola', 'Motorola Moto G22', 90, 180, 98, 86, 76, 66, 51, 80),
  makeModel('motorola-moto-e13', 'motorola', 'Motorola', 'Motorola Moto E13', 60, 120, 100, 89, 79, 69, 53, 83),
  makeModel('motorola-moto-e22', 'motorola', 'Motorola', 'Motorola Moto E22', 90, 180, 99, 87, 77, 67, 52, 81),
  makeModel('motorola-edge-30', 'motorola', 'Motorola', 'Motorola Edge 30', 144, 360, 90, 79, 69, 59, 44, 73),
  makeModel('motorola-edge-40', 'motorola', 'Motorola', 'Motorola Edge 40', 144, 360, 89, 78, 68, 58, 43, 72),
  makeModel('motorola-edge-40-neo', 'motorola', 'Motorola', 'Motorola Edge 40 Neo', 144, 360, 90, 79, 69, 59, 44, 73),
  makeModel('motorola-edge-50-pro', 'motorola', 'Motorola', 'Motorola Edge 50 Pro', 144, 360, 88, 77, 67, 57, 42, 71),
  makeModel('motorola-edge-50-ultra', 'motorola', 'Motorola', 'Motorola Edge 50 Ultra', 144, 360, 87, 76, 66, 56, 42, 70),
  makeModel('motorola-razr-40-ultra', 'motorola', 'Motorola', 'Motorola Razr 40 Ultra', 165, 360, 88, 77, 67, 57, 43, 71),

  // ================= SAMSUNG =================
  makeModel('samsung-galaxy-s24-ultra', 'samsung', 'Samsung', 'Samsung Galaxy S24 Ultra', 120, 240, 89, 78, 68, 58, 44, 72),
  makeModel('samsung-galaxy-s24-plus', 'samsung', 'Samsung', 'Samsung Galaxy S24+', 120, 240, 90, 79, 69, 59, 45, 73),
  makeModel('samsung-galaxy-s24', 'samsung', 'Samsung', 'Samsung Galaxy S24', 120, 240, 91, 80, 70, 60, 45, 74),
  makeModel('samsung-galaxy-s23-ultra', 'samsung', 'Samsung', 'Samsung Galaxy S23 Ultra', 120, 240, 90, 79, 69, 59, 44, 73),
  makeModel('samsung-galaxy-s23-fe', 'samsung', 'Samsung', 'Samsung Galaxy S23 FE', 120, 240, 92, 81, 71, 61, 46, 75),
  makeModel('samsung-galaxy-s22-ultra', 'samsung', 'Samsung', 'Samsung Galaxy S22 Ultra', 120, 240, 91, 80, 70, 60, 45, 74),
  makeModel('samsung-galaxy-s21-fe', 'samsung', 'Samsung', 'Samsung Galaxy S21 FE', 120, 240, 93, 82, 72, 62, 47, 76),
  makeModel('samsung-galaxy-s20-fe', 'samsung', 'Samsung', 'Samsung Galaxy S20 FE', 120, 240, 94, 83, 73, 63, 48, 77),
  makeModel('samsung-galaxy-a55-5g', 'samsung', 'Samsung', 'Samsung Galaxy A55 5G', 120, 240, 93, 82, 72, 62, 47, 76),
  makeModel('samsung-galaxy-a54-5g', 'samsung', 'Samsung', 'Samsung Galaxy A54 5G', 120, 240, 94, 82, 72, 62, 47, 76),
  makeModel('samsung-galaxy-a35-5g', 'samsung', 'Samsung', 'Samsung Galaxy A35 5G', 120, 240, 94, 83, 73, 63, 48, 77),
  makeModel('samsung-galaxy-a34-5g', 'samsung', 'Samsung', 'Samsung Galaxy A34 5G', 120, 240, 95, 84, 74, 64, 48, 78),
  makeModel('samsung-galaxy-a25-5g', 'samsung', 'Samsung', 'Samsung Galaxy A25 5G', 120, 240, 95, 84, 74, 64, 49, 78),
  makeModel('samsung-galaxy-a24', 'samsung', 'Samsung', 'Samsung Galaxy A24', 90, 180, 96, 85, 75, 65, 50, 79),
  makeModel('samsung-galaxy-a15', 'samsung', 'Samsung', 'Samsung Galaxy A15', 90, 180, 97, 86, 76, 66, 50, 80),
  makeModel('samsung-galaxy-a14', 'samsung', 'Samsung', 'Samsung Galaxy A14', 90, 180, 98, 86, 76, 66, 51, 80),
  makeModel('samsung-galaxy-a13', 'samsung', 'Samsung', 'Samsung Galaxy A13', 60, 120, 99, 88, 78, 68, 52, 82),
  makeModel('samsung-galaxy-a05s', 'samsung', 'Samsung', 'Samsung Galaxy A05s', 90, 180, 98, 87, 77, 67, 51, 81),
  makeModel('samsung-galaxy-a04s', 'samsung', 'Samsung', 'Samsung Galaxy A04s', 90, 180, 99, 87, 77, 67, 52, 81),
  makeModel('samsung-galaxy-a03', 'samsung', 'Samsung', 'Samsung Galaxy A03', 60, 120, 100, 89, 79, 69, 53, 83),
  makeModel('samsung-galaxy-m54-5g', 'samsung', 'Samsung', 'Samsung Galaxy M54 5G', 120, 240, 93, 82, 72, 62, 47, 76),
  makeModel('samsung-galaxy-m34-5g', 'samsung', 'Samsung', 'Samsung Galaxy M34 5G', 120, 240, 94, 83, 73, 63, 48, 77),
  makeModel('samsung-galaxy-m14-5g', 'samsung', 'Samsung', 'Samsung Galaxy M14 5G', 90, 180, 97, 85, 75, 65, 50, 79),
  makeModel('samsung-galaxy-z-flip5', 'samsung', 'Samsung', 'Samsung Galaxy Z Flip 5', 120, 240, 91, 80, 70, 60, 45, 74),
  makeModel('samsung-galaxy-z-fold5', 'samsung', 'Samsung', 'Samsung Galaxy Z Fold 5', 120, 240, 89, 78, 68, 58, 44, 72),

  // ================= XIAOMI =================
  makeModel('xiaomi-14-ultra', 'xiaomi', 'Xiaomi', 'Xiaomi 14 Ultra', 120, 240, 88, 77, 67, 57, 43, 71),
  makeModel('xiaomi-14', 'xiaomi', 'Xiaomi', 'Xiaomi 14', 120, 240, 89, 78, 68, 58, 44, 72),
  makeModel('xiaomi-13t-pro', 'xiaomi', 'Xiaomi', 'Xiaomi 13T Pro', 144, 480, 87, 76, 66, 56, 42, 70),
  makeModel('xiaomi-13t', 'xiaomi', 'Xiaomi', 'Xiaomi 13T', 144, 480, 88, 77, 67, 57, 43, 71),
  makeModel('xiaomi-13-pro', 'xiaomi', 'Xiaomi', 'Xiaomi 13 Pro', 120, 240, 89, 78, 68, 58, 44, 72),
  makeModel('xiaomi-13', 'xiaomi', 'Xiaomi', 'Xiaomi 13', 120, 240, 90, 79, 69, 59, 45, 73),
  makeModel('xiaomi-12t-pro', 'xiaomi', 'Xiaomi', 'Xiaomi 12T Pro', 120, 480, 89, 78, 68, 58, 44, 72),
  makeModel('xiaomi-12', 'xiaomi', 'Xiaomi', 'Xiaomi 12', 120, 480, 90, 79, 69, 59, 45, 73),
  makeModel('xiaomi-11t-pro', 'xiaomi', 'Xiaomi', 'Xiaomi 11T Pro', 120, 480, 91, 80, 70, 60, 45, 74),
  makeModel('xiaomi-11-lite-5g-ne', 'xiaomi', 'Xiaomi', 'Xiaomi 11 Lite 5G NE', 90, 240, 93, 82, 72, 62, 47, 76),
  makeModel('xiaomi-mi-11', 'xiaomi', 'Xiaomi', 'Xiaomi Mi 11', 120, 480, 90, 79, 69, 59, 45, 73),
  makeModel('xiaomi-mi-10t-pro', 'xiaomi', 'Xiaomi', 'Xiaomi Mi 10T Pro', 144, 240, 90, 79, 69, 59, 44, 73),
  makeModel('xiaomi-black-shark-5-pro', 'xiaomi', 'Xiaomi', 'Xiaomi Black Shark 5 Pro', 144, 720, 85, 74, 64, 54, 41, 68),
  makeModel('xiaomi-black-shark-4', 'xiaomi', 'Xiaomi', 'Xiaomi Black Shark 4', 144, 720, 86, 75, 65, 55, 42, 69),

  // ================= REDMI =================
  makeModel('redmi-note-13-pro-plus', 'redmi', 'Redmi', 'Redmi Note 13 Pro+ 5G', 120, 240, 91, 80, 70, 60, 45, 74),
  makeModel('redmi-note-13-pro', 'redmi', 'Redmi', 'Redmi Note 13 Pro', 120, 240, 92, 81, 71, 61, 46, 75),
  makeModel('redmi-note-13', 'redmi', 'Redmi', 'Redmi Note 13', 120, 240, 94, 83, 73, 63, 48, 77),
  makeModel('redmi-note-12-pro-plus', 'redmi', 'Redmi', 'Redmi Note 12 Pro+', 120, 240, 92, 81, 71, 61, 46, 75),
  makeModel('redmi-note-12-pro', 'redmi', 'Redmi', 'Redmi Note 12 Pro', 120, 240, 93, 82, 72, 62, 47, 76),
  makeModel('redmi-note-12', 'redmi', 'Redmi', 'Redmi Note 12', 120, 240, 95, 84, 74, 64, 49, 78),
  makeModel('redmi-note-11-pro', 'redmi', 'Redmi', 'Redmi Note 11 Pro', 120, 360, 93, 82, 72, 62, 47, 76),
  makeModel('redmi-note-11', 'redmi', 'Redmi', 'Redmi Note 11', 90, 180, 96, 85, 75, 65, 50, 79),
  makeModel('redmi-note-10-pro', 'redmi', 'Redmi', 'Redmi Note 10 Pro', 120, 240, 94, 83, 73, 63, 48, 77),
  makeModel('redmi-note-10s', 'redmi', 'Redmi', 'Redmi Note 10S', 60, 180, 97, 86, 76, 66, 51, 80),
  makeModel('redmi-note-9s', 'redmi', 'Redmi', 'Redmi Note 9S', 60, 120, 98, 87, 77, 67, 51, 81),
  makeModel('redmi-note-8-pro', 'redmi', 'Redmi', 'Redmi Note 8 Pro', 60, 120, 99, 88, 78, 68, 52, 82),
  makeModel('redmi-13c', 'redmi', 'Redmi', 'Redmi 13C', 90, 180, 98, 86, 76, 66, 51, 80),
  makeModel('redmi-12', 'redmi', 'Redmi', 'Redmi 12', 90, 180, 97, 86, 76, 66, 50, 80),
  makeModel('redmi-12c', 'redmi', 'Redmi', 'Redmi 12C', 60, 120, 99, 88, 78, 68, 52, 82),
  makeModel('redmi-a3', 'redmi', 'Redmi', 'Redmi A3', 90, 180, 99, 88, 78, 68, 52, 82),
  makeModel('redmi-a2', 'redmi', 'Redmi', 'Redmi A2', 60, 120, 100, 89, 79, 69, 53, 83),
  makeModel('redmi-k70-pro', 'redmi', 'Redmi', 'Redmi K70 Pro', 120, 480, 88, 77, 67, 57, 43, 71),
  makeModel('redmi-k60', 'redmi', 'Redmi', 'Redmi K60', 120, 480, 89, 78, 68, 58, 44, 72),

  // ================= POCO =================
  makeModel('poco-f6-pro', 'poco', 'POCO', 'POCO F6 Pro', 120, 480, 87, 76, 66, 56, 42, 70),
  makeModel('poco-f6', 'poco', 'POCO', 'POCO F6', 120, 480, 88, 77, 67, 57, 43, 71),
  makeModel('poco-f5-pro', 'poco', 'POCO', 'POCO F5 Pro', 120, 480, 89, 78, 68, 58, 44, 72),
  makeModel('poco-f5', 'poco', 'POCO', 'POCO F5', 120, 240, 90, 79, 69, 59, 45, 73),
  makeModel('poco-f4-gt', 'poco', 'POCO', 'POCO F4 GT', 120, 480, 87, 76, 66, 56, 42, 70),
  makeModel('poco-f3', 'poco', 'POCO', 'POCO F3', 120, 360, 91, 80, 70, 60, 45, 74),
  makeModel('poco-x6-pro-5g', 'poco', 'POCO', 'POCO X6 Pro 5G', 120, 480, 89, 78, 68, 58, 44, 72),
  makeModel('poco-x6', 'poco', 'POCO', 'POCO X6', 120, 240, 91, 80, 70, 60, 46, 74),
  makeModel('poco-x5-pro', 'poco', 'POCO', 'POCO X5 Pro 5G', 120, 240, 92, 81, 71, 61, 46, 75),
  makeModel('poco-x4-pro', 'poco', 'POCO', 'POCO X4 Pro 5G', 120, 360, 92, 81, 71, 61, 46, 75),
  makeModel('poco-x3-pro', 'poco', 'POCO', 'POCO X3 Pro', 120, 240, 93, 82, 72, 62, 47, 76),
  makeModel('poco-x3-nfc', 'poco', 'POCO', 'POCO X3 NFC', 120, 240, 94, 83, 73, 63, 48, 77),
  makeModel('poco-m6-pro', 'poco', 'POCO', 'POCO M6 Pro', 120, 240, 94, 83, 73, 63, 48, 77),
  makeModel('poco-m5s', 'poco', 'POCO', 'POCO M5s', 60, 180, 97, 86, 76, 66, 51, 80),
  makeModel('poco-m4-pro', 'poco', 'POCO', 'POCO M4 Pro', 90, 180, 96, 85, 75, 65, 50, 79),
  makeModel('poco-c65', 'poco', 'POCO', 'POCO C65', 90, 180, 98, 86, 76, 66, 51, 80),
  makeModel('poco-c55', 'poco', 'POCO', 'POCO C55', 60, 120, 99, 88, 78, 68, 52, 82),

  // ================= REALME =================
  makeModel('realme-gt-6', 'realme', 'Realme', 'Realme GT 6', 120, 360, 88, 77, 67, 57, 43, 71),
  makeModel('realme-gt-5-pro', 'realme', 'Realme', 'Realme GT 5 Pro', 144, 360, 87, 76, 66, 56, 42, 70),
  makeModel('realme-gt-neo-5', 'realme', 'Realme', 'Realme GT Neo 5', 144, 360, 88, 77, 67, 57, 43, 71),
  makeModel('realme-gt-neo-3', 'realme', 'Realme', 'Realme GT Neo 3', 120, 360, 90, 79, 69, 59, 45, 73),
  makeModel('realme-gt-master', 'realme', 'Realme', 'Realme GT Master Edition', 120, 360, 91, 80, 70, 60, 45, 74),
  makeModel('realme-12-pro-plus', 'realme', 'Realme', 'Realme 12 Pro+', 120, 240, 92, 81, 71, 61, 46, 75),
  makeModel('realme-12-pro', 'realme', 'Realme', 'Realme 12 Pro', 120, 240, 93, 82, 72, 62, 47, 76),
  makeModel('realme-11-pro-plus', 'realme', 'Realme', 'Realme 11 Pro+', 120, 360, 92, 81, 71, 61, 46, 75),
  makeModel('realme-11', 'realme', 'Realme', 'Realme 11', 90, 180, 95, 84, 74, 64, 49, 78),
  makeModel('realme-10-pro-plus', 'realme', 'Realme', 'Realme 10 Pro+', 120, 360, 93, 82, 72, 62, 47, 76),
  makeModel('realme-9-pro-plus', 'realme', 'Realme', 'Realme 9 Pro+', 90, 360, 94, 83, 73, 63, 48, 77),
  makeModel('realme-c67', 'realme', 'Realme', 'Realme C67', 90, 180, 97, 85, 75, 65, 50, 79),
  makeModel('realme-c65', 'realme', 'Realme', 'Realme C65', 90, 180, 97, 86, 76, 66, 50, 80),
  makeModel('realme-c55', 'realme', 'Realme', 'Realme C55', 90, 180, 98, 86, 76, 66, 51, 80),
  makeModel('realme-c53', 'realme', 'Realme', 'Realme C53', 90, 180, 98, 87, 77, 67, 51, 81),
  makeModel('realme-c35', 'realme', 'Realme', 'Realme C35', 60, 180, 99, 88, 78, 68, 52, 82),
  makeModel('realme-narzo-70-pro', 'realme', 'Realme', 'Realme Narzo 70 Pro', 120, 240, 93, 82, 72, 62, 47, 76),
  makeModel('realme-narzo-60', 'realme', 'Realme', 'Realme Narzo 60', 90, 180, 95, 84, 74, 64, 49, 78),

  // ================= INFINIX =================
  makeModel('infinix-gt-20-pro', 'infinix', 'Infinix', 'Infinix GT 20 Pro', 144, 360, 88, 77, 67, 57, 43, 71),
  makeModel('infinix-gt-10-pro', 'infinix', 'Infinix', 'Infinix GT 10 Pro', 120, 360, 90, 79, 69, 59, 45, 73),
  makeModel('infinix-note-40-pro-plus', 'infinix', 'Infinix', 'Infinix Note 40 Pro+', 120, 360, 91, 80, 70, 60, 45, 74),
  makeModel('infinix-note-40-pro', 'infinix', 'Infinix', 'Infinix Note 40 Pro', 120, 360, 92, 81, 71, 61, 46, 75),
  makeModel('infinix-note-40', 'infinix', 'Infinix', 'Infinix Note 40', 120, 360, 93, 82, 72, 62, 47, 76),
  makeModel('infinix-note-30-pro', 'infinix', 'Infinix', 'Infinix Note 30 Pro', 120, 360, 93, 82, 72, 62, 47, 76),
  makeModel('infinix-note-30', 'infinix', 'Infinix', 'Infinix Note 30', 120, 240, 94, 83, 73, 63, 48, 77),
  makeModel('infinix-hot-40-pro', 'infinix', 'Infinix', 'Infinix Hot 40 Pro', 120, 240, 95, 84, 74, 64, 49, 78),
  makeModel('infinix-hot-40i', 'infinix', 'Infinix', 'Infinix Hot 40i', 90, 180, 98, 86, 76, 66, 51, 80),
  makeModel('infinix-hot-30', 'infinix', 'Infinix', 'Infinix Hot 30', 90, 180, 97, 86, 76, 66, 50, 80),
  makeModel('infinix-hot-20s', 'infinix', 'Infinix', 'Infinix Hot 20S', 120, 240, 95, 84, 74, 64, 49, 78),
  makeModel('infinix-zero-30-5g', 'infinix', 'Infinix', 'Infinix Zero 30 5G', 144, 360, 89, 78, 68, 58, 44, 72),
  makeModel('infinix-smart-8', 'infinix', 'Infinix', 'Infinix Smart 8', 90, 180, 99, 88, 78, 68, 52, 82),

  // ================= TECNO =================
  makeModel('tecno-pova-6-pro-5g', 'tecno', 'Tecno', 'Tecno Pova 6 Pro 5G', 120, 360, 90, 79, 69, 59, 45, 73),
  makeModel('tecno-pova-6', 'tecno', 'Tecno', 'Tecno Pova 6', 120, 360, 91, 80, 70, 60, 45, 74),
  makeModel('tecno-pova-5-pro', 'tecno', 'Tecno', 'Tecno Pova 5 Pro 5G', 120, 240, 92, 81, 71, 61, 46, 75),
  makeModel('tecno-pova-5', 'tecno', 'Tecno', 'Tecno Pova 5', 120, 240, 93, 82, 72, 62, 47, 76),
  makeModel('tecno-pova-4', 'tecno', 'Tecno', 'Tecno Pova 4', 90, 180, 96, 85, 75, 65, 50, 79),
  makeModel('tecno-camon-30-premier', 'tecno', 'Tecno', 'Tecno Camon 30 Premier', 120, 360, 90, 79, 69, 59, 44, 73),
  makeModel('tecno-camon-30-pro', 'tecno', 'Tecno', 'Tecno Camon 30 Pro', 144, 360, 89, 78, 68, 58, 44, 72),
  makeModel('tecno-camon-20-pro', 'tecno', 'Tecno', 'Tecno Camon 20 Pro 5G', 120, 240, 92, 81, 71, 61, 46, 75),
  makeModel('tecno-spark-20-pro-plus', 'tecno', 'Tecno', 'Tecno Spark 20 Pro+', 120, 240, 93, 82, 72, 62, 47, 76),
  makeModel('tecno-spark-20', 'tecno', 'Tecno', 'Tecno Spark 20', 90, 180, 97, 86, 76, 66, 50, 80),
  makeModel('tecno-spark-10-pro', 'tecno', 'Tecno', 'Tecno Spark 10 Pro', 90, 180, 97, 86, 76, 66, 51, 80),
  makeModel('tecno-phantom-v-fold', 'tecno', 'Tecno', 'Tecno Phantom V Fold', 120, 240, 90, 79, 69, 59, 45, 73),

  // ================= OUTRAS FABRICANTES (Apple, ASUS ROG, RedMagic, OnePlus, Google, Vivo, OPPO, Honor, Sony, Nothing) =================
  makeModel('apple-iphone-15-pro-max', 'other', 'Apple', 'Apple iPhone 15 Pro Max', 120, 240, 88, 78, 68, 58, 43, 72),
  makeModel('apple-iphone-15', 'other', 'Apple', 'Apple iPhone 15', 60, 120, 92, 82, 72, 62, 47, 76),
  makeModel('apple-iphone-14-pro-max', 'other', 'Apple', 'Apple iPhone 14 Pro Max', 120, 240, 89, 78, 68, 58, 44, 73),
  makeModel('apple-iphone-13', 'other', 'Apple', 'Apple iPhone 13', 60, 120, 93, 83, 73, 63, 48, 77),
  makeModel('apple-iphone-12', 'other', 'Apple', 'Apple iPhone 12', 60, 120, 94, 84, 74, 64, 49, 78),
  makeModel('apple-iphone-11', 'other', 'Apple', 'Apple iPhone 11', 60, 120, 95, 85, 75, 65, 50, 79),
  makeModel('apple-iphone-xr', 'other', 'Apple', 'Apple iPhone XR', 60, 120, 96, 86, 76, 66, 51, 80),
  makeModel('asus-rog-phone-8-pro', 'other', 'ASUS ROG', 'ASUS ROG Phone 8 Pro', 165, 720, 84, 73, 63, 53, 40, 67),
  makeModel('asus-rog-phone-7', 'other', 'ASUS ROG', 'ASUS ROG Phone 7 Ultimate', 165, 720, 84, 73, 63, 53, 40, 67),
  makeModel('asus-rog-phone-6', 'other', 'ASUS ROG', 'ASUS ROG Phone 6', 165, 720, 85, 74, 64, 54, 41, 68),
  makeModel('asus-zenfone-10', 'other', 'ASUS', 'ASUS Zenfone 10', 144, 360, 89, 78, 68, 58, 44, 72),
  makeModel('nubia-redmagic-9-pro', 'other', 'RedMagic', 'RedMagic 9 Pro', 120, 960, 83, 72, 62, 52, 39, 66),
  makeModel('nubia-redmagic-8s-pro', 'other', 'RedMagic', 'RedMagic 8S Pro', 120, 960, 84, 73, 63, 53, 40, 67),
  makeModel('oneplus-12', 'other', 'OnePlus', 'OnePlus 12', 120, 360, 88, 77, 67, 57, 43, 71),
  makeModel('oneplus-11', 'other', 'OnePlus', 'OnePlus 11', 120, 360, 89, 78, 68, 58, 44, 72),
  makeModel('oneplus-nord-3', 'other', 'OnePlus', 'OnePlus Nord 3 5G', 120, 240, 91, 80, 70, 60, 45, 74),
  makeModel('google-pixel-8-pro', 'other', 'Google', 'Google Pixel 8 Pro', 120, 240, 90, 79, 69, 59, 45, 73),
  makeModel('google-pixel-7a', 'other', 'Google', 'Google Pixel 7a', 90, 180, 94, 83, 73, 63, 48, 77),
  makeModel('vivo-v30-pro', 'other', 'Vivo', 'Vivo V30 Pro', 120, 300, 91, 80, 70, 60, 45, 74),
  makeModel('iqoo-12', 'other', 'iQOO', 'iQOO 12 5G', 144, 360, 87, 76, 66, 56, 42, 70),
  makeModel('oppo-reno-11-pro', 'other', 'OPPO', 'OPPO Reno 11 Pro', 120, 240, 91, 80, 70, 60, 45, 74),
  makeModel('oppo-find-x7-ultra', 'other', 'OPPO', 'OPPO Find X7 Ultra', 120, 240, 89, 78, 68, 58, 44, 72),
  makeModel('honor-magic-6-pro', 'other', 'Honor', 'Honor Magic 6 Pro', 120, 360, 88, 77, 67, 57, 43, 71),
  makeModel('honor-90', 'other', 'Honor', 'Honor 90', 120, 240, 92, 81, 71, 61, 46, 75),
  makeModel('huawei-p60-pro', 'other', 'Huawei', 'Huawei P60 Pro', 120, 300, 90, 79, 69, 59, 45, 73),
  makeModel('sony-xperia-1-v', 'other', 'Sony', 'Sony Xperia 1 V', 120, 240, 89, 78, 68, 58, 44, 72),
  makeModel('nothing-phone-2', 'other', 'Nothing', 'Nothing Phone (2)', 120, 240, 91, 80, 70, 60, 45, 74),
  makeModel('nothing-phone-2a', 'other', 'Nothing', 'Nothing Phone (2a)', 120, 240, 93, 82, 72, 62, 47, 76),
];

export const GLOBAL_DB_UPDATE_PACK: PhoneModelProfile[] = [
  makeModel('samsung-galaxy-s25-ultra', 'samsung', 'Samsung', 'Samsung Galaxy S25 Ultra', 120, 240, 88, 77, 67, 57, 43, 71),
  makeModel('samsung-galaxy-a56-5g', 'samsung', 'Samsung', 'Samsung Galaxy A56 5G', 120, 240, 92, 81, 71, 61, 46, 75),
  makeModel('motorola-moto-g75-5g', 'motorola', 'Motorola', 'Motorola Moto G75 5G', 120, 240, 93, 82, 72, 62, 47, 76),
  makeModel('motorola-edge-50-fusion', 'motorola', 'Motorola', 'Motorola Edge 50 Fusion', 144, 360, 89, 78, 68, 58, 44, 72),
  makeModel('xiaomi-15-ultra', 'xiaomi', 'Xiaomi', 'Xiaomi 15 Ultra', 120, 300, 87, 76, 66, 56, 42, 70),
  makeModel('redmi-note-14-pro-plus', 'redmi', 'Redmi', 'Redmi Note 14 Pro+ 5G', 120, 240, 90, 79, 69, 59, 45, 73),
  makeModel('poco-x7-pro', 'poco', 'POCO', 'POCO X7 Pro 5G', 120, 480, 88, 77, 67, 57, 43, 71),
  makeModel('realme-gt-7-pro', 'realme', 'Realme', 'Realme GT 7 Pro', 120, 360, 87, 76, 66, 56, 42, 70),
  makeModel('infinix-hot-50-pro-plus', 'infinix', 'Infinix', 'Infinix Hot 50 Pro+', 120, 240, 93, 82, 72, 62, 47, 76),
  makeModel('tecno-camon-30s-pro', 'tecno', 'Tecno', 'Tecno Camon 30S Pro', 120, 240, 92, 81, 71, 61, 46, 75),
  makeModel('apple-iphone-16-pro-max', 'other', 'Apple', 'Apple iPhone 16 Pro Max', 120, 240, 87, 77, 67, 57, 42, 71),
  makeModel('asus-rog-phone-9-pro', 'other', 'ASUS ROG', 'ASUS ROG Phone 9 Pro', 185, 720, 82, 71, 61, 51, 38, 65),
  makeModel('nubia-redmagic-10-pro', 'other', 'RedMagic', 'RedMagic 10 Pro', 144, 960, 82, 71, 61, 51, 39, 65),
];

export function loadCustomModels(): PhoneModelProfile[] {
  try {
    if (typeof localStorage === 'undefined') return [];
    const raw = localStorage.getItem(CUSTOM_DB_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCustomModels(models: PhoneModelProfile[]): void {
  try {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(CUSTOM_DB_STORAGE_KEY, JSON.stringify(models));
  } catch {
    // ignore storage restriction
  }
}

export function getSavedDbVersion(): string {
  try {
    if (typeof localStorage === 'undefined') return BASE_DB_VERSION;
    return localStorage.getItem(DB_VERSION_STORAGE_KEY) || BASE_DB_VERSION;
  } catch {
    return BASE_DB_VERSION;
  }
}

export function setSavedDbVersion(version: string): void {
  try {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(DB_VERSION_STORAGE_KEY, version);
  } catch {
    // ignore
  }
}

export function getAllGlobalDevices(customModels: PhoneModelProfile[]): PhoneModelProfile[] {
  const byId = new Map<string, PhoneModelProfile>();
  for (const item of GLOBAL_DEVICE_DATABASE) {
    byId.set(item.id, item);
  }
  for (const custom of customModels) {
    byId.set(custom.id, custom);
  }
  return Array.from(byId.values());
}

export function searchGlobalDevices(
  devices: PhoneModelProfile[],
  query: string,
  brandFilter: BrandId | 'all'
): PhoneModelProfile[] {
  const q = query.trim().toLowerCase();
  return devices.filter((device) => {
    if (brandFilter !== 'all' && device.brand !== brandFilter) {
      return false;
    }
    if (!q) return true;
    const haystack = `${device.model} ${device.manufacturer} ${device.brand} ${device.screenHz}hz`.toLowerCase();
    return q.split(/\s+/).every((term) => haystack.includes(term));
  });
}

export function calibrateCustomModelSensitivity(screenHz: number): SensitivityValues {
  if (screenHz >= 144) {
    return { geral: 88, redDot: 77, mira2x: 67, mira4x: 57, miraAwm: 43, olhadinha: 71 };
  }
  if (screenHz >= 120) {
    return { geral: 92, redDot: 81, mira2x: 71, mira4x: 61, miraAwm: 46, olhadinha: 75 };
  }
  if (screenHz >= 90) {
    return { geral: 97, redDot: 85, mira2x: 75, mira4x: 65, miraAwm: 50, olhadinha: 79 };
  }
  return { geral: 99, redDot: 88, mira2x: 78, mira4x: 68, miraAwm: 52, olhadinha: 82 };
}

export function applyGlobalDatabaseUpdatePack(): {
  addedCount: number;
  version: string;
  updatedCustomList: PhoneModelProfile[];
} {
  const existingCustom = loadCustomModels();
  const existingIds = new Set([
    ...GLOBAL_DEVICE_DATABASE.map((d) => d.id),
    ...existingCustom.map((d) => d.id),
  ]);

  let addedCount = 0;
  const nextCustom = [...existingCustom];

  for (const packItem of GLOBAL_DB_UPDATE_PACK) {
    if (!existingIds.has(packItem.id)) {
      nextCustom.push({ ...packItem, isCustom: true });
      existingIds.add(packItem.id);
      addedCount += 1;
    }
  }

  saveCustomModels(nextCustom);
  setSavedDbVersion(UPDATED_DB_VERSION);
  return {
    addedCount,
    version: UPDATED_DB_VERSION,
    updatedCustomList: nextCustom,
  };
}
