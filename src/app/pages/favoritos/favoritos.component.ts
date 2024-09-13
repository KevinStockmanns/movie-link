import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Pelicula } from '../../models/peliculas.model';
import { Persona } from '../../models/personas.model';
import { FavoriteService, Favoritos } from '../../services/favorite-service.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { PersonCardComponent } from '../../components/person-card/person-card.component';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, MovieCardComponent, PersonCardComponent, RouterModule],
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.css'
})
export class FavoritosComponent implements OnInit, OnDestroy {
  peliculas: Pelicula[] = [];
  series: Pelicula[] = [];
  personas: Persona[] = [];
  private subscription: Subscription;


  constructor (private favoriteService: FavoriteService, private router: Router){
    this.subscription = router.events.subscribe(e=>{
      if(e instanceof NavigationEnd){
        if(e.url != '/favoritos'){
          console.log('asdads')
          this.favoriteService.setFavoritos(this.peliculas, this.series, this.personas);
        }
        console.log(e.url)
      }
    })
  }

  ngOnDestroy(): void {
    this.favoriteService.setFavoritos(this.peliculas, this.series, this.personas);

    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    let favs: Favoritos = this.favoriteService.getFavoritos();
    this.peliculas = favs.peliculas;
    this.series = favs.series;
    this.personas = favs.personas;
  }

}
