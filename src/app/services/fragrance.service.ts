import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FragranceService {
  // Usamos la IP local para evitar problemas con la resolución de 'localhost' en algunos navegadores
  private apiUrl = 'http://127.0.0.1:3000';

  constructor(private http: HttpClient) { }

  getFeaturedFragrances(): Observable<any[]> {
    // Quitamos el límite temporalmente para asegurar la conexión
    return this.http.get<any[]>(`${this.apiUrl}/fragrances`);
  }
}
