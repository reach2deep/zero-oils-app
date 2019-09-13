import { AlertService } from './../../shared-component/alert.service';
import { HttpService } from './../../shared-component/http.service';

import { HttpErrorResponse } from '@angular/common/http';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContactViewModel } from '../view-models/contact.viewmodel';
import { ContactViewModelResponse } from '../view-models/contact-response.viewmodel';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SessionService } from 'src/app/shared-component/session.service';


@Component({
  selector: 'app-contact-inquiry',
  templateUrl: './contact-inquiry.component.html',
  styleUrls: ['./contact-inquiry.component.css']
})

export class ContactInquiryComponent implements OnInit, OnDestroy {

  public contactViewModel: ContactViewModel;
  public createMode: Boolean;
  public readonlyMode: Boolean;

  private routerSubscription: Subscription;


  constructor(private router: Router, private route: ActivatedRoute, private sessionService: SessionService,
              private alertService: AlertService, private httpService: HttpService) {

    this.contactViewModel = new ContactViewModel();
    this.contactViewModel.contactName = '';
    this.contactViewModel.addressLine1 = '';
    this.contactViewModel.addressLine2 = '';
    this.contactViewModel.city = '';
    this.contactViewModel.region = '';
    this.contactViewModel.postalCode = '';
    this.contactViewModel.contactId = 0;

    this.createMode = true;
    this.readonlyMode = false;

  }

  ngOnInit() {

    this.routerSubscription = this.route
      .queryParams
      .subscribe(params => {
        this.contactViewModel.contactId = +params['id'] || 0;
        if (this.contactViewModel.contactId > 0) {
            this.createMode = false;
            this.readonlyMode = true;
            this.getContactInformation();
        }
      });

  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

  private getContactInformation() {
    let url = this.sessionService.appSettings.salesOrderManagementWebApiUrl + 'contact/getcontact';
    this.httpService.HttpPost<ContactViewModelResponse>(url, this.contactViewModel).subscribe((response: ContactViewModelResponse) => {
      this.getContactSuccess(response);
    }, response => this.getContactFailed(response));

  }

  private initializeContact() {
    this.contactViewModel = new ContactViewModel();
    this.contactViewModel.contactName = '';
    this.contactViewModel.addressLine1 = '';
    this.contactViewModel.addressLine2 = '';
    this.contactViewModel.city = '';
    this.contactViewModel.region = '';
    this.contactViewModel.postalCode = '';
    this.contactViewModel.contactId = 0;
  }

  public createNewContact() {
    this.readonlyMode = false;
    this.initializeContact();
  }

  private getContactSuccess(response: ContactViewModelResponse) {
    this.contactViewModel = response.entity;
  }

  private getContactFailed(error: HttpErrorResponse) {

    let errorResponse: ContactViewModelResponse = error.error;
    if (error.status > 0) {
      this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
    } else {
      this.alertService.ShowErrorMessage(error.message);
    }

  }

  public createOrUpdateContact() {

    let contact = new ContactViewModel();
    contact = this.contactViewModel;

    let url = '';

    if (contact.contactId === 0) {
      url = this.sessionService.appSettings.salesOrderManagementWebApiUrl + 'contact/createcontact';
    } else {
      url = this.sessionService.appSettings.salesOrderManagementWebApiUrl + 'contact/updatecontact';
    }

    this.httpService.HttpPost<ContactViewModelResponse>(url, contact).subscribe((response: ContactViewModelResponse) => {
      this.createOrUpdateContactSuccess(response);
    }, response => this.createOrUpdateContactFailed(response));

  }

  private createOrUpdateContactSuccess(response: ContactViewModelResponse) {

    let contactViewModel: ContactViewModel = response.entity;
    this.contactViewModel.contactId = contactViewModel.contactId;
    const message = 'Contact successfully saved.';
    this.alertService.ShowSuccessMessage(message);

    this.createMode = false;
    this.readonlyMode = true;

  }

  private createOrUpdateContactFailed(error: HttpErrorResponse) {

    let errorResponse: ContactViewModelResponse = error.error;
    if (error.status > 0) {
      this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
    } else {
      this.alertService.ShowErrorMessage(error.message);
    }

  }

  private editContact() {
    this.createMode = false;
    this.readonlyMode = false;
  }

  // public createSalesOrder() {

  //   let salesOrderViewModel = new SalesOrderViewModel();
  //   salesOrderViewModel.contactId = this.contactViewModel.contactId;

  //   let url = this.sessionService.appSettings.salesOrderManagementWebApiUrl + 'salesorder/createsalesorder';
  //   this.httpService.HttpPost<SalesOrderViewModelResponse>(url, salesOrderViewModel)
  //   .subscribe((response: SalesOrderViewModelResponse) => {
  //     this.createSalesOrderSuccess(response);
  //   }, response => this.createSalesOrderFailed(response));

  // }

  // private createSalesOrderSuccess(response: SalesOrderViewModelResponse) {
  //   let salesOrderId = response.entity.salesOrderId;
  //   this.router.navigate(['/salesordermanagement/sales-order-maintenance'], { queryParams: { id: salesOrderId } });
  // }

  // private createSalesOrderFailed(error: HttpErrorResponse) {
  //   let errorResponse: ContactViewModelResponse = error.error;
  //   if (error.status > 0) {
  //     this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
  //   } else {
  //     this.alertService.ShowErrorMessage(error.message);
  //   }
  // }

}

