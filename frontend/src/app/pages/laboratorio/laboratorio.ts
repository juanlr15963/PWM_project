import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Importamos las herramientas de Firestore
import { Firestore, collection, collectionData, addDoc, doc, setDoc} from '@angular/fire/firestore';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Note {
  id?: string; // Firestore usa IDs tipo string
  name: string;
  type?: string;
  image?: string;
}

@Component({
  selector: 'app-laboratorio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './laboratorio.html',
  styleUrls: ['./laboratorio.css']
})
export class LaboratorioComponent implements OnInit {
  // Inyectamos Firestore y el servicio de Auth
  private firestore = inject(Firestore);
  private authService = inject(AuthService);
  private http = inject(HttpClient);

  // Listas para el laboratorio
  availableNotes: Note[] = [];
  topNotes: Note[] = [];
  heartNotes: Note[] = [];
  baseNotes: Note[] = [];

  fragranceName: string = '';

  private draggedItem: Note | null = null;
  private sourceArray: Note[] | null = null;

  ngOnInit() {
    this.loadNotesFromFirebase();
  }

  loadNotesFromFirebase() {
    // Referencia a la colección 'notes' en Firestore
    const notesCollection = collection(this.firestore, 'notes');

    // Obtenemos los datos en tiempo real
    collectionData(notesCollection, { idField: 'id' }).subscribe({
      next: (data) => {
        this.availableNotes = data as Note[];
      },
      error: (err) => console.error('Error cargando notas desde Firebase:', err)
    });
  }

  onDragStart(note: Note, source: Note[]) {
    this.draggedItem = note;
    this.sourceArray = source;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent, targetArray: Note[]) {
    event.preventDefault();
    if (this.draggedItem && this.sourceArray) {
      const index = this.sourceArray.indexOf(this.draggedItem);
      if (index > -1) this.sourceArray.splice(index, 1);
      targetArray.push(this.draggedItem);
      this.draggedItem = null;
      this.sourceArray = null;
    }
  }

  async saveFragrance() {
    if (!this.fragranceName.trim()) {
      alert('Por favor, dale un nombre a tu fragancia.');
      return;
    }

    // Obtenemos el usuario actual para asociar la fragancia
    const user = await this.authService.getCurrentUser(); // Asegúrate de tener este método en tu AuthService

    const finalFragrance = {
      name: this.fragranceName,
      userId: user?.uid || 'anonimo',
      createdAt: new Date(),
      notes: {
        top: this.topNotes.map(n => n.name),
        heart: this.heartNotes.map(n => n.name),
        base: this.baseNotes.map(n => n.name)
      }
    };

    try {
      // Guardamos en la colección 'custom_designs' de Firestore
      const designsCollection = collection(this.firestore, 'custom_designs');
      await addDoc(designsCollection, finalFragrance);

      alert(`¡Fragancia "${this.fragranceName}" guardada en Firebase!`);
      this.resetLab();
    } catch (error) {
      console.error('Error al guardar en Firebase:', error);
      alert('Hubo un error al guardar tu diseño.');
    }
  }




  resetLab() {
    this.fragranceName = '';
    this.topNotes = [];
    this.heartNotes = [];
    this.baseNotes = [];
    this.loadNotesFromFirebase(); // Recargamos para resetear la lista de disponibles
  }
}
