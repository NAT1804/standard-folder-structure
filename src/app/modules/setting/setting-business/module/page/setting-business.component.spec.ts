/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SettingBusinessComponent } from './setting-business.component';

describe('SettingBusinessComponent', () => {
  let component: SettingBusinessComponent;
  let fixture: ComponentFixture<SettingBusinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingBusinessComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
