import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WirelessEnvironmentTest001Component } from './wireless-environment-test001.component';

describe('WirelessEnvironmentTest001Component', () => {
  let component: WirelessEnvironmentTest001Component;
  let fixture: ComponentFixture<WirelessEnvironmentTest001Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WirelessEnvironmentTest001Component]
    });
    fixture = TestBed.createComponent(WirelessEnvironmentTest001Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
