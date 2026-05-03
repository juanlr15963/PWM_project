import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, HttpClientModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {
  allFragrances: any[] = [];
  filteredFragrances: any[] = [];
  activeFilter: string = 'all';

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
    this.loadFragrances();
  }

  loadFragrances() {
    this.http.get<any[]>('http://localhost:3000/fragrances')
      .subscribe({
        next: (data) => {
          this.allFragrances = data;
          this.filteredFragrances = data;
        },
        error: (err) => console.error('Error cargando fragancias', err)
      });
  }

  applyFilter(filterValue: string) {
    this.activeFilter = filterValue;
    if (filterValue === 'all') {
      this.filteredFragrances = this.allFragrances;
    } else {
      this.filteredFragrances = this.allFragrances.filter(f => {
        return (f.season && f.season.includes(filterValue)) ||
          f.time === filterValue ||
          f.gender === filterValue;
      });
    }
  }
}
