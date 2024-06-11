import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtectNetworkComponent } from './protect-network.component';

describe('ProtectNetworkComponent', () => {
  let component: ProtectNetworkComponent;
  let fixture: ComponentFixture<ProtectNetworkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProtectNetworkComponent]
    });
    fixture = TestBed.createComponent(ProtectNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
