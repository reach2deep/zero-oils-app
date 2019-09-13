import { ContactViewModel } from './../view-models/contact.viewmodel';
import { ContactListViewModelResponse } from './../view-models/contact-list-response.viewmodel';

import { ContactListViewModel } from './../view-models/contact-list-viewmodel';

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
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})

export class ContactListComponent {

  @ViewChild('form', {static: false}) searchForm: NgForm;

  public contactListViewModel: ContactListViewModel;
  public selectedRowIndex = -1;
  private lastSearchValue: string;

  constructor(private router: Router, private sessionService: SessionService, private httpService: HttpService,
              private alertService: AlertService) {

   this.sessionService.moduleLoadedEvent.emit();

   this.contactListViewModel = new ContactListViewModel();
   this.contactListViewModel.pageSize = 20;

   this.contactListViewModel.displayedColumns = ['contactName', 'addressLine1', 'addressLine2', 'city', 'region', 'postalCode'];
   this.contactListViewModel.pageSizeOptions = [5, 10, 25, 100];

   this.initializeSearch();
}

// tslint:disable-next-line:use-lifecycle-interface
ngAfterViewInit() {
  console.log('after view init');
  // this.searchForm.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(
  //     changes => {
  //         this.contactListViewModel.currentPageNumber = 1;
  //         this.contactListViewModel.currentPageIndex = 1;
  //         if (this.lastSearchValue !== this.contactListViewModel.contactName) {
  //           console.log('executeSearch 1');
  //           this.executeSearch();
  //         }
  //       }
  //     );

  console.log('executeSearch');
  this.executeSearch();
}

  private initializeSearch() {

    this.contactListViewModel.contactName = '';
    this.contactListViewModel.currentPageNumber = 1;
    this.contactListViewModel.currentPageIndex = 0;
    this.contactListViewModel.totalPages = 0;
    this.contactListViewModel.totalContacts = 0;
    this.contactListViewModel.sortDirection = '';
    this.contactListViewModel.sortExpression = '';

    this.contactListViewModel.contacts = new Array<ContactViewModel>();

  }

  private executeSearch() {

    const url = this.sessionService.appSettings.salesOrderManagementWebApiUrl + 'Contact/GetContacts';
    console.log(url);
    this.httpService.HttpPost<ContactListViewModelResponse>(url, this.contactListViewModel).
        subscribe((response: ContactListViewModelResponse) => {this.contactInquirySuccess(response);
    }, response => this.contactInquiryFailed(response));
  }

  private contactInquirySuccess(response: ContactListViewModelResponse) {
    console.log(JSON.stringify(response));
    this.contactListViewModel.contacts = response.entity;
    this.contactListViewModel.totalContacts = response.totalRows;
    this.contactListViewModel.totalPages = response.totalPages;
  }

  private contactInquiryFailed(error: HttpErrorResponse) {
    const errorResponse: ContactListViewModelResponse = error.error;
    if (error.status > 0) {
      this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
    } else {
      this.alertService.ShowErrorMessage(error.message);
    }
  }

  public onPaginateChange(event) {
    this.contactListViewModel.currentPageNumber = event.pageIndex + 1;
    this.contactListViewModel.currentPageIndex = event.pageIndex;
    this.contactListViewModel.pageSize = event.pageSize;
    this.executeSearch();
  }

  public sortData(sort: MatSort) {
    this.contactListViewModel.currentPageNumber = 1;
    this.contactListViewModel.currentPageIndex = 0;
    this.contactListViewModel.sortDirection = sort.direction;
    this.contactListViewModel.sortExpression = sort.active;
    this.executeSearch();
  }

  public resetSearch() {
    this.lastSearchValue = '';
    this.contactListViewModel.contactName = '';
    this.initializeSearch();
    this.executeSearch();
  }

  // public selectContact(row){
  //   let contactId = this.contactInquiryViewModel.contacts[row].contactId;
  //   this.router.navigate(['/salesordermanagement/contact-maintenance'], { queryParams: { id: contactId } });
  // }
}
