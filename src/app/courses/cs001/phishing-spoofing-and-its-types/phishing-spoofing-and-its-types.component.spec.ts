import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhishingSpoofingAndItsTypesComponent } from './phishing-spoofing-and-its-types.component';

describe('PhishingSpoofingAndItsTypesComponent', () => {
  let component: PhishingSpoofingAndItsTypesComponent;
  let fixture: ComponentFixture<PhishingSpoofingAndItsTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhishingSpoofingAndItsTypesComponent]
    });
    fixture = TestBed.createComponent(PhishingSpoofingAndItsTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
