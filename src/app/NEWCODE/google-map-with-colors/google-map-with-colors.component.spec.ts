import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleMapWithColorsComponent } from './google-map-with-colors.component';

describe('GoogleMapWithColorsComponent', () => {
  let component: GoogleMapWithColorsComponent;
  let fixture: ComponentFixture<GoogleMapWithColorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GoogleMapWithColorsComponent]
    });
    fixture = TestBed.createComponent(GoogleMapWithColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
