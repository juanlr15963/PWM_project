import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service'; // Tu servicio de Auth
import { forkJoin, switchMap, of } from 'rxjs';

@Component({
  selector: 'app-mi-espacio',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mi-espacio.html',
  styleUrls: ['./mi-espacio.css']
})
export class MiEspacioComponent implements OnInit {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  welcomeMessage: string = 'Cargando tu rincón personal...';
  userCollection: any[] = [];
  favoriteNotes: any[] = [];

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    // 1. Obtenemos el usuario logueado de Firebase
    this.authService.user$.pipe(
      switchMap(user => {
        if (!user) return of(null);
        // 2. Buscamos sus datos extendidos en nuestro json-server
        return forkJoin({
          userData: this.http.get<any>(`http://localhost:3000/users/${user.uid}`),
          allFragrances: this.http.get<any[]>('http://localhost:3000/fragrances'),
          allNotes: this.http.get<any[]>('http://localhost:3000/notes')
        });
      })
    ).subscribe({
      next: (res) => {
        if (res) {
          const { userData, allFragrances, allNotes } = res;
          this.welcomeMessage = `Bienvenido, ${userData.username || 'entusiasta'}.`;

          // 3. Filtramos los datos para mostrar solo los que el usuario tiene
          this.userCollection = allFragrances.filter(f =>
            userData.collection?.includes(f.id)
          );

          this.favoriteNotes = allNotes.filter(n =>
            userData.favoriteNotes?.includes(n.name)
          );
        }
      },
      error: (err) => {
        console.error('Error cargando Mi Espacio:', err);
        this.welcomeMessage = 'Error al cargar tus datos.';
      }
    });
  }
}
