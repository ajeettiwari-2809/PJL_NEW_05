import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DontsComponent } from './donts.component';

describe('DontsComponent', () => {
  let component: DontsComponent;
  let fixture: ComponentFixture<DontsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DontsComponent]
    });
    fixture = TestBed.createComponent(DontsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
