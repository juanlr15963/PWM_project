import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Fragrance } from '../models/fragrance';
import { DataService } from './data';

@Injectable({ providedIn: 'root' })
export class FragranceService {
  private readonly dataService = inject(DataService);

  getFeaturedFragrances(): Observable<Fragrance[]> {
    return this.dataService.getFragrances();
  }
}
