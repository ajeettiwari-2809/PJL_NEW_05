import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IrManagementTest001Component } from './ir-management-test001.component';

describe('IrManagementTest001Component', () => {
  let component: IrManagementTest001Component;
  let fixture: ComponentFixture<IrManagementTest001Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IrManagementTest001Component]
    });
    fixture = TestBed.createComponent(IrManagementTest001Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
