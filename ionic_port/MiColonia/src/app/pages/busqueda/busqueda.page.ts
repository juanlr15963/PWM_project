import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription, forkJoin } from 'rxjs';
import { Fragrance, Note } from '../../core/models';
import { FragranceService, NoteService } from '../../core/services';
import { AppShellComponent } from '../../shared/components/app-shell/app-shell.component';

@Component({
  selector: 'app-busqueda',
  standalone: true,
  imports: [CommonModule, RouterLink, AppShellComponent],
  templateUrl: './busqueda.page.html',
  styleUrls: ['./busqueda.page.scss'],
})
export class BusquedaPage implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly fragranceService = inject(FragranceService);
  private readonly noteService = inject(NoteService);

  private querySubscription?: Subscription;
  private searchSubscription?: Subscription;

  query = '';
  filteredFragrances: Fragrance[] = [];
  filteredNotes: Note[] = [];
  isLoading = false;

  ngOnInit(): void {
    this.querySubscription = this.route.queryParams.subscribe((params) => {
      this.query = params['q'] ?? '';
      if (this.query) {
        this.performSearch();
      }
    });
  }

  ngOnDestroy(): void {
    this.querySubscription?.unsubscribe();
    this.searchSubscription?.unsubscribe();
  }

  private performSearch(): void {
    this.isLoading = true;
    const term = this.query.toLowerCase();

    this.searchSubscription = forkJoin({
      fragrances: this.fragranceService.getAll(),
      notes: this.noteService.getAll(),
    }).subscribe({
      next: ({ fragrances, notes }) => {
        this.filteredFragrances = fragrances.filter(
          (f) =>
            f.name.toLowerCase().includes(term) ||
            f.brand.toLowerCase().includes(term)
        );
        this.filteredNotes = notes.filter((n) => n.name.toLowerCase().includes(term));
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error en la búsqueda:', err);
        this.isLoading = false;
      },
    });
  }
}
