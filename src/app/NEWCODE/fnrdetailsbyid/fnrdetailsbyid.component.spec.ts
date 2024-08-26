import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FNRDETAILSBYIDComponent } from './fnrdetailsbyid.component';

describe('FNRDETAILSBYIDComponent', () => {
  let component: FNRDETAILSBYIDComponent;
  let fixture: ComponentFixture<FNRDETAILSBYIDComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FNRDETAILSBYIDComponent]
    });
    fixture = TestBed.createComponent(FNRDETAILSBYIDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
