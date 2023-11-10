/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CrudIndiCusDetailBankDialogComponent } from './crud-indi-cus-detail-bank-dialog.component';

describe('CrudIndiCusDetailBankDialogComponent', () => {
  let component: CrudIndiCusDetailBankDialogComponent;
  let fixture: ComponentFixture<CrudIndiCusDetailBankDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CrudIndiCusDetailBankDialogComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudIndiCusDetailBankDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
