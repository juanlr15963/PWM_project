import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, user, User } from '@angular/fire/auth';
import { Observable, firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private router = inject(Router);

  // Este Observable nos dirá en tiempo real si hay un usuario conectado
  user$: Observable<User | null> = user(this.auth);

  // Método para iniciar sesión
  login(email: string, pass: string) {
    return signInWithEmailAndPassword(this.auth, email, pass);
  }

  // Método para cerrar sesión
  logout() {
    return signOut(this.auth).then(() => {
      this.router.navigate(['/login']);
    });
  }
  async getCurrentUser() {
    return await firstValueFrom(this.user$);
  }
}
