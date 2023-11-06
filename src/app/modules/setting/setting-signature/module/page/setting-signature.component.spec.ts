/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SettingSignatureComponent } from './setting-signature.component';

describe('SettingSignatureComponent', () => {
  let component: SettingSignatureComponent;
  let fixture: ComponentFixture<SettingSignatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingSignatureComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingSignatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
