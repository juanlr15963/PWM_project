import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subscription, combineLatest, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Fragrance, Note } from '../../core/models';
import {
  AuthService,
  FragranceService,
  NoteService,
  UserProfileService,
} from '../../core/services';
import { AppShellComponent } from '../../shared/components/app-shell/app-shell.component';

@Component({
  selector: 'app-mi-espacio',
  standalone: true,
  imports: [CommonModule, RouterLink, AppShellComponent],
  templateUrl: './mi-espacio.page.html',
  styleUrls: ['./mi-espacio.page.scss'],
})
export class MiEspacioPage implements OnInit, OnDestroy {
  private readonly authService = inject(AuthService);
  private readonly fragranceService = inject(FragranceService);
  private readonly noteService = inject(NoteService);
  private readonly userProfileService = inject(UserProfileService);

  private dataSubscription?: Subscription;

  welcomeMessage = 'Cargando tu rincón personal...';
  userCollection: Fragrance[] = [];
  favoriteNotes: Note[] = [];

  ngOnInit(): void {
    this.dataSubscription = this.authService.user$
      .pipe(
        switchMap((user) => {
          if (!user) return of(null);
          return combineLatest({
            profile: this.userProfileService.get(user.uid),
            allFragrances: this.fragranceService.getAll(),
            allNotes: this.noteService.getAll(),
          });
        })
      )
      .subscribe({
        next: (data) => {
          if (!data) return;
          const { profile, allFragrances, allNotes } = data;

          this.welcomeMessage = `Bienvenido, ${profile?.displayName || profile?.email || 'entusiasta'}.`;
          const collectionIds = profile?.collection ?? [];
          const favoriteNoteNames = profile?.favoriteNotes ?? [];

          this.userCollection = allFragrances.filter((f) => collectionIds.includes(String(f.id)));
          this.favoriteNotes = allNotes.filter((n) => favoriteNoteNames.includes(n.name));
        },
        error: (err) => {
          console.error('Error cargando Mi Espacio:', err);
          this.welcomeMessage = 'Error al cargar tus datos.';
        },
      });
  }

  ngOnDestroy(): void {
    this.dataSubscription?.unsubscribe();
  }
}
