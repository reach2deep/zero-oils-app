import { AlertService } from './../../shared-component/alert.service';
import { HttpService } from './../../shared-component/http.service';
import { Component, OnInit } from '@angular/core';
import { CustomerViewModel } from '../customer-view-model/customer.viewmodel';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { SessionService } from 'src/app/shared-component/session.service';

@Component({
  selector: "app-customer-detail",
  templateUrl: "./customer-detail.component.html",
  styleUrls: ["./customer-detail.component.scss"]
})

export class CustomerDetailComponent implements OnInit {
  public CustomerViewModel: CustomerViewModel;

  constructor(private router: Router, private httpService: HttpService, private sessionService: SessionService) {

this.CustomerViewModel = new CustomerViewModel();
this.CustomerViewModel.email = '';

}


  ngOnInit() {

  }
}
