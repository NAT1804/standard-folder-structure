/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IndividualCustomerDetailBankComponent } from './individual-customer-detail-bank.component';

describe('IndividualCustomerDetailBankComponent', () => {
  let component: IndividualCustomerDetailBankComponent;
  let fixture: ComponentFixture<IndividualCustomerDetailBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IndividualCustomerDetailBankComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualCustomerDetailBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
