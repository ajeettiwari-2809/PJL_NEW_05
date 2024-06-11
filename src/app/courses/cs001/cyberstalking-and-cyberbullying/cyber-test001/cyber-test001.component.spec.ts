import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CyberTest001Component } from './cyber-test001.component';

describe('CyberTest001Component', () => {
  let component: CyberTest001Component;
  let fixture: ComponentFixture<CyberTest001Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CyberTest001Component]
    });
    fixture = TestBed.createComponent(CyberTest001Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
