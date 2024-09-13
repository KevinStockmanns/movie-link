import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.css'
})
export class SkeletonComponent{
  
  @Input() dimensiones: {ancho:string, alto:string} = {alto: '100px', ancho: '100px'};
  @Input() estilos: any = {};


  prop = {
    height: this.dimensiones.alto,
    width: this.dimensiones.ancho,
    ...this.estilos
  }
  

}
