import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from './services/auth.service';
import { AppInfo } from 'src/app-info';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Healthtracker-UI';
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
    this.versionInfo = "Version: " + AppInfo.version + " Build Date: " + AppInfo.buildDate;
  }
  currentYear: any;
  versionInfo = '';
}
