import { Routes } from '@angular/router';
// Importa tus componentes (asegúrate de que los nombres coincidan)

/*
import { HomeComponent } from './pages/home/home.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { LaboratorioComponent } from './pages/laboratorio/laboratorio.component';
import { BusquedaComponent } from './pages/busqueda/busqueda.component';
import { LoginComponent } from './pages/login/login.component';
*/
export const routes: Routes = [
/*
  { path: '', component: HomeComponent }, // Ruta raíz (index)
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'laboratorio', component: LaboratorioComponent },
  { path: 'busqueda', component: BusquedaComponent },
  { path: 'login', component: LoginComponent },

 */
  // Comodín: si el usuario escribe cualquier cosa mal, vuelve al home
  //{ path: '**', redirectTo: '', pathMatch: 'full' }
];
