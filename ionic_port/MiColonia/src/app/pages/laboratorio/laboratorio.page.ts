import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CustomDesign, Note } from '../../core/models';
import { AuthService, FragranceService, NoteService } from '../../core/services';
import { AppShellComponent } from '../../shared/components/app-shell/app-shell.component';

@Component({
  selector: 'app-laboratorio',
  standalone: true,
  imports: [CommonModule, FormsModule, AppShellComponent],
  templateUrl: './laboratorio.page.html',
  styleUrls: ['./laboratorio.page.scss'],
})
export class LaboratorioPage implements OnInit, OnDestroy {
  private readonly noteService = inject(NoteService);
  private readonly fragranceService = inject(FragranceService);
  private readonly authService = inject(AuthService);

  private notesSubscription?: Subscription;
  private draggedItem: Note | null = null;
  private sourceArray: Note[] | null = null;

  availableNotes: Note[] = [];
  topNotes: Note[] = [];
  heartNotes: Note[] = [];
  baseNotes: Note[] = [];
  fragranceName = '';

  ngOnInit(): void {
    this.loadNotes();
  }

  ngOnDestroy(): void {
    this.notesSubscription?.unsubscribe();
  }

  onDragStart(note: Note, source: Note[]): void {
    this.draggedItem = note;
    this.sourceArray = source;
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent, target: Note[]): void {
    event.preventDefault();
    if (!this.draggedItem || !this.sourceArray) return;

    const index = this.sourceArray.indexOf(this.draggedItem);
    if (index > -1) this.sourceArray.splice(index, 1);
    target.push(this.draggedItem);

    this.draggedItem = null;
    this.sourceArray = null;
  }

  async saveFragrance(): Promise<void> {
    if (!this.fragranceName.trim()) {
      alert('Por favor, dale un nombre a tu fragancia.');
      return;
    }

    const user = await this.authService.getCurrentUser();
    const design: CustomDesign = {
      name: this.fragranceName,
      userId: user?.uid ?? 'anonimo',
      createdAt: new Date(),
      notes: {
        top: this.topNotes.map((n) => n.name),
        heart: this.heartNotes.map((n) => n.name),
        base: this.baseNotes.map((n) => n.name),
      },
    };

    try {
      await this.fragranceService.saveCustomDesign(design);
      alert(`¡Fragancia "${this.fragranceName}" guardada!`);
      this.resetLab();
    } catch (error) {
      console.error('Error al guardar el diseño:', error);
      alert('Hubo un error al guardar tu diseño.');
    }
  }

  private resetLab(): void {
    this.fragranceName = '';
    this.topNotes = [];
    this.heartNotes = [];
    this.baseNotes = [];
    this.loadNotes();
  }

  private loadNotes(): void {
    this.notesSubscription?.unsubscribe();
    this.notesSubscription = this.noteService.getAll().subscribe({
      next: (notes) => (this.availableNotes = notes),
      error: (err) => console.error('Error cargando notas:', err),
    });
  }
}
