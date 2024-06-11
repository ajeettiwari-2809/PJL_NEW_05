import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttacksOnWirelessEnvironmentComponent } from './attacks-on-wireless-environment.component';

describe('AttacksOnWirelessEnvironmentComponent', () => {
  let component: AttacksOnWirelessEnvironmentComponent;
  let fixture: ComponentFixture<AttacksOnWirelessEnvironmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttacksOnWirelessEnvironmentComponent]
    });
    fixture = TestBed.createComponent(AttacksOnWirelessEnvironmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
