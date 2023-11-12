/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CrudIndiCusDetailSaleDialogComponent } from './crud-indi-cus-detail-sale-dialog.component';

describe('CrudIndiCusDetailSaleDialogComponent', () => {
  let component: CrudIndiCusDetailSaleDialogComponent;
  let fixture: ComponentFixture<CrudIndiCusDetailSaleDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CrudIndiCusDetailSaleDialogComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudIndiCusDetailSaleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
