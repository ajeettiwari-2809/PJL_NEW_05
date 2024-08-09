import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FNRDETAILSComponent } from './fnrdetails.component';

describe('FNRDETAILSComponent', () => {
  let component: FNRDETAILSComponent;
  let fixture: ComponentFixture<FNRDETAILSComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FNRDETAILSComponent]
    });
    fixture = TestBed.createComponent(FNRDETAILSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
