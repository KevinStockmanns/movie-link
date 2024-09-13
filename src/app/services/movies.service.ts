import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pelicula, PeliculaDetails, Peliculas } from '../models/peliculas.model';
import { ActorWorks, Personas } from '../models/personas.model';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  imgPath: string = 'https://image.tmdb.org/t/p/w500/';
  imgHDPath: string = 'https://image.tmdb.org/t/p/original/';

  constructor(private http: HttpClient) { }

  private apiKey: string = '98016f4fa7bddabbcb09f757f23e08dd';

  getPeliculas():Observable<Peliculas>{
    return this.http.get<Peliculas>(`https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}`);
  }

  getListaMedia(type:string, topic:string): Observable<Peliculas>{
    return this.http.get<Peliculas>(`https://api.themoviedb.org/3/${type}/${topic}?api_key=${this.apiKey}&language=es`);
  }

  getPersonas(): Observable<Personas>{
    return this.http.get<Personas>(`https://api.themoviedb.org/3/person/popular?api_key=${this.apiKey}&language=es`);
  }


  getDetails(typeMedia: string, id:string): Observable<PeliculaDetails>{
    return this.http.get<PeliculaDetails>(`https://api.themoviedb.org/3/${typeMedia}/${id}?language=es&api_key=${this.apiKey}`);
  }

  search(typeMedia:string, query:string): Observable<Peliculas|Personas>{
    if(typeMedia == 'people'){
      return this.http.get<Personas>(`https://api.themoviedb.org/3/search/${typeMedia}?query=${query}&language=es&api_key=${this.apiKey}`);
    }

    return this.http.get<Peliculas>(`https://api.themoviedb.org/3/search/${typeMedia}?query=${query}&language=es&api_key=${this.apiKey}`);
  }


  getActorWorks(id: string){
    return this.http.get<ActorWorks>(`https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${this.apiKey}&language=es`);
  }
  getSimilar(typeMedia:string, id:string|null): Observable<Peliculas>{
    return this.http.get<Peliculas>(`https://api.themoviedb.org/3/${typeMedia}/${id}/similar?api_key=${this.apiKey}&language=es`);
  }
}
