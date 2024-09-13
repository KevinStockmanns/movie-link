import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'MovieLink'
    },{
        path: ':typeMedia/:id',
        loadComponent: ()=>import('./pages/movie-details/movie-details.component').then(el=> el.DetailsComponent)
    },{
        path: 'search',
        loadComponent: ()=> import('./pages/search/search.component').then(el=>el.SearchComponent),
        title: 'MovieLink | Search'
    },{
        path: 'favoritos',
        loadComponent: () => import('./pages/favoritos/favoritos.component').then(el=> el.FavoritosComponent),
        title: 'MovieLink | Favoritos'
    }
];
