import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Fragrance } from '../models/fragrance';

@Injectable({ providedIn: 'root' })
export class FragranceService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://127.0.0.1:3000';

  getFeaturedFragrances(): Observable<Fragrance[]> {
    return this.http.get<Fragrance[]>(`${this.apiUrl}/fragrances`);
  }
}
