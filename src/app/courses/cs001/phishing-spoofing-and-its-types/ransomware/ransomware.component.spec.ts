import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RansomwareComponent } from './ransomware.component';

describe('RansomwareComponent', () => {
  let component: RansomwareComponent;
  let fixture: ComponentFixture<RansomwareComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RansomwareComponent]
    });
    fixture = TestBed.createComponent(RansomwareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
