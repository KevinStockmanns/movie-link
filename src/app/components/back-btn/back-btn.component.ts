import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-back-btn',
  standalone: true,
  imports: [],
  templateUrl: './back-btn.component.html',
  styleUrl: './back-btn.component.css'
})
export class BackBtnComponent {

  constructor(private router: Router){}

  goToHome(){
    // this.router.navigate([''], {replaceUrl: true});
    window.history.back();
  }
}
