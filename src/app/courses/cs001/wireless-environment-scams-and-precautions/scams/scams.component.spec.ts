import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScamsComponent } from './scams.component';

describe('ScamsComponent', () => {
  let component: ScamsComponent;
  let fixture: ComponentFixture<ScamsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScamsComponent]
    });
    fixture = TestBed.createComponent(ScamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
