import { Component, inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';

// Solo importas las funciones, no la configuración
import { getAnalytics } from 'firebase/analytics';
import { FirebaseApp } from 'firebase/app';

import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private platformId = inject(PLATFORM_ID);
  // Inyectamos la instancia que creamos en app.config.ts
  private firebaseApp = inject<FirebaseApp>('FIREBASE_APP' as any);

  ngOnInit() {
    // Analytics solo se ejecuta en el cliente
    if (isPlatformBrowser(this.platformId)) {
      getAnalytics(this.firebaseApp);
      console.log('Firebase Analytics inicializado');
    }
  }
}
