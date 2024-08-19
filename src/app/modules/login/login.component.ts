import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiResponseModel } from 'src/app/models/common.model';
import { LoginRequestModel, LoginResponseModel } from 'src/app/models/login.model';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  alertClass: string = "";
  alertText: string = "";
  user: any = {};
  loginForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private commonService: CommonService, private authService: AuthService) {
    if (this.commonService.getAppUserId != '') {
      this.router.navigateByUrl('/home');
    }
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      passWord: ['', Validators.required]
    });
  }
  
  ngOnInit(): void {
    if (!this.commonService.getAppToken) {
      this.commonService.invokeTokenCall();
    }
  }

  submitForm() {
    const formData = this.loginForm.value;
    let inputParams: LoginRequestModel = {
      email_id: formData.userName,
      password: formData.passWord
    }
    this.authService.initiateAuth(inputParams)!.subscribe((resp: ApiResponseModel<LoginResponseModel>) => {
      if (resp.success) {
        this.commonService.setAppUserId = resp.dataArray[0].user_id;
        this.alertClass = "alert-success";
        this.alertText = "Login Successful ! Redirecting...";
        setTimeout(() => {
          this.router.navigateByUrl('/home');
        }, 1000);
      } else {
        this.alertClass = "alert-danger";
        this.alertText = "Login Credentials Failed";
        this.commonService.showAlert(resp.responseDescription);
      }
    });;
  }

  resetForm() {
    this.loginForm.reset();
  }

  dismissAlert() {
    this.alertText = "";
    this.alertClass = "";
  }
}
