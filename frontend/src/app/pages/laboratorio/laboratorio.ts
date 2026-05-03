import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Note {
  id?: number;
  name: string;
}

@Component({
  selector: 'app-laboratorio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './laboratorio.html',
  styleUrls: ['./laboratorio.css']
})
export class LaboratorioComponent implements OnInit {
  private http = inject(HttpClient);

  // Estados de las listas
  availableNotes: Note[] = [];
  topNotes: Note[] = [];
  heartNotes: Note[] = [];
  baseNotes: Note[] = [];

  fragranceName: string = '';

  // Para gestionar el arrastre
  private draggedItem: Note | null = null;
  private sourceArray: Note[] | null = null;

  ngOnInit() {
    this.loadNotes();
  }

  loadNotes() {
    this.http.get<Note[]>('http://localhost:3000/notes').subscribe({
      next: (data) => this.availableNotes = data,
      error: (err) => console.error('Error cargando notas', err)
    });
  }

  onDragStart(note: Note, source: Note[]) {
    this.draggedItem = note;
    this.sourceArray = source;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault(); // Necesario para permitir el drop
  }

  onDrop(event: DragEvent, targetArray: Note[]) {
    event.preventDefault();
    if (this.draggedItem && this.sourceArray) {
      // 1. Quitar de la lista de origen
      const index = this.sourceArray.indexOf(this.draggedItem);
      if (index > -1) this.sourceArray.splice(index, 1);

      // 2. Añadir a la lista de destino
      targetArray.push(this.draggedItem);

      // Limpiar referencias
      this.draggedItem = null;
      this.sourceArray = null;
    }
  }

  saveFragrance() {
    if (!this.fragranceName.trim()) {
      alert('Por favor, dale un nombre a tu fragancia.');
      return;
    }

    const finalFragrance = {
      name: this.fragranceName,
      notes: {
        top: this.topNotes.map(n => n.name),
        heart: this.heartNotes.map(n => n.name),
        base: this.baseNotes.map(n => n.name)
      }
    };

    console.log('Fragancia Inmortalizada:', finalFragrance);
    alert(`¡Fragancia "${this.fragranceName}" guardada con éxito!`);

    // Aquí podrías hacer: this.http.post('http://localhost:3000/fragrances', finalFragrance).subscribe(...)
  }
}
