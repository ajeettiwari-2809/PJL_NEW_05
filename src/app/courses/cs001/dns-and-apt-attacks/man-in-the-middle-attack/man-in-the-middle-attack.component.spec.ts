import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManInTheMiddleAttackComponent } from './man-in-the-middle-attack.component';

describe('ManInTheMiddleAttackComponent', () => {
  let component: ManInTheMiddleAttackComponent;
  let fixture: ComponentFixture<ManInTheMiddleAttackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManInTheMiddleAttackComponent]
    });
    fixture = TestBed.createComponent(ManInTheMiddleAttackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
