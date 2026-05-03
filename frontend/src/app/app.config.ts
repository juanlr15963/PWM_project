import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

// Firebase imports
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from '../environment/environment';
import {provideHttpClient} from '@angular/common/http';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    // Inicializamos la App con el objeto 'firebase' de tu environment
    // Dentro de providers en app.config.ts
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    // proveemos el Auth
    provideAuth(() => getAuth()),
    // Obtenemos los datos de las fragancias.
    provideFirestore(() => getFirestore())
  ]
};
