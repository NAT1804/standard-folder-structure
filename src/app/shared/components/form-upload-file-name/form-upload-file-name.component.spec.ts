/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormUploadFileNameComponent } from './form-upload-file-name.component';

describe('FormUploadFileNameComponent', () => {
  let component: FormUploadFileNameComponent;
  let fixture: ComponentFixture<FormUploadFileNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormUploadFileNameComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUploadFileNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
