import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttackSurfacesAndItsTypesComponent } from './attack-surfaces-and-its-types.component';

describe('AttackSurfacesAndItsTypesComponent', () => {
  let component: AttackSurfacesAndItsTypesComponent;
  let fixture: ComponentFixture<AttackSurfacesAndItsTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttackSurfacesAndItsTypesComponent]
    });
    fixture = TestBed.createComponent(AttackSurfacesAndItsTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
