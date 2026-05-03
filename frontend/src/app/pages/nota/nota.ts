import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-nota',
  standalone: true,
  imports: [CommonModule, RouterLink, HttpClientModule],
  templateUrl: './nota.html',
  styleUrl: './nota.css'
})
export class NotaComponent implements OnInit {
  note: any;
  suggestedFragrances: any[] = [];
  isLoading = true;
  isFavorite = false; // Placeholder para Firebase

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // Escuchamos el parámetro ?name=
    this.route.queryParams.subscribe(params => {
      const name = params['name'];
      if (name) {
        this.loadNoteData(name);
      }
    });
  }

  loadNoteData(name: string) {
    this.isLoading = true;

    forkJoin({
      // Buscamos la nota por nombre
      noteData: this.http.get<any[]>(`http://localhost:3000/notes?name=${name}`),
      // Traemos todas las fragancias para filtrar
      allFragrances: this.http.get<any[]>('http://localhost:3000/fragrances')
    }).subscribe({
      next: (res) => {
        this.note = res.noteData[0];

        if (this.note) {
          // Filtrar fragancias que contienen esta nota en cualquier nivel
          this.suggestedFragrances = res.allFragrances.filter(f => {
            const combinedNotes = [
              ...(f.notes.top || []),
              ...(f.notes.heart || []),
              ...(f.notes.base || [])
            ];
            return combinedNotes.includes(this.note.name);
          });
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error cargando nota:', err);
        this.isLoading = false;
      }
    });
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
    // Aquí irá la lógica de PATCH a Firebase/JSON-Server más adelante
  }
}
