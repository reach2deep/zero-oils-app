import { AppSettings } from './shared-models/appsettings.model';
import { AlertService } from './shared-component/alert.service';
import { Router } from '@angular/router';
import { Component, ElementRef } from '@angular/core';
import { SessionService } from './shared-component/session.service';
import { UserViewModel } from './shared-view-models/user.viewmodel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public title = 'Zero Oils LLC.';
  public isAuthenicated: Boolean;
  public firstName: string;
  public lastName: string;
  public tokenExpirationDate: any;
  public showProgressBar: Boolean;
  public iterations = 0;
  public sessionId: any;
  public runningMonitor: boolean;
  public hideMenuBar: boolean;

  constructor(private elementRef: ElementRef,
              private router: Router, private alertService: AlertService, private sessionService: SessionService) {

    this.showProgressBar = false;
    this.sessionId = 0;
    this.runningMonitor = false;
    this.hideMenuBar = true;

    this.alertService.progressBarUIEvent.subscribe(event => this.updateProgressBar(event));
    this.sessionService.authenicationEvent.subscribe(event => this.authenicationEvent(event));
    this.sessionService.moduleLoadedEvent.subscribe(event => this.moduleLoadedEvent(event));

    // const native = this.elementRef.nativeElement;
    // const settings = native.getAttribute('settings'); https://zero-oils-api.herokuapp.com
    const appSettings = new AppSettings();

    // appSettings.accountManagementWebApiUrl = 'https://localhost:44302/api/';
    // appSettings.inventoryManagementWebApiUrl = 'https://localhost:44302/api/';
    // appSettings.purchaseOrderManagementWebApiUrl = 'https://localhost:44302/api/';
    // appSettings.salesOrderManagementWebApiUrl = 'https://localhost:44302/api/';

    appSettings.accountManagementWebApiUrl = 'https://zero-oils-api.herokuapp.com/api/';
    appSettings.inventoryManagementWebApiUrl = 'https://zero-oils-api.herokuapp.com/api/';
    appSettings.purchaseOrderManagementWebApiUrl = 'https://zero-oils-api.herokuapp.com/api/';
    appSettings.salesOrderManagementWebApiUrl = 'https://zero-oils-api.herokuapp.com/api/';

    // appSettings = JSON.parse(settings);

    sessionService.setAppSettings(appSettings);
    this.isAuthenicated = sessionService.isAuthenicated;

    sessionService.startSession();

}
private moduleLoadedEvent(event: any) {
  this.hideMenuBar = true;
}

private updateProgressBar(event: Boolean) {
  this.showProgressBar = event;
}

private authenicationEvent(userViewModel: UserViewModel) {

  this.isAuthenicated = userViewModel.isAuthenicated;
  this.firstName = userViewModel.firstName;
  this.lastName = userViewModel.lastName;

  this.tokenExpirationDate = userViewModel.tokenExpirationDate;

  if (this.isAuthenicated === true && this.runningMonitor === false) {
      this.runningMonitor = true;
      this.monitorSession();
      this.sessionId = setInterval(() => {
          this.monitorSession();
      }, 5000);
  } else {
      if (this.isAuthenicated === false && this.runningMonitor === true) {
          this.clearSessionInterval();
      }
  }
}

public toggleNavBar() {
  if (this.hideMenuBar === false) {
      this.hideMenuBar = true;
  } else {
      this.hideMenuBar = false;
  }
}
private monitorSession() {

  const isExpiredSession = this.sessionService.isExpiredSession();
  if (isExpiredSession) {
      this.isAuthenicated = false;
      this.clearSessionInterval();
      this.logout();
  } else {
      this.isAuthenicated = true;
  }
  this.iterations++;
}

public logout() {
  this.sessionService.endSession();
  this.router.navigate(['/home']);
}

private clearSessionInterval() {
  if (this.sessionId !== 0) {
      clearInterval(this.sessionId);
      this.sessionId = 0;
  }
  this.runningMonitor = false;
}

}
