import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataProtectionMeasuresComponent } from './data-protection-measures.component';

describe('DataProtectionMeasuresComponent', () => {
  let component: DataProtectionMeasuresComponent;
  let fixture: ComponentFixture<DataProtectionMeasuresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataProtectionMeasuresComponent]
    });
    fixture = TestBed.createComponent(DataProtectionMeasuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
