import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DataService, Note } from '../../services/data';

@Component({
  selector: 'app-notas',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './notas.html',
  styleUrl: './notas.css'
})
export class NotasComponent implements OnInit {
  notes: Note[] = [];
  isLoading = true;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getNotes().subscribe({
      next: (data) => {
        this.notes = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar notas:', err);
        this.isLoading = false;
      }
    });
  }
}
