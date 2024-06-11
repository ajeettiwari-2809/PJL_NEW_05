import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttackSurfacesComponent } from './attack-surfaces.component';

describe('AttackSurfacesComponent', () => {
  let component: AttackSurfacesComponent;
  let fixture: ComponentFixture<AttackSurfacesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttackSurfacesComponent]
    });
    fixture = TestBed.createComponent(AttackSurfacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
