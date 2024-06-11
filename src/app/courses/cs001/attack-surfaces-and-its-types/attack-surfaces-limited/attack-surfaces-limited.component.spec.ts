import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttackSurfacesLimitedComponent } from './attack-surfaces-limited.component';

describe('AttackSurfacesLimitedComponent', () => {
  let component: AttackSurfacesLimitedComponent;
  let fixture: ComponentFixture<AttackSurfacesLimitedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttackSurfacesLimitedComponent]
    });
    fixture = TestBed.createComponent(AttackSurfacesLimitedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
