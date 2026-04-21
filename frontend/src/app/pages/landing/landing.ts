import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { FragranceService } from '../../services/fragrance.service';
import { Fragrance } from '../../models/fragrance';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class LandingPage implements OnInit {
  private readonly fragranceService = inject(FragranceService);
  featuredFragrances: Fragrance[] = [];

  ngOnInit(): void {
    this.fragranceService.getFeaturedFragrances().subscribe({
      next: (data) => {
        this.featuredFragrances = data;
      },
      error: (err) => {
        console.error('Error al conectar con la API:', err);
      },
    });
  }
}
