import { NO_ERRORS_SCHEMA } from "@angular/core";
import { CustomerDetailComponent } from "./customer-detail.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("CustomerDetailComponent", () => {

  let fixture: ComponentFixture<CustomerDetailComponent>;
  let component: CustomerDetailComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [CustomerDetailComponent]
    });

    fixture = TestBed.createComponent(CustomerDetailComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
