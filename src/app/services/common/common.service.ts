import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { AppConstants } from 'src/app/app.constant';
import { environment } from 'src/environments/environment';
import { v7 as uuidv7 } from 'uuid';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  appToken: string = "";
  appUserId: string = "";
  screenHeight = signal(200);
  screenWidth = signal(400);

  constructor(private httpClient: HttpClient, private snackbar: MatSnackBar) { }

  invokeTokenCall() {
    this.getToken({ api_key: AppConstants.API_KEY }).subscribe((data: any) => {
      if (data.success) {
        this.setAppToken = data.dataArray.token;
      }
    });
  }

  getToken(apiFuncParams: any) {
    let apiFuncName = AppConstants.API_GET_TOKEN;
    return this.httpClient.get(environment.apiServerUrl + "?apiFunctionName=" + encodeURIComponent(apiFuncName) + "&apiFunctionParams=" + encodeURIComponent(JSON.stringify(apiFuncParams)));
  }

  callRestApi(apiFuncName: string, apiFuncParams: any): Observable<any> {
    const headers = {
      'content-type': 'application/x-www-form-urlencoded',
      'accept': 'application/json'
    };
    return this.httpClient.post(environment.apiServerUrl, "apiFunctionName=" + encodeURIComponent(apiFuncName) + "&apiFunctionParams=" + encodeURIComponent(JSON.stringify(apiFuncParams)) + this.appendMandatoryParams(),
      { 'headers': headers });
  }
  appendMandatoryParams(): string {
    let _apiJsonParams = "&apiKey=" + AppConstants.API_KEY;
    _apiJsonParams += "&apiToken=" + this.getAppToken;
    return _apiJsonParams;
  }

  public get getAppToken() {
    return sessionStorage.getItem('app-token-ht');
  }

  public set setAppToken(appToken: string) {
    sessionStorage.setItem("app-token-ht", appToken);
  }

  public get getAppUserId() {
    return sessionStorage.getItem('app-user-id-ht');
  }

  public set setAppUserId(v: string) {
    sessionStorage.setItem("app-user-id-ht", v);
  }

  clearSession() {
    sessionStorage.clear();
  }

  showAlert(msg: string | object, actionTxt?: string) {
    if (actionTxt == undefined || actionTxt == null) {
      actionTxt = "Close";
    }
    if (typeof msg !== 'string') {
      msg = "An error occurred -> " + JSON.stringify(msg);
    }
    this.snackbar.open(msg, actionTxt);
    setTimeout(() => {
      this.snackbar.dismiss();
    }, 5000);
  }

  formatDateToString(d: string) {
    let formattedDate = new Date(d).toLocaleString('en-in', { timeZone: AppConstants.RELEVANT_TIMEZONE });
    if (formattedDate == 'Invalid Date') {
      return d;
    }
    let dateTimeParts = formattedDate.split(',');
    let dateParts = dateTimeParts[0].split('/');
    return this.padZeros(dateParts[0]).concat('/').concat(this.padZeros(dateParts[1])).concat('/').concat(dateParts[2]).concat(dateTimeParts[1]);
  }

  convertDateForSQL(_date?: any) {
    var d = new Date();
    if (_date !== undefined && _date !== null) {
      d = new Date(_date);
    }
    return [d.getFullYear(), this.padZeros(d.getMonth() + 1), this.padZeros(d.getDate())].join('-') + ' ' +
      [this.padZeros(d.getHours()), this.padZeros(d.getMinutes()), this.padZeros(d.getSeconds())].join(':')
  }

  padZeros(val: string | number) {
    let _val = Number(val);
    if (isNaN(_val)) {
      return String(val);
    } else {
      return (_val < 10) ? ('0' + val) : String(val);
    }
  }

  generateUUID() {
    return uuidv7();
  }
}
