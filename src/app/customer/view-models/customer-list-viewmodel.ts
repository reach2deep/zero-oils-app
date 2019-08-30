import { CustomerViewModel } from './customer.viewmodel';

export class CustomerListViewModel {
    public customerName: string;
    public currentPageNumber: number;
    public currentPageIndex: number;
    public pageSize: number;
    public sortDirection: string;
    public sortExpression: string;
    public totalPages: number;
    public totalCustomers: number;
    public customers: Array<CustomerViewModel>;
    public displayedColumns: Array<string>;
    public pageSizeOptions: Array<number>;
}
