import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationSecurityAndCiaTriadComponent } from './information-security-and-cia-triad.component';

describe('InformationSecurityAndCiaTriadComponent', () => {
  let component: InformationSecurityAndCiaTriadComponent;
  let fixture: ComponentFixture<InformationSecurityAndCiaTriadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InformationSecurityAndCiaTriadComponent]
    });
    fixture = TestBed.createComponent(InformationSecurityAndCiaTriadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
