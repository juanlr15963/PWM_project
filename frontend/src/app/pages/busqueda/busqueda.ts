import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DataService, Note } from '../../services/data';
import { Fragrance } from '../../models/fragrance';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-busqueda',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './busqueda.html',
  styleUrl: './busqueda.css'
})
export class BusquedaComponent implements OnInit {
  query: string = '';
  filteredFragrances: Fragrance[] = [];
  filteredNotes: Note[] = [];
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    // Nos suscribimos a los queryParams para que si la 'q' cambia, la búsqueda se repita
    this.route.queryParams.subscribe(params => {
      this.query = params['q'] || '';
      if (this.query) {
        this.performSearch();
      }
    });
  }

  performSearch() {
    this.isLoading = true;
    const lowerQuery = this.query.toLowerCase();

    forkJoin({
      fragrances: this.dataService.getFragrances(),
      notes: this.dataService.getNotes()
    }).subscribe({
      next: (res) => {
        this.filteredFragrances = res.fragrances.filter(f =>
          f.name.toLowerCase().includes(lowerQuery) ||
          f.brand.toLowerCase().includes(lowerQuery)
        );

        this.filteredNotes = res.notes.filter(n =>
          n.name.toLowerCase().includes(lowerQuery)
        );
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error en la búsqueda:', err);
        this.isLoading = false;
      }
    });
  }
}
