import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  query,
  where,
} from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { Note } from '../models';

const NOTES_COLLECTION = 'notes';

@Injectable({ providedIn: 'root' })
export class NoteService {
  private readonly firestore = inject(Firestore);

  getAll(): Observable<Note[]> {
    const notesRef = collection(this.firestore, NOTES_COLLECTION);
    return collectionData(notesRef, { idField: 'docId' }) as Observable<Note[]>;
  }

  getByName(name: string): Observable<Note | undefined> {
    const notesQuery = query(collection(this.firestore, NOTES_COLLECTION), where('name', '==', name));
    return collectionData(notesQuery, { idField: 'docId' }).pipe(
      map((notes) => notes[0] as Note | undefined)
    );
  }
}
