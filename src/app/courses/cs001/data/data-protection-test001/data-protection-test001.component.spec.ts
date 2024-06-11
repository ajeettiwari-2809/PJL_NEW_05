import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataProtectionTest001Component } from './data-protection-test001.component';

describe('DataProtectionTest001Component', () => {
  let component: DataProtectionTest001Component;
  let fixture: ComponentFixture<DataProtectionTest001Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataProtectionTest001Component]
    });
    fixture = TestBed.createComponent(DataProtectionTest001Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
