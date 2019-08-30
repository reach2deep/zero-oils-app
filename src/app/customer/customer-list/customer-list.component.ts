import { CustomerViewModel } from './../view-models/customer.viewmodel';
import { CustomerListViewModelResponse } from './../view-models/customer-list-response.viewmodel';

import { CustomerListViewModel } from './../view-models/customer-list-viewmodel';

import { HttpErrorResponse } from '@angular/common/http';

import { AlertService } from '../../shared-component/alert.service';
import { HttpService } from '../../shared-component/http.service';

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from '../../shared-component/session.service';

import { MatSort } from '@angular/material';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})

export class CustomerListComponent {

  @ViewChild('form', {static: false}) searchForm: NgForm;

  public customerListViewModel: CustomerListViewModel;
  public selectedRowIndex = -1;
  private lastSearchValue: string;

  constructor(private router: Router, private sessionService: SessionService, private httpService: HttpService,
              private alertService: AlertService) {

   this.sessionService.moduleLoadedEvent.emit();

   this.customerListViewModel = new CustomerListViewModel();
   this.customerListViewModel.pageSize = 20;

   this.customerListViewModel.displayedColumns = ['customerName', 'addressLine1', 'addressLine2', 'city', 'region', 'postalCode'];
   this.customerListViewModel.pageSizeOptions = [5, 10, 25, 100];

   this.initializeSearch();
}

// tslint:disable-next-line:use-lifecycle-interface
ngAfterViewInit() {
  console.log('after view init');
  // this.searchForm.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(
  //     changes => {
  //         this.customerListViewModel.currentPageNumber = 1;
  //         this.customerListViewModel.currentPageIndex = 1;
  //         if (this.lastSearchValue !== this.customerListViewModel.customerName) {
  //           console.log('executeSearch 1');
  //           this.executeSearch();
  //         }
  //       }
  //     );

  console.log('executeSearch');
  this.executeSearch();
}

  private initializeSearch() {

    this.customerListViewModel.customerName = '';
    this.customerListViewModel.currentPageNumber = 1;
    this.customerListViewModel.currentPageIndex = 0;
    this.customerListViewModel.totalPages = 0;
    this.customerListViewModel.totalCustomers = 0;
    this.customerListViewModel.sortDirection = '';
    this.customerListViewModel.sortExpression = '';

    this.customerListViewModel.customers = new Array<CustomerViewModel>();

  }

  private executeSearch() {

    const url = this.sessionService.appSettings.salesOrderManagementWebApiUrl + 'Customer/GetCustomers';
    console.log(url);
    this.httpService.HttpPost<CustomerListViewModelResponse>(url, this.customerListViewModel).
        subscribe((response: CustomerListViewModelResponse) => {this.customerInquirySuccess(response);
    }, response => this.customerInquiryFailed(response));
  }

  private customerInquirySuccess(response: CustomerListViewModelResponse) {
    console.log(JSON.stringify(response));
    this.customerListViewModel.customers = response.entity;
    this.customerListViewModel.totalCustomers = response.totalRows;
    this.customerListViewModel.totalPages = response.totalPages;
  }

  private customerInquiryFailed(error: HttpErrorResponse) {
    const errorResponse: CustomerListViewModelResponse = error.error;
    if (error.status > 0) {
      this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
    } else {
      this.alertService.ShowErrorMessage(error.message);
    }
  }

  public onPaginateChange(event) {
    this.customerListViewModel.currentPageNumber = event.pageIndex + 1;
    this.customerListViewModel.currentPageIndex = event.pageIndex;
    this.customerListViewModel.pageSize = event.pageSize;
    this.executeSearch();
  }

  public sortData(sort: MatSort) {
    this.customerListViewModel.currentPageNumber = 1;
    this.customerListViewModel.currentPageIndex = 0;
    this.customerListViewModel.sortDirection = sort.direction;
    this.customerListViewModel.sortExpression = sort.active;
    this.executeSearch();
  }

  public resetSearch() {
    this.lastSearchValue = '';
    this.customerListViewModel.customerName = '';
    this.initializeSearch();
    this.executeSearch();
  }

  // public selectCustomer(row){
  //   let customerId = this.customerInquiryViewModel.customers[row].customerId;
  //   this.router.navigate(['/salesordermanagement/customer-maintenance'], { queryParams: { id: customerId } });
  // }
}
