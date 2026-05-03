import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private firestore = inject(Firestore);

  // Obtener todas las fragancias
  getFragrances(): Observable<any[]> {
    const fragCollection = collection(this.firestore, 'fragrances');
    return collectionData(fragCollection, { idField: 'id' });
  }

  // Obtener todas las notas
  getNotes(): Observable<any[]> {
    const notesCollection = collection(this.firestore, 'notes');
    return collectionData(notesCollection, { idField: 'id' });
  }

  // Obtener una fragancia específica por ID
  getFragranceById(id: string): Observable<any> {
    const fragDoc = doc(this.firestore, `fragrances/${id}`);
    return docData(fragDoc, { idField: 'id' });
  }
}
