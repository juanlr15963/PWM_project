import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  arrayRemove,
  arrayUnion,
  collection,
  collectionData,
  doc,
  docData,
  query,
  setDoc,
  updateDoc,
  where
} from '@angular/fire/firestore';
import { Storage, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';
import { Observable, map } from 'rxjs';
import { Fragrance } from '../models/fragrance';

export interface Note {
  id?: string;
  name: string;
  type?: string;
  description?: string;
  image?: string;
}

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string;
  photoURL?: string | null;
  favoriteNotes: string[];
  collection: string[];
  createdAt?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private firestore = inject(Firestore);
  private storage = inject(Storage);

  getFragrances(): Observable<Fragrance[]> {
    const fragCollection = collection(this.firestore, 'fragrances');
    return collectionData(fragCollection, { idField: 'docId' }).pipe(
      map(items => items.map(item => this.normalizeFragrance(item)))
    );
  }

  getNotes(): Observable<Note[]> {
    const notesCollection = collection(this.firestore, 'notes');
    return collectionData(notesCollection, { idField: 'docId' }) as Observable<Note[]>;
  }

  getFragranceById(id: string): Observable<Fragrance | undefined> {
    return this.getFragrances().pipe(
      map(fragrances => fragrances.find(fragrance => String(fragrance.id) === String(id)))
    );
  }

  getNoteByName(name: string): Observable<Note | undefined> {
    const notesQuery = query(collection(this.firestore, 'notes'), where('name', '==', name));
    return collectionData(notesQuery, { idField: 'docId' }).pipe(
      map(notes => notes[0] as Note | undefined)
    );
  }

  getUserProfile(uid: string): Observable<UserProfile | undefined> {
    return docData(doc(this.firestore, `users/${uid}`)).pipe(
      map(profile => profile as UserProfile | undefined)
    );
  }

  async createUserProfile(profile: UserProfile): Promise<void> {
    await setDoc(doc(this.firestore, `users/${profile.uid}`), {
      ...profile,
      favoriteNotes: profile.favoriteNotes || [],
      collection: profile.collection || [],
      createdAt: profile.createdAt || new Date()
    }, { merge: true });
  }

  async addFragranceToCollection(uid: string, fragranceId: string): Promise<void> {
    await updateDoc(doc(this.firestore, `users/${uid}`), {
      collection: arrayUnion(String(fragranceId))
    });
  }

  async removeFragranceFromCollection(uid: string, fragranceId: string): Promise<void> {
    await updateDoc(doc(this.firestore, `users/${uid}`), {
      collection: arrayRemove(String(fragranceId))
    });
  }

  async addFavoriteNote(uid: string, noteName: string): Promise<void> {
    await updateDoc(doc(this.firestore, `users/${uid}`), {
      favoriteNotes: arrayUnion(noteName)
    });
  }

  async removeFavoriteNote(uid: string, noteName: string): Promise<void> {
    await updateDoc(doc(this.firestore, `users/${uid}`), {
      favoriteNotes: arrayRemove(noteName)
    });
  }

  async uploadProfileImage(uid: string, file: File): Promise<string> {
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-');
    const fileRef = ref(this.storage, `users/${uid}/profile-${Date.now()}-${safeName}`);
    await uploadBytes(fileRef, file);
    return getDownloadURL(fileRef);
  }

  private normalizeFragrance(item: any): Fragrance {
    const id = item.id ?? item.docId;
    return {
      ...item,
      id: String(id),
      season: item.season || [],
      notes: {
        top: item.notes?.top || [],
        heart: item.notes?.heart || [],
        base: item.notes?.base || []
      }
    } as Fragrance;
  }
}
