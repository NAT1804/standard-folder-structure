/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CrudBusiCusDetailBankDialogComponent } from './crud-busi-cus-detail-bank-dialog.component';

describe('CrudBusiCusDetailBankDialogComponent', () => {
  let component: CrudBusiCusDetailBankDialogComponent;
  let fixture: ComponentFixture<CrudBusiCusDetailBankDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CrudBusiCusDetailBankDialogComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudBusiCusDetailBankDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
