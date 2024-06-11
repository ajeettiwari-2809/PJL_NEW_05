import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WifiSecurityComponent } from './wifi-security.component';

describe('WifiSecurityComponent', () => {
  let component: WifiSecurityComponent;
  let fixture: ComponentFixture<WifiSecurityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WifiSecurityComponent]
    });
    fixture = TestBed.createComponent(WifiSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
