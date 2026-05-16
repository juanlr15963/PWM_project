import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { AppFooterComponent } from '../app-footer/app-footer.component';
import { AppHeaderComponent } from '../app-header/app-header.component';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [IonContent, AppHeaderComponent, AppFooterComponent],
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss'],
})
export class AppShellComponent {}
