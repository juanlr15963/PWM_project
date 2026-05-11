import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { combineLatest } from 'rxjs';
import { DataService, Note } from '../../services/data';
import { AuthService } from '../../services/auth.service';
import { Fragrance } from '../../models/fragrance';

@Component({
  selector: 'app-nota',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './nota.html',
  styleUrl: './nota.css'
})
export class NotaComponent implements OnInit {
  note?: Note;
  suggestedFragrances: Fragrance[] = [];
  isLoading = true;
  isLoggedIn = false;
  isFavorite = false;
  isSaving = false;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.route.paramMap,
      this.route.queryParams,
      this.dataService.getFragrances(),
      this.authService.user$
    ]).subscribe(([params, queryParams, fragrances, user]) => {
      const name = params.get('name') || queryParams['name'];
      this.isLoggedIn = !!user;

      if (!name) {
        this.isLoading = false;
        return;
      }

      this.loadNoteData(name, fragrances);

      if (!user) {
        this.isFavorite = false;
        return;
      }

      this.dataService.getUserProfile(user.uid).subscribe(profile => {
        this.isFavorite = !!profile?.favoriteNotes?.includes(name);
      });
    });
  }

  private loadNoteData(name: string, fragrances: Fragrance[]) {
    this.isLoading = true;

    this.dataService.getNoteByName(name).subscribe({
      next: (note) => {
        this.note = note;
        this.suggestedFragrances = note
          ? fragrances.filter(f => [
              ...(f.notes.top || []),
              ...(f.notes.heart || []),
              ...(f.notes.base || [])
            ].includes(note.name))
          : [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error cargando nota:', err);
        this.isLoading = false;
      }
    });
  }

  async toggleFavorite() {
    const user = await this.authService.getCurrentUser();
    if (!user || !this.note || this.isSaving) return;

    this.isSaving = true;
    try {
      if (this.isFavorite) {
        await this.dataService.removeFavoriteNote(user.uid, this.note.name);
      } else {
        await this.dataService.addFavoriteNote(user.uid, this.note.name);
      }
    } catch (error) {
      console.error('Error actualizando favoritos:', error);
    } finally {
      this.isSaving = false;
    }
  }
}
