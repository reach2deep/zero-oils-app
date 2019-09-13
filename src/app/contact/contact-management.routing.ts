import { ContactInquiryComponent } from './contact-inquiry/contact-inquiry.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const ContactManagementRoutes: Routes = [
    { path: 'list', component: ContactListComponent },
    { path: 'contact-inquiry', component: ContactInquiryComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(ContactManagementRoutes)
    ],
    exports: [RouterModule]
})
export class ContactManagementRoutingModule { }
