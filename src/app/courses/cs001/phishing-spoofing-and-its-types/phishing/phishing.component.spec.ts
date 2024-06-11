import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhishingComponent } from './phishing.component';

describe('PhishingComponent', () => {
  let component: PhishingComponent;
  let fixture: ComponentFixture<PhishingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhishingComponent]
    });
    fixture = TestBed.createComponent(PhishingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
