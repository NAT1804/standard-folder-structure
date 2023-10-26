/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BusinessCustomerComponent } from './business-customer.component';

describe('BusinessCustomerComponent', () => {
  let component: BusinessCustomerComponent;
  let fixture: ComponentFixture<BusinessCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BusinessCustomerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
