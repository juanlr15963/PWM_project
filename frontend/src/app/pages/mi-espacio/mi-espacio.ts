import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Firestore, collection, collectionData, query, where, doc, docData } from '@angular/fire/firestore';
import { forkJoin, switchMap, of, combineLatest, Observable } from 'rxjs';

@Component({
  selector: 'app-mi-espacio',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mi-espacio.html',
  styleUrls: ['./mi-espacio.css']
})
export class MiEspacioComponent implements OnInit {
  private firestore = inject(Firestore);
  private authService = inject(AuthService);

  welcomeMessage: string = 'Cargando tu rincón personal...';

  // Listas de datos
  userCollection: any[] = [];   // Perfumes oficiales marcados como favoritos
  userDesigns: any[] = [];      // Lo que creaste en el Laboratorio
  favoriteNotes: any[] = [];    // Notas que te gustan

  ngOnInit() {
    this.loadFirebaseData();
  }

  loadFirebaseData() {
    this.authService.user$.pipe(
      switchMap(user => {
        if (!user) return of(null);

        this.welcomeMessage = `Bienvenido, ${user.email?.split('@')[0]}.`;

        // 1. Referencias a las colecciones de Firebase
        const designsRef = collection(this.firestore, 'custom_designs');
        const fragRef = collection(this.firestore, 'fragrances');
        const notesRef = collection(this.firestore, 'notes');
        const userDocRef = doc(this.firestore, `users/${user.uid}`);

        // 2. Creamos los observables para cada dato
        return combineLatest({
          // Trae los diseños que el usuario hizo en el Laboratorio
          myDesigns: collectionData(query(designsRef, where('userId', '==', user.uid)), { idField: 'id' }),
          // Trae el perfil del usuario (donde guardamos los IDs de favoritos)
          userProfile: docData(userDocRef),
          // Trae todo el catálogo para filtrar
          allFragrances: collectionData(fragRef, { idField: 'id' }),
          // Trae todas las notas para filtrar
          allNotes: collectionData(notesRef, { idField: 'id' })
        });
      })
    ).subscribe({
      next: (res: any) => {
        if (res) {
          const { myDesigns, userProfile, allFragrances, allNotes } = res;

          // Guardamos tus creaciones del laboratorio
          this.userDesigns = myDesigns;

          // Filtramos la colección oficial basada en el array 'collection' del perfil
          if (userProfile && userProfile.collection) {
            this.userCollection = allFragrances.filter((f: any) =>
              userProfile.collection.includes(f.id)
            );
          }

          // Filtramos las notas favoritas basadas en el perfil
          if (userProfile && userProfile.favoriteNotes) {
            this.favoriteNotes = allNotes.filter((n: any) =>
              userProfile.favoriteNotes.includes(n.name)
            );
          }
        }
      },
      error: (err) => {
        console.error('Error cargando Mi Espacio:', err);
        this.welcomeMessage = 'Error al conectar con la nube.';
      }
    });
  }
}
