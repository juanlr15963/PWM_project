import { Component, inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';


import { FirebaseApp } from 'firebase/app';

import { HeaderComponent } from './components/header/header';

import { FooterComponent } from './components/footer/footer';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // No exportamos nada
}
