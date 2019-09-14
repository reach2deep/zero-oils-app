

import { MaterialModule } from './../material.module';


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CustomerManagementRoutingModule } from './customer-management.routing';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';



@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      MaterialModule,
      CustomerManagementRoutingModule
  ],
  declarations: [CustomerListComponent,  CustomerDetailComponent]
})
export class CustomerManagementModule { }

