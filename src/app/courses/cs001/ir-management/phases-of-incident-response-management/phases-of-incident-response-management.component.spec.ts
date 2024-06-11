import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhasesOfIncidentResponseManagementComponent } from './phases-of-incident-response-management.component';

describe('PhasesOfIncidentResponseManagementComponent', () => {
  let component: PhasesOfIncidentResponseManagementComponent;
  let fixture: ComponentFixture<PhasesOfIncidentResponseManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhasesOfIncidentResponseManagementComponent]
    });
    fixture = TestBed.createComponent(PhasesOfIncidentResponseManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
