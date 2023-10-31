/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ApproveBusinessCustomerComponent } from './approve-business-customer.component';

describe('ApproveBusinessCustomerComponent', () => {
  let component: ApproveBusinessCustomerComponent;
  let fixture: ComponentFixture<ApproveBusinessCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApproveBusinessCustomerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveBusinessCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
