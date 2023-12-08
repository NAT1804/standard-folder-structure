/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormListBoxComponent } from './form-list-box.component';

describe('FormListBoxComponent', () => {
  let component: FormListBoxComponent;
  let fixture: ComponentFixture<FormListBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormListBoxComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormListBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
