import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

// Firebase
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

// Tu environment
import { environment } from '../environment/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),

    // FÍJATE AQUÍ: Debe ser environment.firebase (porque así lo llamaste en tu archivo)
    provideFirebaseApp(() => initializeApp(environment.firebase)),

    provideAuth(() => getAuth())
  ]
};
