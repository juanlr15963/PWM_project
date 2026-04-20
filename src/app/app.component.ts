import { Component, OnInit } from '@angular/core';
import { FragranceService } from './services/fragrance.service';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./styles.ccs']
})
export class AppComponent implements OnInit {
  featuredFragrances: any[] = [];

  constructor(private fragranceService: FragranceService) {}

  ngOnInit(): void {
    this.fragranceService.getFeaturedFragrances().subscribe({
      next: (data) => {
        this.featuredFragrances = data;
      },
      error: (err) => {
        console.error('Error al conectar con la API:', err);
      }
    });
  }
}
