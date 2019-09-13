import { ContactViewModel } from './contact.viewmodel';

export class ContactListViewModel {
    public contactName: string;
    public currentPageNumber: number;
    public currentPageIndex: number;
    public pageSize: number;
    public sortDirection: string;
    public sortExpression: string;
    public totalPages: number;
    public totalContacts: number;
    public contacts: Array<ContactViewModel>;
    public displayedColumns: Array<string>;
    public pageSizeOptions: Array<number>;
}
