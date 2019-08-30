import { CustomerInquiryComponent } from './customer-inquiry/customer-inquiry.component';
import { MaterialModule } from './../material.module';
import { CustomerListComponent } from './customer-list/customer-list.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerManagementRoutingModule } from './customer-management.routing';


@NgModule({
  imports: [
    CustomerManagementRoutingModule,
      CommonModule,
      FormsModule,
      MaterialModule
  ],
  declarations: [CustomerListComponent, CustomerInquiryComponent]
})
export class CustomerManagementModule { }

