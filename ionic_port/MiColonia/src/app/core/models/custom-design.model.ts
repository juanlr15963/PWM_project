import { FragranceNotes } from './fragrance.model';

export interface CustomDesign {
  id?: string;
  name: string;
  userId: string;
  createdAt: Date;
  notes: FragranceNotes;
}
