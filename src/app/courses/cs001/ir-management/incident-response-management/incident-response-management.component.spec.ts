import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentResponseManagementComponent } from './incident-response-management.component';

describe('IncidentResponseManagementComponent', () => {
  let component: IncidentResponseManagementComponent;
  let fixture: ComponentFixture<IncidentResponseManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IncidentResponseManagementComponent]
    });
    fixture = TestBed.createComponent(IncidentResponseManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
