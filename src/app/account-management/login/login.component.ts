import { AlertService } from './../../shared-component/alert.service';
import { HttpService } from './../../shared-component/http.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { UserViewModelResponse } from '../view-models/user-response.viewmodel';
import { UserViewModel } from '../../shared-view-models/user.viewmodel';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/shared-component/session.service';


@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  public userViewModel: UserViewModel;

  constructor( private router: Router, private httpService: HttpService,
               private alertService: AlertService, private sessionService: SessionService) {

    this.userViewModel = new UserViewModel();
    this.userViewModel.emailAddress = 'deepan@verdant.co.in';
    this.userViewModel.password = 'admin';
  }

  ngOnInit() {
  }

  public login() {

    localStorage.removeItem('token');
    let user = new UserViewModel();
    user = this.userViewModel;

    let url = this.sessionService.appSettings.accountManagementWebApiUrl +  'authorization/login';
    this.httpService.HttpPost<UserViewModelResponse>(url, user).subscribe((response: UserViewModelResponse) => {
      this.loginSuccess(response);
    }, response => this.loginFailed(response));

  }

  private loginSuccess(response: UserViewModelResponse) {
    const message = 'Login Successful.';
    this.alertService.ShowSuccessMessage(message);
    localStorage.setItem('token', response.entity.token);
    this.sessionService.setUserViewModel(response.entity);
    this.router.navigate(['/home']);
  }

  private loginFailed(error: HttpErrorResponse) {
    let errorResponse: UserViewModelResponse = error.error;
    if (error.status > 0) {
      this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
    } else {
      this.alertService.ShowErrorMessage(error.message);
    }
  }


}


