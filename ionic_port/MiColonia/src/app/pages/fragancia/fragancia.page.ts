import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription, combineLatest, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Fragrance, FragranceNoteType, Note, UserProfile } from '../../core/models';
import {
  AuthService,
  FragranceService,
  NoteService,
  UserProfileService,
} from '../../core/services';
import { AppShellComponent } from '../../shared/components/app-shell/app-shell.component';

interface NoteTypeLabel {
  readonly key: FragranceNoteType;
  readonly label: string;
}

const NOTE_TYPE_LABELS: readonly NoteTypeLabel[] = [
  { key: 'top', label: 'Salida' },
  { key: 'heart', label: 'Corazón' },
  { key: 'base', label: 'Base' },
];

@Component({
  selector: 'app-fragancia',
  standalone: true,
  imports: [CommonModule, RouterLink, AppShellComponent],
  templateUrl: './fragancia.page.html',
  styleUrls: ['./fragancia.page.scss'],
})
export class FraganciaPage implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly authService = inject(AuthService);
  private readonly fragranceService = inject(FragranceService);
  private readonly noteService = inject(NoteService);
  private readonly userProfileService = inject(UserProfileService);

  private dataSubscription?: Subscription;

  readonly noteTypes = NOTE_TYPE_LABELS;
  fragrance?: Fragrance;
  allNotes: Note[] = [];
  userProfile?: UserProfile;
  isLoggedIn = false;
  isInCollection = false;
  isSaving = false;

  ngOnInit(): void {
    const fragrance$ = this.route.paramMap.pipe(
      switchMap((params) => this.fragranceService.getById(params.get('id') ?? ''))
    );

    this.dataSubscription = combineLatest([
      fragrance$,
      this.noteService.getAll(),
      this.authService.user$,
    ])
      .pipe(
        switchMap(([fragrance, notes, user]) => {
          this.fragrance = fragrance;
          this.allNotes = notes;
          this.isLoggedIn = !!user;

          if (!user) {
            this.userProfile = undefined;
            this.isInCollection = false;
            return of(null);
          }

          return this.userProfileService.get(user.uid).pipe(
            switchMap((profile) => {
              this.userProfile = profile;
              this.isInCollection =
                !!fragrance && !!profile?.collection?.includes(String(fragrance.id));
              return of(null);
            })
          );
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.dataSubscription?.unsubscribe();
  }

  getNoteImage(noteName: string): string | null {
    return this.allNotes.find((n) => n.name === noteName)?.image ?? null;
  }

  getNotesByType(key: FragranceNoteType): string[] {
    return this.fragrance?.notes[key] ?? [];
  }

  async toggleCollection(): Promise<void> {
    const user = await this.authService.getCurrentUser();
    if (!user || !this.fragrance || this.isSaving) return;

    this.isSaving = true;
    try {
      if (this.isInCollection) {
        await this.userProfileService.removeFragranceFromCollection(user.uid, this.fragrance.id);
      } else {
        await this.userProfileService.addFragranceToCollection(user.uid, this.fragrance.id);
      }
    } catch (error) {
      console.error('Error actualizando colección:', error);
    } finally {
      this.isSaving = false;
    }
  }
}
