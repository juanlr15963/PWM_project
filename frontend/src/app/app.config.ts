import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

// Firebase imports
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from '../environment/environment';
import {provideHttpClient} from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    // 1. PRIMERO inicializamos la App con el objeto 'firebase' de tu environment
    // Dentro de providers en app.config.ts
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    // 2. SEGUNDO proveemos el Auth
    provideAuth(() => getAuth())
  ]
};
