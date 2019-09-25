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


  public customerViewModel: CustomerViewModel;
  constructor(private router: Router, private httpService: HttpService, private sessionService: SessionService) {

  this.customerViewModel = new CustomerViewModel();
  this.customerViewModel.email = '';
  this.customerViewModel.firstName = '';
  this.customerViewModel.lastName = '';
  this.customerViewModel.displayName = '';
  this.customerViewModel.companyName = '';
  this.customerViewModel.salutation = '';
  this.customerViewModel.customerType = '';
  this.customerViewModel.workPhone = '';
  this.customerViewModel.mobileNumber = '';
  this.customerViewModel.websiteAddress = '';


}


genderList = ['Male', 'Female']

CustomerList = ['Male', 'Female']

  ngOnInit() {
  }

  public customer() {



    let user = new CustomerViewModel();
    user = this.customerViewModel;
    console.log('On register click');
    console.log(JSON.stringify(user));

}
}
