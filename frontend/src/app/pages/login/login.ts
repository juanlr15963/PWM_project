import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  loginData = { email: '', password: '' };
  errorMessage = '';
  isLoading = false;

  async onSubmit(event: Event) {
    event.preventDefault();
    this.isLoading = true;

    try {
      await this.authService.login(this.loginData.email, this.loginData.password);
      this.router.navigate(['/']); // Redirigir al home tras éxito
    } catch (error: any) {
      this.errorMessage = 'Error: Usuario o contraseña incorrectos';
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }
}
