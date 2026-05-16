import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
  selector: 'app-nota',
  standalone: true,
  imports: [CommonModule, RouterLink, AppShellComponent],
  templateUrl: './nota.page.html',
  styleUrls: ['./nota.page.scss'],
})
export class NotaPage implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly authService = inject(AuthService);
  private readonly fragranceService = inject(FragranceService);
  private readonly noteService = inject(NoteService);
  private readonly userProfileService = inject(UserProfileService);

  private dataSubscription?: Subscription;

  note?: Note;
  suggestedFragrances: Fragrance[] = [];
  isLoading = true;
  isLoggedIn = false;
  isFavorite = false;
  isSaving = false;

  ngOnInit(): void {
    this.dataSubscription = combineLatest([
      this.route.paramMap,
      this.route.queryParams,
      this.fragranceService.getAll(),
      this.authService.user$,
    ])
      .pipe(
        switchMap(([params, queryParams, fragrances, user]) => {
          const name: string | undefined = params.get('name') ?? queryParams['name'];
          this.isLoggedIn = !!user;

          if (!name) {
            this.isLoading = false;
            return of(null);
          }

          return this.noteService.getByName(name).pipe(
            switchMap((note) => {
              this.note = note;
              this.suggestedFragrances = note ? this.findFragrancesContaining(fragrances, note.name) : [];
              this.isLoading = false;

              if (!user || !note) {
                this.isFavorite = false;
                return of(null);
              }

              return this.userProfileService.get(user.uid).pipe(
                switchMap((profile) => {
                  this.isFavorite = !!profile?.favoriteNotes?.includes(note.name);
                  return of(null);
                })
              );
            })
          );
        })
      )
      .subscribe({
        error: (err) => {
          console.error('Error cargando nota:', err);
          this.isLoading = false;
        },
      });
  }

  ngOnDestroy(): void {
    this.dataSubscription?.unsubscribe();
  }

  async toggleFavorite(): Promise<void> {
    const user = await this.authService.getCurrentUser();
    if (!user || !this.note || this.isSaving) return;

    this.isSaving = true;
    try {
      if (this.isFavorite) {
        await this.userProfileService.removeFavoriteNote(user.uid, this.note.name);
      } else {
        await this.userProfileService.addFavoriteNote(user.uid, this.note.name);
      }
    } catch (error) {
      console.error('Error actualizando favoritos:', error);
    } finally {
      this.isSaving = false;
    }
  }

  private findFragrancesContaining(fragrances: Fragrance[], noteName: string): Fragrance[] {
    return fragrances.filter((f) =>
      [...(f.notes.top ?? []), ...(f.notes.heart ?? []), ...(f.notes.base ?? [])].includes(noteName)
    );
  }
}
