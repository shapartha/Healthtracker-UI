import { Injectable, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Idle } from '@ng-idle/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonService } from './common/common.service';
import { AppConstants } from '../app.constant';
import { LoginRequestModel, LoginResponseModel } from '../models/login.model';
import { ApiResponseModel } from '../models/common.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedinSubject = new BehaviorSubject<boolean>(false);
  loginEvent = this.isLoggedinSubject.asObservable();
  isLoggedIn = signal(false);

  logoutUrl = `${environment.apiServerUrl}/logout`;
  idleTimeoutWarningSeconds = 10;

  constructor(private idle: Idle, private dialog: MatDialog, private commonService: CommonService) { 
    if (this.commonService.getAppUserId != null && this.commonService.getAppUserId != undefined && this.commonService.getAppUserId != '') {
      this.isLoggedIn.set(true);
    } else {
      this.isLoggedIn.set(false);
    }
  }

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
    this.isLoggedinSubject.next(false);
    this.isLoggedIn.set(false);
  }

  public login(userDetails: LoginRequestModel) {
    userDetails.password = btoa(userDetails.password);
    return this.commonService.callRestApi(AppConstants.API_LOGIN_USER, userDetails).pipe(tap((d: ApiResponseModel<LoginResponseModel>) => {
      if (d.success) {
        this.isLoggedinSubject.next(true);
        this.isLoggedIn.set(true);
      }
    }));
  }
}
