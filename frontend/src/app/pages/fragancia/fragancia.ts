import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { DataService, Note, UserProfile } from '../../services/data';
import { Fragrance, FragranceNotes } from '../../models/fragrance';

@Component({
  selector: 'app-fragancia',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './fragancia.html',
  styleUrl: './fragancia.css'
})
export class FraganciaComponent implements OnInit {
  fragrance?: Fragrance;
  allNotes: Note[] = [];
  userProfile?: UserProfile;
  isLoggedIn = false;
  isInCollection = false;
  isSaving = false;

  noteTypes: { key: keyof FragranceNotes; label: string }[] = [
    { key: 'top', label: 'Salida' },
    { key: 'heart', label: 'Corazon' },
    { key: 'base', label: 'Base' }
  ];

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    const fragrance$ = this.route.paramMap.pipe(
      switchMap(params => this.dataService.getFragranceById(params.get('id') || ''))
    );

    combineLatest([
      fragrance$,
      this.dataService.getNotes(),
      this.authService.user$
    ]).subscribe(([fragrance, notes, user]) => {
      this.fragrance = fragrance;
      this.allNotes = notes;
      this.isLoggedIn = !!user;

      if (!user) {
        this.userProfile = undefined;
        this.isInCollection = false;
        return;
      }

      this.dataService.getUserProfile(user.uid).subscribe(profile => {
        this.userProfile = profile;
        this.isInCollection = !!fragrance && !!profile?.collection?.includes(String(fragrance.id));
      });
    });
  }

  getNoteImage(noteName: string): string | null {
    const note = this.allNotes.find(n => n.name === noteName);
    return note?.image || null;
  }

  getNotesByType(key: keyof FragranceNotes): string[] {
    return this.fragrance?.notes[key] || [];
  }

  async toggleCollection() {
    const user = await this.authService.getCurrentUser();
    if (!user || !this.fragrance || this.isSaving) return;

    this.isSaving = true;
    try {
      if (this.isInCollection) {
        await this.dataService.removeFragranceFromCollection(user.uid, this.fragrance.id);
      } else {
        await this.dataService.addFragranceToCollection(user.uid, this.fragrance.id);
      }
    } catch (error) {
      console.error('Error actualizando coleccion:', error);
    } finally {
      this.isSaving = false;
    }
  }
}
