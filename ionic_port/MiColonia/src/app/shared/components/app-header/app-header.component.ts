import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
})
export class AppHeaderComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private userSubscription?: Subscription;

  isMenuOpen = false;
  isLoggedIn = false;
  searchTerm = '';

  ngOnInit(): void {
    this.userSubscription = this.authService.user$.subscribe((user) => {
      this.isLoggedIn = !!user;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  onSearch(event: Event): void {
    event.preventDefault();
    const term = this.searchTerm.trim();
    if (!term) return;

    this.router.navigate(['/busqueda'], { queryParams: { q: term } });
    this.closeMenu();
  }

  async logout(): Promise<void> {
    await this.authService.logout();
    this.closeMenu();
  }
}
