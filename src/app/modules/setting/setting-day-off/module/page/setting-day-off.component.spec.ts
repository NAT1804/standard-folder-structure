/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SettingDayOffComponent } from './setting-day-off.component';

describe('SettingDayOffComponent', () => {
  let component: SettingDayOffComponent;
  let fixture: ComponentFixture<SettingDayOffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingDayOffComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingDayOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
