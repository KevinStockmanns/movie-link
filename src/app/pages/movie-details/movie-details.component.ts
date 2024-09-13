import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { Pelicula, PeliculaDetails, Peliculas, SerieDetails } from '../../models/peliculas.model';
import { BackBtnComponent } from '../../components/back-btn/back-btn.component';
import { ActorWorks, PersonDetails } from '../../models/personas.model';
import { Title } from '@angular/platform-browser';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, BackBtnComponent, MovieCardComponent],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class DetailsComponent implements OnInit, OnDestroy{

  data: PeliculaDetails|SerieDetails|PersonDetails|undefined;
  carouselContent: ActorWorks|Peliculas|undefined;
  imgPath:string = '';
  imgBase:string = this.moviesService.imgPath;
  typeMedia: string = 'movie';

  private subscription: Subscription|undefined;

  constructor(private rotuer: ActivatedRoute,
     private moviesService: MoviesService,
      private titleServie: Title,
      private route: Router){}
  
  
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
  ngOnInit(): void {
    this.subscription = this.rotuer.paramMap.subscribe(param=>{
      let id = param.get('id');
      this.typeMedia = param.get('typeMedia') || 'movie';

      if(id && this.typeMedia){
        this.moviesService.getDetails(this.typeMedia, id).subscribe(res=>{
          this.data = res;
          this.imgPath = this.imgBase + (this.toPersonDet().profile_path ? this.toPersonDet().profile_path : this.toPeliDet().backdrop_path);
          this.titleServie.setTitle(this.titleServie.getTitle() + ` | ${this.toPeliDet().title || this.toSerieDet().name || this.toPersonDet().name}`)
  
          if(this.typeMedia == 'person'){
            this.moviesService.getActorWorks(this.toPersonDet().id.toString()).subscribe(res=>{
              this.carouselContent = res;
            })
          }else{
            this.moviesService.getSimilar(this.typeMedia, id).subscribe(res=>{
              this.carouselContent = res;
            });
          }
        }, err=> this.route.navigate(['/']));
      }
    })
  }


  toPeliDet(){
    return this.data as PeliculaDetails;
  }
  toPeli(data:any) {return data as Pelicula}
  toPeliculas() {return this.carouselContent as Peliculas}

  toSerieDet(){
    return this.data as SerieDetails;
  }

  toPersonDet(){
    return this.data as PersonDetails;
  }


  toActorWorks(): ActorWorks{
    return this.carouselContent as ActorWorks;
  }

  isNew(date:string): boolean{
    let actual = new Date().getTime();
    let preDate = new Date(date).getTime();
    let month = 1000*60*60*24*30;

    return (actual - preDate <= month);
  }
}
