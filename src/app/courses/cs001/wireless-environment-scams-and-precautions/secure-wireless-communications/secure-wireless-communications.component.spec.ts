import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecureWirelessCommunicationsComponent } from './secure-wireless-communications.component';

describe('SecureWirelessCommunicationsComponent', () => {
  let component: SecureWirelessCommunicationsComponent;
  let fixture: ComponentFixture<SecureWirelessCommunicationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecureWirelessCommunicationsComponent]
    });
    fixture = TestBed.createComponent(SecureWirelessCommunicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
