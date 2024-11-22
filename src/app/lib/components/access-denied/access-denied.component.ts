import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-access-denied',
  standalone: true,
  templateUrl: './access-denied.component.html',
  imports: [
    MatIconModule,
    MatCardModule,
  ]
})
export class AccessDeniedComponent {
  constructor(
    public router: Router
  ) { }

  public goHome(){
    this.router.navigate(['/'])
  }
}
