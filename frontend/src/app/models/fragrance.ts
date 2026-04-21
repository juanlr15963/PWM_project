export interface FragranceNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export interface Fragrance {
  id: string;
  name: string;
  brand: string;
  image: string;
  season: string[];
  time: string;
  gender: string;
  notes: FragranceNotes;
}
