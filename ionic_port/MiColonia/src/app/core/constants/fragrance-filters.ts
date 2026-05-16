import { Fragrance } from '../models';

export interface FragranceFilter {
  readonly label: string;
  readonly value: string;
}

export const ALL_FILTERS_VALUE = 'all';

export const FRAGRANCE_FILTERS: readonly FragranceFilter[] = [
  { label: 'Todos', value: ALL_FILTERS_VALUE },
  { label: 'Verano', value: 'Verano' },
  { label: 'Invierno', value: 'Invierno' },
  { label: 'Otoño', value: 'Otoño' },
  { label: 'Primavera', value: 'Primavera' },
  { label: 'Día', value: 'Día' },
  { label: 'Noche', value: 'Noche' },
  { label: 'Masculino', value: 'Masculino' },
  { label: 'Femenino', value: 'Femenino' },
  { label: 'Unisex', value: 'Unisex' },
];

export function applyFragranceFilter(fragrances: Fragrance[], value: string): Fragrance[] {
  if (value === ALL_FILTERS_VALUE) return fragrances;

  return fragrances.filter(
    (f) =>
      f.season?.includes(value as Fragrance['season'][number]) ||
      f.time === value ||
      f.gender === value
  );
}
