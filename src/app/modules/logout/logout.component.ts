import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.authService.logout();
    setTimeout(() => {
      this.router.navigateByUrl('login');
      window.location.reload();
    }, 3000);
  }
}
