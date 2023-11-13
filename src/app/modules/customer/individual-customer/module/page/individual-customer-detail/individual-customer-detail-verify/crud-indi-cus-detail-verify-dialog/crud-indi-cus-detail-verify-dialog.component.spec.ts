/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CrudIndiCusDetailVerifyDialogComponent } from './crud-indi-cus-detail-verify-dialog.component';

describe('CrudIndiCusDetailVerifyDialogComponent', () => {
  let component: CrudIndiCusDetailVerifyDialogComponent;
  let fixture: ComponentFixture<CrudIndiCusDetailVerifyDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CrudIndiCusDetailVerifyDialogComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudIndiCusDetailVerifyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
