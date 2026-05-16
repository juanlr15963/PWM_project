import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
} from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { CustomDesign, Fragrance } from '../models';

const FRAGRANCES_COLLECTION = 'fragrances';
const CUSTOM_DESIGNS_COLLECTION = 'custom_designs';

@Injectable({ providedIn: 'root' })
export class FragranceService {
  private readonly firestore = inject(Firestore);

  getAll(): Observable<Fragrance[]> {
    const fragRef = collection(this.firestore, FRAGRANCES_COLLECTION);
    return collectionData(fragRef, { idField: 'docId' }).pipe(
      map((items) => items.map((item) => this.normalize(item)))
    );
  }

  getById(id: string): Observable<Fragrance | undefined> {
    return this.getAll().pipe(
      map((fragrances) => fragrances.find((f) => String(f.id) === String(id)))
    );
  }

  saveCustomDesign(design: CustomDesign): Promise<unknown> {
    const designsRef = collection(this.firestore, CUSTOM_DESIGNS_COLLECTION);
    return addDoc(designsRef, design);
  }

  private normalize(item: any): Fragrance {
    const id = item.id ?? item.docId;
    return {
      ...item,
      id: String(id),
      season: item.season ?? [],
      notes: {
        top: item.notes?.top ?? [],
        heart: item.notes?.heart ?? [],
        base: item.notes?.base ?? [],
      },
    } as Fragrance;
  }
}
