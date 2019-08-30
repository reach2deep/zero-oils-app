import { CustomerInquiryComponent } from './customer-inquiry/customer-inquiry.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const CustomerManagementRoutes: Routes = [
    { path: 'list', component: CustomerListComponent },
    { path: 'customer-inquiry', component: CustomerInquiryComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(CustomerManagementRoutes)
    ],
    exports: [RouterModule]
})
export class CustomerManagementRoutingModule { }
