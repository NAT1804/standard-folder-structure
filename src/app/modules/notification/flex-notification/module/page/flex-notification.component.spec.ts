/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FlexNotificationComponent } from './flex-notification.component';

describe('FlexNotificationComponent', () => {
  let component: FlexNotificationComponent;
  let fixture: ComponentFixture<FlexNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FlexNotificationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlexNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
