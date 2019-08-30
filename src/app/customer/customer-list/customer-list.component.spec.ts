import { TestBed } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { CustomerListComponent } from './customer-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';


describe('CustomerListComponent', () => {

  let fixture: ComponentFixture<CustomerListComponent>;
  let component: CustomerListComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [CustomerListComponent]
    });

    fixture = TestBed.createComponent(CustomerListComponent);
    component = fixture.componentInstance;

  });

  it('should be able to create component instance', () => {
    expect(component).toBeDefined();
  });

});
