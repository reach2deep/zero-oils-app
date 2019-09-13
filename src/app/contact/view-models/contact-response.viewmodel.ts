
import { ResponseModel } from '../../shared-models/response.model';
import { ContactViewModel } from './contact.viewmodel';

export class ContactViewModelResponse extends ResponseModel  {
    public entity: ContactViewModel;
}

