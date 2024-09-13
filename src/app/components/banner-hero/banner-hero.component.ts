import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Pelicula, Peliculas } from '../../models/peliculas.model';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { HammerModule } from '@angular/platform-browser';

import 'hammerjs';
import { RouterModule } from '@angular/router';
import { FavoriteService } from '../../services/favorite-service.service';


@Component({
  selector: 'banner-hero',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonComponent, HammerModule],
  templateUrl: './banner-hero.component.html',
  styleUrl: './banner-hero.component.css'
})
export class BannerHeroComponent implements OnInit, AfterViewInit{
  @ViewChild('banner-hero') container: ElementRef|undefined;

  data: {loading: boolean, peliculas: Pelicula[]} = {loading: false, peliculas: []};
  actualIndex: number = 0;
  inFav: boolean[] = [];
  

  imgPath = 'https://image.tmdb.org/t/p/w500/';
  imgHdPath = 'https://image.tmdb.org/t/p/original/';

  actualImg = '';

  constructor(private moviesService: MoviesService, private favoriteService: FavoriteService){}


  ngAfterViewInit(): void {
    // const hammer = new Hammer();
  }


  ngOnInit(): void {
    this.data = {loading: false, peliculas: []}
    this.moviesService.getListaMedia('movie', 'popular').subscribe(data=>{
      let numAleatorio: number = Math.floor(Math.random() * 5) + 4;
      this.data = {loading: false, peliculas: data.results.slice(0,numAleatorio)};
      this.actualImg = `${this.imgPath}${this.data.peliculas[this.actualIndex].backdrop_path}`;
      // console.log(data);
      // console.log(this.data);

      this.allInFav();
      
    });


  }


  moverBanner(sumar: boolean, mov: number){
    if (mov ==1 || mov == -1){
      if(sumar)
        this.actualIndex = this.actualIndex + mov;
      else
        this.actualIndex = mov;
      this.actualImg = `${this.imgPath}${this.data.peliculas[this.actualIndex].backdrop_path}`;
    }
  }


  isNew(date: string):boolean{
    let prevDate: Date = new Date(date);
    let currentDate: Date = new Date();

    let timeDiference = currentDate.getTime() - prevDate.getTime();
    const timeInMonth:number = 1000*60*60*24*30;
    return timeDiference <= timeInMonth;
  }

  toggleFav(e:Event, i:number){
    let target = document.querySelector('.banner-card.active .add-favorite') as HTMLElement;
    if(target.classList.contains('inFav')){
      this.favoriteService.deleteFavorite(this.data.peliculas[i].id, 'movie');
    }else{
      this.favoriteService.addToFavorite(this.data.peliculas[i], 'movie');
    }

    this.inFav[i] = !this.inFav[i];
  }

  allInFav(){
    this.inFav = [];
    this.data.peliculas.forEach(el=> {
      this.inFav = [...this.inFav, this.favoriteService.inFavs(el.id, 'movie')]
    })

  }

}
