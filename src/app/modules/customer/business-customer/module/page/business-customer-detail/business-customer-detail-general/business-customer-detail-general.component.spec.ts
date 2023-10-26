/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BusinessCustomerDetailGeneralComponent } from './business-customer-detail-general.component';

describe('BusinessCustomerDetailGeneralComponent', () => {
  let component: BusinessCustomerDetailGeneralComponent;
  let fixture: ComponentFixture<BusinessCustomerDetailGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BusinessCustomerDetailGeneralComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessCustomerDetailGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
