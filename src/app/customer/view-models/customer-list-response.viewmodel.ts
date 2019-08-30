import { CustomerViewModel } from './customer.viewmodel';
import { ResponseModel } from './../../shared-models/response.model';


export class CustomerListViewModelResponse extends ResponseModel  {
    public entity: Array<CustomerViewModel>;
}
