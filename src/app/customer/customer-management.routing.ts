import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';

const CustomerManagementRoutes: Routes = [
    { path: 'list', component: CustomerListComponent },
    { path: 'customer', component: CustomerDetailComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(CustomerManagementRoutes)
    ],
    exports: [RouterModule]
})
export class CustomerManagementRoutingModule { }
