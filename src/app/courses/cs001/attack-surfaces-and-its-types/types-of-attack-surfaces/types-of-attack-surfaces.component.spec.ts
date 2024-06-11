import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesOfAttackSurfacesComponent } from './types-of-attack-surfaces.component';

describe('TypesOfAttackSurfacesComponent', () => {
  let component: TypesOfAttackSurfacesComponent;
  let fixture: ComponentFixture<TypesOfAttackSurfacesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypesOfAttackSurfacesComponent]
    });
    fixture = TestBed.createComponent(TypesOfAttackSurfacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
