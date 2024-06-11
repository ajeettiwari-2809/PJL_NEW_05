import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleOfIncidentResponseManagerComponent } from './role-of-incident-response-manager.component';

describe('RoleOfIncidentResponseManagerComponent', () => {
  let component: RoleOfIncidentResponseManagerComponent;
  let fixture: ComponentFixture<RoleOfIncidentResponseManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoleOfIncidentResponseManagerComponent]
    });
    fixture = TestBed.createComponent(RoleOfIncidentResponseManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
