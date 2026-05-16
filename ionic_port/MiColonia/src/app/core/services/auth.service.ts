import { Injectable, inject } from '@angular/core';
import {
  Auth,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  user,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);

  readonly user$: Observable<User | null> = user(this.auth);

  login(email: string, password: string): Promise<unknown> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async register(
    email: string,
    password: string,
    displayName: string,
    photoURL?: string
  ): Promise<User> {
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);
    await updateProfile(credential.user, { displayName, photoURL: photoURL ?? null });
    return credential.user;
  }

  updateUserProfile(currentUser: User, displayName: string, photoURL?: string | null): Promise<void> {
    return updateProfile(currentUser, { displayName, photoURL: photoURL ?? null });
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
    await this.router.navigate(['/login']);
  }

  getCurrentUser(): Promise<User | null> {
    return firstValueFrom(this.user$);
  }
}
