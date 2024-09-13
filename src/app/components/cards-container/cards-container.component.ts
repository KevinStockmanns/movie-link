import { Component, Input, OnInit } from '@angular/core';
import { Pelicula } from '../../models/peliculas.model';
import { Persona } from '../../models/personas.model';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { PersonCardComponent } from '../person-card/person-card.component';
import { SkeletonComponent } from '../loaders/skeleton/skeleton.component';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'cards-container',
  standalone: true,
  imports: [CommonModule, MovieCardComponent, PersonCardComponent, SkeletonComponent],
  templateUrl: './cards-container.component.html',
  styleUrl: './cards-container.component.css'
})
export class CardsContainerComponent implements OnInit{

  data: Pelicula[]|Persona[]|undefined;

  @Input() dimensiones:{alto:string, ancho:string} = {ancho:'100px', alto:'100px'};
  @Input() request: {typeMedia:string, topic:string, card:string, title:string}|undefined;

  constructor(private moviesService: MoviesService){}


  ngOnInit(): void {
    if(this.request?.card.includes('movie')){
      this.moviesService.getListaMedia(this.request.typeMedia, this.request?.topic ? this.request.topic : 'popular').subscribe(res=>{
        this.data = res.results.slice(0,10);
      });
    }else if(this.request?.card.includes('person')){
      this.moviesService.getPersonas().subscribe(res=>{
        this.data = res.results.slice(0,10);
      });
    }
  }


  convertirAPelicula(data: Pelicula|Persona): Pelicula{
    return data as Pelicula;
  }
  convertirAPersona(data:Pelicula|Persona): Persona{
    return data as Persona;
  }
}
