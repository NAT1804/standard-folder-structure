/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormSpinnerLoadingComponent } from './form-spinner-loading.component';

describe('FormSpinnerLoadingComponent', () => {
  let component: FormSpinnerLoadingComponent;
  let fixture: ComponentFixture<FormSpinnerLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormSpinnerLoadingComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSpinnerLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
