import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCustomLayoutComponent } from './app-custom-layout.component';

describe('AppCustomLayoutComponent', () => {
  let component: AppCustomLayoutComponent;
  let fixture: ComponentFixture<AppCustomLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppCustomLayoutComponent],
    });
    fixture = TestBed.createComponent(AppCustomLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
