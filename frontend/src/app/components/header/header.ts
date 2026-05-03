import { Component, OnInit } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import { FormsModule } from '@angular/forms'
import { CommonModule} from '@angular/common';
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent implements OnInit {

  // Variables de estado
  isMenuOpen = false;
  isUserMenuOpen = false;
  isLoggedIn = false; // Esto vendrá de tu servicio de Firebase más adelante
  searchTerm: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // Nos 'suscribimos' al estado de autenticación de firestore
    this.authService.user$.subscribe(user => {
      this.isLoggedIn = !!user; // Si existe user, isLoggedIn es true
    });
  }

  // Alternar menú móvil
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Alternar dropdown de usuario (Desktop)
  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  // Lógica de búsqueda
  onSearch(event: Event): void {
    event.preventDefault();
    if (this.searchTerm.trim()) {
      // Redirige a la página de búsqueda con el parámetro q
      this.router.navigate(['/busqueda'], { queryParams: { q: this.searchTerm } });
      this.isMenuOpen = false; // Cerrar menú si es móvil
    }
  }

  logout(): void {
    // Lógica para cerrar sesión con Firebase
    this.authService.logout();
    this.isUserMenuOpen = false;
  }
}
