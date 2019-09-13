import { TestBed } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { ContactListComponent } from './contact-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';


describe('ContactListComponent', () => {

  let fixture: ComponentFixture<ContactListComponent>;
  let component: ContactListComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [ContactListComponent]
    });

    fixture = TestBed.createComponent(ContactListComponent);
    component = fixture.componentInstance;

  });

  it('should be able to create component instance', () => {
    expect(component).toBeDefined();
  });

});
