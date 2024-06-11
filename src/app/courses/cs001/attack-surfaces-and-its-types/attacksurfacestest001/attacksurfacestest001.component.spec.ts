import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Attacksurfacestest001Component } from './attacksurfacestest001.component';

describe('Attacksurfacestest001Component', () => {
  let component: Attacksurfacestest001Component;
  let fixture: ComponentFixture<Attacksurfacestest001Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Attacksurfacestest001Component]
    });
    fixture = TestBed.createComponent(Attacksurfacestest001Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
