import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MoviesService } from '../../services/movies.service';
import { Pelicula } from '../../models/peliculas.model';
import { Persona } from '../../models/personas.model';
import { PersonCardComponent } from '../../components/person-card/person-card.component';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { BackBtnComponent } from '../../components/back-btn/back-btn.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [RouterModule, HeaderComponent, FooterComponent, PersonCardComponent, MovieCardComponent, BackBtnComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  @ViewChild('search') searchInput: ElementRef|undefined;
  typeMedia:string = 'movie';
  data: Pelicula[]|Persona[]|undefined = undefined;
  
  constructor(private moviesService: MoviesService){}

  handleValue(target: HTMLInputElement, e: KeyboardEvent){
    let value = target.value;
    if (value) 
      target.parentElement?.classList.add('withText');
    else
      target.parentElement?.classList.remove('withText');
    
    if(e.key == 'Enter' && value){
      this.realizarBusqueda(this.typeMedia);
    }
  }
  handleSubmit(e: Event){
    let el = (e.target as HTMLElement).parentElement?.querySelector('input')
    if(!el) {el = (e.target as HTMLElement).parentElement?.parentElement?.querySelector('input')}

    let value = (el as HTMLInputElement).value;
    this.realizarBusqueda(this.typeMedia);
  }

  handleTypeMedia(e: Event){
    this.typeMedia =(e.target as HTMLSelectElement).value;
    this.realizarBusqueda(this.typeMedia);
  }

  realizarBusqueda(typeMedia: string){
    let query = (this.searchInput?.nativeElement as HTMLInputElement).value;
    if(query){
      this.moviesService.search(this.typeMedia, query).subscribe(res=>{
        let data = res.results;
        if(this.typeMedia == 'person')
          this.data = data.filter(el=> this.toPersona(el).profile_path) as Persona[];
        else
          this.data = data.filter(el=> this.toPelicula(el).backdrop_path) as Pelicula[];
      });
    }
  }


  toPersona(data: any):Persona{
    return data as Persona;
  }

  toPelicula(data: any):Pelicula{
    return data as Pelicula;
  }
}
