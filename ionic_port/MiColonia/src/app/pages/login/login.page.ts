import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/services';
import { AppShellComponent } from '../../shared/components/app-shell/app-shell.component';

interface LoginForm {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, AppShellComponent],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private userSubscription?: Subscription;

  loginData: LoginForm = { email: '', password: '' };
  errorMessage = '';
  isLoading = false;

  ngOnInit(): void {
    this.userSubscription = this.authService.user$.subscribe((user) => {
      if (user) this.router.navigate(['/mi-espacio']);
    });
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

  async onSubmit(event: Event): Promise<void> {
    event.preventDefault();
    this.isLoading = true;
    this.errorMessage = '';

    try {
      await this.authService.login(this.loginData.email, this.loginData.password);
      await this.router.navigate(['/mi-espacio']);
    } catch (error) {
      this.errorMessage = 'Credenciales incorrectas. Por favor, inténtalo de nuevo.';
      console.error('Error de login:', error);
    } finally {
      this.isLoading = false;
    }
  }
}
