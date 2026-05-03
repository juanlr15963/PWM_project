import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-fragancia',
  standalone: true,
  imports: [CommonModule, RouterLink, HttpClientModule],
  templateUrl: './fragancia.html',
  styleUrl: './fragancia.css'
})
export class FraganciaComponent implements OnInit {
  fragrance: any;
  allNotes: any[] = [];
  isLoggedIn = false; // Preparado para el futuro
  isInCollection = false;

  noteTypes = [
    { key: 'top', label: 'Salida' },
    { key: 'heart', label: 'Corazón' },
    { key: 'base', label: 'Base' }
  ];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadData(id);
    }
  }

  loadData(id: string) {
    // Cargamos fragancia y notas al mismo tiempo
    forkJoin({
      fragrance: this.http.get<any>(`http://localhost:3000/fragrances/${id}`),
      notes: this.http.get<any[]>('http://localhost:3000/notes')
    }).subscribe({
      next: (res) => {
        this.fragrance = res.fragrance;
        this.allNotes = res.notes;
      },
      error: (err) => console.error('Error cargando datos', err)
    });
  }

  getNoteImage(noteName: string): string | null {
    const note = this.allNotes.find(n => n.name === noteName);
    return note ? note.image : null;
  }

  toggleCollection() {
    // Lógica para el futuro Sprint con Firebase
    this.isInCollection = !this.isInCollection;
  }
}
