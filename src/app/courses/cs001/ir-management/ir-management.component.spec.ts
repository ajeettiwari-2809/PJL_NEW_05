import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IRManagementComponent } from './ir-management.component';

describe('IRManagementComponent', () => {
  let component: IRManagementComponent;
  let fixture: ComponentFixture<IRManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IRManagementComponent]
    });
    fixture = TestBed.createComponent(IRManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
