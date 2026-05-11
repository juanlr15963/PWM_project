import { Injectable, inject } from '@angular/core';
import {
  Auth,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  user
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private router = inject(Router);

  user$: Observable<User | null> = user(this.auth);

  login(email: string, pass: string) {
    return signInWithEmailAndPassword(this.auth, email, pass);
  }

  async register(email: string, pass: string, displayName: string, photoURL?: string) {
    const credential = await createUserWithEmailAndPassword(this.auth, email, pass);
    await updateProfile(credential.user, {
      displayName,
      photoURL: photoURL || null
    });
    return credential.user;
  }

  updateUserProfile(user: User, displayName: string, photoURL?: string | null) {
    return updateProfile(user, { displayName, photoURL: photoURL || null });
  }

  logout() {
    return signOut(this.auth).then(() => {
      this.router.navigate(['/login']);
    });
  }

  async getCurrentUser() {
    return await firstValueFrom(this.user$);
  }
}
