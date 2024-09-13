import { AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Persona } from '../../models/personas.model';
import { CommonModule } from '@angular/common';
import { MoviesService } from '../../services/movies.service';
import { SkeletonComponent } from '../loaders/skeleton/skeleton.component';
import { Router, RouterModule } from '@angular/router';
import { FavoriteService } from '../../services/favorite-service.service';

@Component({
  selector: 'person-card',
  standalone: true,
  imports: [CommonModule, SkeletonComponent],
  templateUrl: './person-card.component.html',
  styleUrl: './person-card.component.css'
})
export class PersonCardComponent implements OnInit {
  @Input() data: Persona|undefined;
  @Input() dimensiones: {ancho:string, alto:string} = {ancho: '100px', alto: '100px'};
  inFav: boolean= false;

  estilosSkeleton = {
    display: 'grid',
    girdTemplateColumns: '1fr 3fr',
    girdTemplateRows: '1fr 1fr'
  };

  imgPath: string = this.movieService.imgPath;

  constructor(
    private movieService: MoviesService, 
    private favoriteService: FavoriteService, 
    private router: Router
  ){
  }
  ngOnInit(): void {
    this.inFav = this.favoriteService.inFavs(this.data?.id as number, 'person');
    console.log(this.data?.id, this.inFav)
  }


  toggleFav(target: HTMLElement){
    if(target.classList.contains('inFav')){
      this.favoriteService.deleteFavorite(this.data?.id as number, 'person');
    }else{
      this.favoriteService.addToFavorite(this.data as Persona, 'person');
    }

    this.inFav = !this.inFav;

    console.log(this.favoriteService.getFavoritos())
  }

  redirectTo(e: Event){
    let target = (e.target as HTMLElement);
    if(!target.matches('.non-redirect') && !target.matches('.non-redirect *')){
      this.router.navigate(['person', this.data?.id]);
    }
  }
}
