import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserProfile } from '../../core/models';
import { AuthService, UserProfileService } from '../../core/services';
import { AppShellComponent } from '../../shared/components/app-shell/app-shell.component';

interface RegistroForm {
  email: string;
  password: string;
  displayName: string;
}

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, AppShellComponent],
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  private readonly authService = inject(AuthService);
  private readonly userProfileService = inject(UserProfileService);
  private readonly router = inject(Router);

  formData: RegistroForm = { email: '', password: '', displayName: '' };
  errorMessage = '';
  isLoading = false;

  async onSubmit(event: Event): Promise<void> {
    event.preventDefault();
    this.isLoading = true;
    this.errorMessage = '';

    try {
      const user = await this.authService.register(
        this.formData.email,
        this.formData.password,
        this.formData.displayName
      );

      const profile: UserProfile = {
        uid: user.uid,
        email: user.email,
        displayName: this.formData.displayName,
        photoURL: user.photoURL,
        favoriteNotes: [],
        collection: [],
        createdAt: new Date(),
      };

      await this.userProfileService.create(profile);
      await this.router.navigate(['/mi-espacio']);
    } catch (error) {
      this.errorMessage = 'No fue posible completar el registro. Revisa los datos e inténtalo de nuevo.';
      console.error('Error de registro:', error);
    } finally {
      this.isLoading = false;
    }
  }
}
