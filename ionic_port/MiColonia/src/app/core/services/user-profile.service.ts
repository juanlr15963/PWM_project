import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  arrayRemove,
  arrayUnion,
  doc,
  docData,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { Storage, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';
import { Observable, map } from 'rxjs';
import { UserProfile } from '../models';

const USERS_COLLECTION = 'users';

@Injectable({ providedIn: 'root' })
export class UserProfileService {
  private readonly firestore = inject(Firestore);
  private readonly storage = inject(Storage);

  get(uid: string): Observable<UserProfile | undefined> {
    return docData(doc(this.firestore, `${USERS_COLLECTION}/${uid}`)).pipe(
      map((profile) => profile as UserProfile | undefined)
    );
  }

  async create(profile: UserProfile): Promise<void> {
    await setDoc(
      doc(this.firestore, `${USERS_COLLECTION}/${profile.uid}`),
      {
        ...profile,
        favoriteNotes: profile.favoriteNotes ?? [],
        collection: profile.collection ?? [],
        createdAt: profile.createdAt ?? new Date(),
      },
      { merge: true }
    );
  }

  addFragranceToCollection(uid: string, fragranceId: string): Promise<void> {
    return updateDoc(doc(this.firestore, `${USERS_COLLECTION}/${uid}`), {
      collection: arrayUnion(String(fragranceId)),
    });
  }

  removeFragranceFromCollection(uid: string, fragranceId: string): Promise<void> {
    return updateDoc(doc(this.firestore, `${USERS_COLLECTION}/${uid}`), {
      collection: arrayRemove(String(fragranceId)),
    });
  }

  addFavoriteNote(uid: string, noteName: string): Promise<void> {
    return updateDoc(doc(this.firestore, `${USERS_COLLECTION}/${uid}`), {
      favoriteNotes: arrayUnion(noteName),
    });
  }

  removeFavoriteNote(uid: string, noteName: string): Promise<void> {
    return updateDoc(doc(this.firestore, `${USERS_COLLECTION}/${uid}`), {
      favoriteNotes: arrayRemove(noteName),
    });
  }

  async uploadProfileImage(uid: string, file: File): Promise<string> {
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-');
    const fileRef = ref(this.storage, `${USERS_COLLECTION}/${uid}/profile-${Date.now()}-${safeName}`);
    await uploadBytes(fileRef, file);
    return getDownloadURL(fileRef);
  }
}
