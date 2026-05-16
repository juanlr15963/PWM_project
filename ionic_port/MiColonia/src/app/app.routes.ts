import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'catalogo',
    loadComponent: () => import('./pages/catalogo/catalogo.page').then((m) => m.CatalogoPage),
  },
  {
    path: 'fragancia/:id',
    loadComponent: () => import('./pages/fragancia/fragancia.page').then((m) => m.FraganciaPage),
  },
  {
    path: 'busqueda',
    loadComponent: () => import('./pages/busqueda/busqueda.page').then((m) => m.BusquedaPage),
  },
  {
    path: 'notas',
    loadComponent: () => import('./pages/notas/notas.page').then((m) => m.NotasPage),
  },
  {
    path: 'nota',
    loadComponent: () => import('./pages/nota/nota.page').then((m) => m.NotaPage),
  },
  {
    path: 'nota/:name',
    loadComponent: () => import('./pages/nota/nota.page').then((m) => m.NotaPage),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'registro',
    loadComponent: () => import('./pages/registro/registro.page').then((m) => m.RegistroPage),
  },
  {
    path: 'laboratorio',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/laboratorio/laboratorio.page').then((m) => m.LaboratorioPage),
  },
  {
    path: 'mi-espacio',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/mi-espacio/mi-espacio.page').then((m) => m.MiEspacioPage),
  },
  { path: 'fraganciasCatalogo', redirectTo: 'catalogo', pathMatch: 'full' },
  { path: 'notasCatalogo', redirectTo: 'notas', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
