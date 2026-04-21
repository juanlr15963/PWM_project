import { Component, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';

const firebaseConfig = {
  apiKey: 'AIzaSyBjQ9AskXo0Pp85o8cGPeh44HnmP-mhkAE',
  authDomain: 'pwm-project-aced1.firebaseapp.com',
  projectId: 'pwm-project-aced1',
  storageBucket: 'pwm-project-aced1.firebasestorage.app',
  messagingSenderId: '402725037450',
  appId: '1:402725037450:web:eb4f89d34edfefbe1b1473',
  measurementId: 'G-YYF31YP9SW',
};

const firebaseApp = initializeApp(firebaseConfig);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private platformId = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      getAnalytics(firebaseApp);
    }
  }
}
