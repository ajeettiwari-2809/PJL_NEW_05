import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsactTest001Component } from './isact-test001.component';

describe('IsactTest001Component', () => {
  let component: IsactTest001Component;
  let fixture: ComponentFixture<IsactTest001Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IsactTest001Component]
    });
    fixture = TestBed.createComponent(IsactTest001Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
