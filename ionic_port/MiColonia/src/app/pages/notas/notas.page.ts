import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Note } from '../../core/models';
import { NoteService } from '../../core/services';
import { AppShellComponent } from '../../shared/components/app-shell/app-shell.component';

@Component({
  selector: 'app-notas',
  standalone: true,
  imports: [CommonModule, RouterLink, AppShellComponent],
  templateUrl: './notas.page.html',
  styleUrls: ['./notas.page.scss'],
})
export class NotasPage implements OnInit, OnDestroy {
  private readonly noteService = inject(NoteService);
  private notesSubscription?: Subscription;

  notes: Note[] = [];
  isLoading = true;

  ngOnInit(): void {
    this.notesSubscription = this.noteService.getAll().subscribe({
      next: (data) => {
        this.notes = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar notas:', err);
        this.isLoading = false;
      },
    });
  }

  ngOnDestroy(): void {
    this.notesSubscription?.unsubscribe();
  }
}
