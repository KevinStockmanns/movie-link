import { Injectable } from '@angular/core';
import { Pelicula } from '../models/peliculas.model';
import { Persona } from '../models/personas.model';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {


  constructor() { }

  getFavoritos(): Favoritos{
    let fav = localStorage.getItem('favoritos');
    return fav ? JSON.parse(fav) : {peliculas: [], series: [], personas: []};
  }

  setFavoritos(peliculas: Pelicula[], series: Pelicula[], personas: Persona[]){
    let toText = JSON.stringify({
      peliculas: peliculas ? peliculas : [],
      series: series ? series : [],
      personas: personas ? personas : []
    });
    localStorage.setItem('favoritos', toText);
  }
  setFavoritosComplete(fav: Favoritos){
    this.setFavoritos(fav.peliculas, fav.series, fav.personas);
  }


  addToFavorite(data: Pelicula|Persona, typeMedia: string){
    let favs: Favoritos = this.getFavoritos();
    if(typeMedia == 'movie' ){
      favs.peliculas.push(data as Pelicula);
    }else if(typeMedia == 'tv'){
      favs.series.push(data as Pelicula);
    }else{
      favs.personas.push(data as Persona);
    }

    this.setFavoritos(favs.peliculas, favs.series, favs.personas);
  }
  deleteFavorite(id: number, typeMedia: string){
    let favs: Favoritos = this.getFavoritos();
    let fav: Pelicula[]|Persona[] = typeMedia == 'movie' ? favs.peliculas : typeMedia == 'tv' ? favs.series : favs.personas;

    let newFavs  = fav.filter(el=> el.id != id);
    if(typeMedia == 'movie'){
      favs.peliculas = newFavs as Pelicula[];
    }else if(typeMedia == 'tv'){
      favs.series = newFavs as Pelicula[];
    }else{
      favs.personas = newFavs as Persona[];
    }

    this.setFavoritosComplete(favs);
  }

  inFavs(id: number|string, typeMedia: string): boolean{
    let favs = this.getFavoritos();
    switch (typeMedia) {
      case 'movie':
        return favs.peliculas.some(el=> el.id == id);
      
      case 'tv':
        return favs.series.some(el=> el.id == id);

      case 'person':
        return favs.personas.some(el=> el.id == id);

      default:
        return false;
    }
  }
}


export interface Favoritos {
  peliculas: Pelicula[],
  series: Pelicula[],
  personas: Persona[]
}