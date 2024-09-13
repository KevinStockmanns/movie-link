import { Component, Input, OnInit } from '@angular/core';
import { Pelicula } from '../../models/peliculas.model';
import { CommonModule } from '@angular/common';
import { MoviesService } from '../../services/movies.service';
import { Router, RouterModule } from '@angular/router';
import { FavoriteService } from '../../services/favorite-service.service';

@Component({
  selector: 'movie-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css'
})
export class MovieCardComponent implements OnInit {

  @Input() dimensiones:{alto:string, ancho:string} = {alto: '100px', ancho: '100px'};
  imgPath = this.movieService.imgPath;
  imgHDPath = this.movieService.imgHDPath;
  inFav: boolean = false;

  @Input() data: Pelicula|undefined;
  @Input() typeMedia: string|undefined;

  constructor(
    private movieService: MoviesService,
    private favoriteService: FavoriteService,
    private router: Router
  ){}
  ngOnInit(): void {
    if(!this.typeMedia){
      this.typeMedia = this.data?.name ? 'tv': 'movie';
    }
    this.inFav = this.inFavs();
  }


  redirectToDetails(e: Event){
    let target = e.target as HTMLElement;
    if(!(target.matches('.non-redirect') || target.matches('.non-redirect *'))){
      this.router.navigate([this.typeMedia, this.data?.id])
    }
  }


  isNew(date:string|undefined):boolean{
    let prevDate = new Date(date == undefined ? Date.now() : date);
    let currenDate = new Date();
    let month: number = 1000*60*60*24*30;
    let diference:number = currenDate.getTime() - prevDate.getTime();

    return diference < month;
  }


  redondear(num:number){
    return Math.round(num);
  }

  toggleFav(e: Event){
    let target = e.target as HTMLElement;
    if(this.inFav){
      this.favoriteService.deleteFavorite(this.data?.id as number, this.typeMedia as string);
    }else{
      this.favoriteService.addToFavorite(this.data as Pelicula, this.typeMedia as string);
    }

    this.inFav = !this.inFav;
  }
  inFavs(): boolean{
    return this.favoriteService.inFavs(this.data?.id as number, this.typeMedia as string);
  }
}
