import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth, user } from '@angular/fire/auth';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  // Observamos el estado del usuario de Firebase
  return user(auth).pipe(
    take(1), // Tomamos solo el valor actual y completamos
    map(u => {
      if (u) {
        return true; // Si hay usuario, permitimos el paso
      } else {
        // Si no hay usuario, redirigimos al login
        return router.createUrlTree(['/login']);
      }
    })
  );
};
