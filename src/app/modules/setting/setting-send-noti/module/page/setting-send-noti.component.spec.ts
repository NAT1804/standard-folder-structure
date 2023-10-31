/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SettingSendNotiComponent } from './setting-send-noti.component';

describe('SettingSendNotiComponent', () => {
  let component: SettingSendNotiComponent;
  let fixture: ComponentFixture<SettingSendNotiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingSendNotiComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingSendNotiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
