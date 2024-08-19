import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Idle } from '@ng-idle/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonService } from './common/common.service';
import { AppConstants } from '../app.constant';
import { LoginRequestModel } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  logoutUrl = `${environment.apiServerUrl}/logout`;
  idleTimeoutWarningSeconds = 10;

  constructor(private idle: Idle, private dialog: MatDialog, private commonService: CommonService) { }

  public initiateAuth(userDetails: LoginRequestModel): Observable<any> | void {
    const path: string = window.location.pathname;
    if (path.endsWith('/logout')) {
      return this.logout();
    } else {
      return this.login(userDetails);
    }
  }

  logout() {
    this.commonService.clearSession();
  }

  public login(userDetails: LoginRequestModel) {
    userDetails.password = btoa(userDetails.password);
    return this.commonService.callRestApi(AppConstants.API_LOGIN_USER, userDetails);
  }
}
