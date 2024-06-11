import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CyberRiskComponent } from './cyber-risk.component';

describe('CyberRiskComponent', () => {
  let component: CyberRiskComponent;
  let fixture: ComponentFixture<CyberRiskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CyberRiskComponent]
    });
    fixture = TestBed.createComponent(CyberRiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
