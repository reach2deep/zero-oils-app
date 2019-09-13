import { ContactViewModel } from './contact.viewmodel';
import { ResponseModel } from './../../shared-models/response.model';


export class ContactListViewModelResponse extends ResponseModel  {
    public entity: Array<ContactViewModel>;
}
