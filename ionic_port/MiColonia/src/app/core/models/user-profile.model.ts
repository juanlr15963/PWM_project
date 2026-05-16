export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string;
  photoURL?: string | null;
  favoriteNotes: string[];
  collection: string[];
  createdAt?: Date;
}
