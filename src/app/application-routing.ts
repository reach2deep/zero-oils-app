import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';


export const ApplicationRoutes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    {
        path: 'accountmanagement', loadChildren:
            '../app/account-management/account-management.module#AccountManagementModule'
    },
    {
        path: 'customermanagement', loadChildren:
            '../app/customer/customer-management.module#CustomerManagementModule'
    },
];

