export type FragranceSeason = 'Verano' | 'Otoño' | 'Invierno' | 'Primavera';
export type FragranceTime = 'Día' | 'Noche';
export type FragranceGender = 'Masculino' | 'Femenino' | 'Unisex';

export interface FragranceNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export interface Fragrance {
  id: string;
  name: string;
  brand: string;
  description?: string;
  image: string;
  season: FragranceSeason[];
  time: FragranceTime;
  gender: FragranceGender;
  notes: FragranceNotes;
}

export type FragranceNoteType = keyof FragranceNotes;
