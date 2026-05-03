import { Component, inject, OnInit } from '@angular/core'; // Añadimos OnInit
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { firstValueFrom } from 'rxjs'; // Útil para comprobaciones rápidas de observables

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  loginData = { email: '', password: '' };
  errorMessage = '';
  isLoading = false;

  ngOnInit() {
    // Opcional: Si el usuario ya está logueado, no debería estar en esta página
    this.authService.user$.subscribe(user => {
      if (user) {
        this.router.navigate(['/mi-espacio']);
      }
    });
  }

  async onSubmit(event: Event) {
    event.preventDefault();
    this.isLoading = true;
    this.errorMessage = ''; // Limpiamos errores previos

    try {
      await this.authService.login(this.loginData.email, this.loginData.password);

      // Redirigimos a 'mi-espacio'
      this.router.navigate(['/mi-espacio']);

    } catch (error: any) {
      this.errorMessage = 'Credenciales incorrectas. Por favor, inténtalo de nuevo.';
      console.error('Error de login:', error);
    } finally {
      this.isLoading = false;
    }
  }
}
