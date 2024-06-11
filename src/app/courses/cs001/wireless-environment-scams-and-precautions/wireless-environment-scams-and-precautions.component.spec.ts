import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WirelessEnvironmentScamsAndPrecautionsComponent } from './wireless-environment-scams-and-precautions.component';

describe('WirelessEnvironmentScamsAndPrecautionsComponent', () => {
  let component: WirelessEnvironmentScamsAndPrecautionsComponent;
  let fixture: ComponentFixture<WirelessEnvironmentScamsAndPrecautionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WirelessEnvironmentScamsAndPrecautionsComponent]
    });
    fixture = TestBed.createComponent(WirelessEnvironmentScamsAndPrecautionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
