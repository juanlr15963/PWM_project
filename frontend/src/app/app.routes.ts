// Importamos los Guards
import { authGuard} from './guards/auth-guard';

import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { CatalogoComponent } from './pages/catalogo/catalogo'
import { LoginComponent } from './pages/login/login'
import { FraganciaComponent } from './pages/fragancia/fragancia'
import { BusquedaComponent} from './pages/busqueda/busqueda';
import { NotaComponent} from './pages/nota/nota';
import { NotasComponent } from './pages/notas/notas';
import { LaboratorioComponent } from './pages/laboratorio/laboratorio';
import { MiEspacioComponent } from './pages/mi-espacio/mi-espacio';



export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'fraganciasCatalogo', component: CatalogoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'fragancia/:id', component: FraganciaComponent },
  { path: 'busqueda', component: BusquedaComponent },
  { path: 'nota', component: NotaComponent },
  { path: 'notasCatalogo', component: NotasComponent },
  { path: 'laboratorio', component: LaboratorioComponent, canActivate: [authGuard] },
  { path: 'mi-espacio', component: MiEspacioComponent, canActivate: [authGuard] },
  // Comodín: si el usuario escribe cualquier cosa mal, vuelve al home
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
