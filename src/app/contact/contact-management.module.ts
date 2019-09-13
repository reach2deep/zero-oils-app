import { ContactInquiryComponent } from './contact-inquiry/contact-inquiry.component';
import { ContactListComponent } from './contact-list/contact-list.component';

import { MaterialModule } from './../material.module';


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactManagementRoutingModule } from './Contact-management.routing';


@NgModule({
  imports: [
    ContactManagementRoutingModule,
      CommonModule,
      FormsModule,
      MaterialModule
  ],
  declarations: [ContactListComponent, ContactInquiryComponent]
})
export class ContactManagementModule { }

