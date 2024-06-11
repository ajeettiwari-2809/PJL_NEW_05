import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopSecurityComponent } from './desktop-security.component';

describe('DesktopSecurityComponent', () => {
  let component: DesktopSecurityComponent;
  let fixture: ComponentFixture<DesktopSecurityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DesktopSecurityComponent]
    });
    fixture = TestBed.createComponent(DesktopSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
