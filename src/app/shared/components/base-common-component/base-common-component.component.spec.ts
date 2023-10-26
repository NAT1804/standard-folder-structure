/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BaseCommonComponentComponent } from './base-common-component.component';

describe('BaseCommonComponentComponent', () => {
  let component: BaseCommonComponentComponent;
  let fixture: ComponentFixture<BaseCommonComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BaseCommonComponentComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseCommonComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
