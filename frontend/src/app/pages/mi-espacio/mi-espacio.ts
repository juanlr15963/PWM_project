import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { combineLatest, of, switchMap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { DataService, Note } from '../../services/data';
import { Fragrance } from '../../models/fragrance';

@Component({
  selector: 'app-mi-espacio',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mi-espacio.html',
  styleUrls: ['./mi-espacio.css']
})
export class MiEspacioComponent implements OnInit {
  private authService = inject(AuthService);
  private dataService = inject(DataService);

  welcomeMessage: string = 'Cargando tu rincon personal...';
  userCollection: Fragrance[] = [];
  favoriteNotes: Note[] = [];

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    this.authService.user$.pipe(
      switchMap(user => {
        if (!user) return of(null);
        return combineLatest({
          profile: this.dataService.getUserProfile(user.uid),
          allFragrances: this.dataService.getFragrances(),
          allNotes: this.dataService.getNotes()
        });
      })
    ).subscribe({
      next: (res) => {
        if (!res) return;

        const { profile, allFragrances, allNotes } = res;
        this.welcomeMessage = `Bienvenido, ${profile?.displayName || profile?.email || 'entusiasta'}.`;
        const collectionIds = profile?.collection || [];
        const favoriteNoteNames = profile?.favoriteNotes || [];

        this.userCollection = allFragrances.filter(f => collectionIds.includes(String(f.id)));
        this.favoriteNotes = allNotes.filter(n => favoriteNoteNames.includes(n.name));
      },
      error: (err) => {
        console.error('Error cargando Mi Espacio:', err);
        this.welcomeMessage = 'Error al cargar tus datos.';
      }
    });
  }
}
