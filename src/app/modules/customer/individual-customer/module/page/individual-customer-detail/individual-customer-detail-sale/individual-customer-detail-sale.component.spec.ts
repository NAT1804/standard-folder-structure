/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IndividualCustomerDetailSaleComponent } from './individual-customer-detail-sale.component';

describe('IndividualCustomerDetailSaleComponent', () => {
  let component: IndividualCustomerDetailSaleComponent;
  let fixture: ComponentFixture<IndividualCustomerDetailSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IndividualCustomerDetailSaleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualCustomerDetailSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
