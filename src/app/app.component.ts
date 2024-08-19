import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Healthtracker-UI';
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {
    this.isLoggedIn = this.authService.isLoggedIn();
  }
}
