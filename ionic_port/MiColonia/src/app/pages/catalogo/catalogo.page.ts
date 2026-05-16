import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  ALL_FILTERS_VALUE,
  FRAGRANCE_FILTERS,
  FragranceFilter,
  applyFragranceFilter,
} from '../../core/constants/fragrance-filters';
import { Fragrance } from '../../core/models';
import { FragranceService } from '../../core/services';
import { AppShellComponent } from '../../shared/components/app-shell/app-shell.component';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, RouterLink, AppShellComponent],
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
})
export class CatalogoPage implements OnInit, OnDestroy {
  private readonly fragranceService = inject(FragranceService);
  private fragrancesSubscription?: Subscription;

  readonly filters: readonly FragranceFilter[] = FRAGRANCE_FILTERS;
  allFragrances: Fragrance[] = [];
  filteredFragrances: Fragrance[] = [];
  activeFilter: string = ALL_FILTERS_VALUE;
  showFilters = false;

  ngOnInit(): void {
    this.fragrancesSubscription = this.fragranceService.getAll().subscribe({
      next: (data) => {
        this.allFragrances = data;
        this.filteredFragrances = data;
      },
      error: (err) => console.error('Error al cargar fragancias:', err),
    });
  }

  ngOnDestroy(): void {
    this.fragrancesSubscription?.unsubscribe();
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  applyFilter(value: string): void {
    this.activeFilter = value;
    this.filteredFragrances = applyFragranceFilter(this.allFragrances, value);
  }
}
