import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, RouterLink, HttpClientModule],
  templateUrl: './catalogo.html',
  styleUrls: ['./catalogo.css']
})
export class CatalogoComponent implements OnInit {
  allFragrances: any[] = [];
  filteredFragrances: any[] = [];
  activeFilter: string = 'all';
  showFilters: boolean = false; // Controla el toggle del botón en móviles

  filters = [
    { label: 'Todos', value: 'all' },
    { label: 'Verano', value: 'Verano' },
    { label: 'Invierno', value: 'Invierno' },
    { label: 'Otoño', value: 'Otoño' },
    { label: 'Primavera', value: 'Primavera' },
    { label: 'Día', value: 'Día' },
    { label: 'Noche', value: 'Noche' },
    { label: 'Masculino', value: 'Masculino' },
    { label: 'Femenino', value: 'Femenino' },
    { label: 'Unisex', value: 'Unisex' }
  ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchFragrances();
  }

  fetchFragrances(): void {
    this.http.get<any[]>('http://localhost:3000/fragrances')
      .subscribe({
        next: (data) => {
          this.allFragrances = data;
          this.filteredFragrances = data;
        },
        error: (error) => {
          console.error('Error al cargar fragancias:', error);
        }
      });
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  applyFilter(filterValue: string): void {
    this.activeFilter = filterValue;
    if (filterValue === 'all') {
      this.filteredFragrances = this.allFragrances;
    } else {
      this.filteredFragrances = this.allFragrances.filter(f =>
        (f.season && f.season.includes(filterValue)) ||
        f.time === filterValue ||
        f.gender === filterValue
      );
    }
  }
}
