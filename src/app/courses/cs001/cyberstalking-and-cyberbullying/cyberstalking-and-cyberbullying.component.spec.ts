import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CyberstalkingAndCyberbullyingComponent } from './cyberstalking-and-cyberbullying.component';

describe('CyberstalkingAndCyberbullyingComponent', () => {
  let component: CyberstalkingAndCyberbullyingComponent;
  let fixture: ComponentFixture<CyberstalkingAndCyberbullyingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CyberstalkingAndCyberbullyingComponent]
    });
    fixture = TestBed.createComponent(CyberstalkingAndCyberbullyingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
