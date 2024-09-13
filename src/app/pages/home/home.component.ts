import { Component, OnInit } from '@angular/core';
import { BannerHeroComponent } from '../../components/banner-hero/banner-hero.component';
import { Pelicula } from '../../models/peliculas.model';
import { CommonModule } from '@angular/common';
import { Persona } from '../../models/personas.model';
import { CardsContainerComponent } from '../../components/cards-container/cards-container.component';
import { SkeletonComponent } from '../../components/loaders/skeleton/skeleton.component';
import { ContainerSkeletonComponent } from '../../components/loaders/container-skeleton/container-skeleton.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import Typed, { TypedOptions } from 'typed.js';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, CardsContainerComponent, BannerHeroComponent, ContainerSkeletonComponent, HeaderComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  ngOnInit(): void {
    const options: TypedOptions = {
      strings: ['Series', 'Actores', 'Tv Shows', 'Peliculas'],
      typeSpeed: 100,
      backSpeed: 50,
      startDelay: 500,
      backDelay: 1500,
      loop: true,
      loopCount: 2
    };

    const typed = new Typed('.search-word', options);
  }

  data: {data: Pelicula[]|Persona[], type: string, title:string}[] = [];



  // ngOnInit(): void {
  //   this.movieService.getListaPeliculas('top_rated').subscribe(data=>{
  //     this.data.push({data: data.results.slice(0,10), type: 'simple-movie-card', title: 'Top 10 Mejores Peliculas'});
  //   });
  //   this.movieService.getListaPeliculas('now_playing').subscribe(data=>{
  //     this.data.push({data: data.results.slice(0,10), type: 'simple-movie-card', title: 'Peliculas de la actualidad'})
  //   });
  //   this.movieService.getListaPeliculas('upcoming').subscribe(data=>{
  //     this.data.push({data: data.results.slice(0,10), type: 'simple-movie-card', title: 'Peliculas recientes'})
  //   });

  //   this.movieService.getPersonas().subscribe(data=>{
  //     this.data.push({data: data.results.slice(0,10), type: 'person-card', title: 'Mejores Actores'})
  //   })
  // }

}
