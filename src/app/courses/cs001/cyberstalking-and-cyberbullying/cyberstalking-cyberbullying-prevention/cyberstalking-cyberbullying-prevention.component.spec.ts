import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CyberstalkingCyberbullyingPreventionComponent } from './cyberstalking-cyberbullying-prevention.component';

describe('CyberstalkingCyberbullyingPreventionComponent', () => {
  let component: CyberstalkingCyberbullyingPreventionComponent;
  let fixture: ComponentFixture<CyberstalkingCyberbullyingPreventionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CyberstalkingCyberbullyingPreventionComponent]
    });
    fixture = TestBed.createComponent(CyberstalkingCyberbullyingPreventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
