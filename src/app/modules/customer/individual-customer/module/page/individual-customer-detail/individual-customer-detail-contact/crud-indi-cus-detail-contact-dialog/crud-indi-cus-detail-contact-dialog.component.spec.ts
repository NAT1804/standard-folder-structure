/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CrudIndiCusDetailContactDialogComponent } from './crud-indi-cus-detail-contact-dialog.component';

describe('CrudIndiCusDetailContactDialogComponent', () => {
  let component: CrudIndiCusDetailContactDialogComponent;
  let fixture: ComponentFixture<CrudIndiCusDetailContactDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CrudIndiCusDetailContactDialogComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudIndiCusDetailContactDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
