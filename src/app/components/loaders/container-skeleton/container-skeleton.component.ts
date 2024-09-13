import { Component, Input } from '@angular/core';
import { SkeletonComponent } from '../skeleton/skeleton.component';

@Component({
  selector: 'container-skeleton',
  standalone: true,
  imports: [SkeletonComponent],
  templateUrl: './container-skeleton.component.html',
  styleUrl: './container-skeleton.component.css'
})
export class ContainerSkeletonComponent {
  @Input() dimensiones: {alto:string, ancho:string}= {alto:'100px', ancho:'100px'}
}
