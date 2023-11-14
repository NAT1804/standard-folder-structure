/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CrudBusiCusDetailFileDialogComponent } from './crud-busi-cus-detail-file-dialog.component';

describe('CrudBusiCusDetailFileDialogComponent', () => {
  let component: CrudBusiCusDetailFileDialogComponent;
  let fixture: ComponentFixture<CrudBusiCusDetailFileDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CrudBusiCusDetailFileDialogComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudBusiCusDetailFileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
