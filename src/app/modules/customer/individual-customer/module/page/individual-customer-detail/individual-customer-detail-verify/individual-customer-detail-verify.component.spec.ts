/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IndividualCustomerDetailVerifyComponent } from './individual-customer-detail-verify.component';

describe('IndividualCustomerDetailVerifyComponent', () => {
  let component: IndividualCustomerDetailVerifyComponent;
  let fixture: ComponentFixture<IndividualCustomerDetailVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IndividualCustomerDetailVerifyComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualCustomerDetailVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
