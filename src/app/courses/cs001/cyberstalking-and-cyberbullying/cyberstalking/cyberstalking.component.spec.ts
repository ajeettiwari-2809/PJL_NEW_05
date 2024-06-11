import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CyberstalkingComponent } from './cyberstalking.component';

describe('CyberstalkingComponent', () => {
  let component: CyberstalkingComponent;
  let fixture: ComponentFixture<CyberstalkingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CyberstalkingComponent]
    });
    fixture = TestBed.createComponent(CyberstalkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
