import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CS001Component } from './cs001.component';

describe('CS001Component', () => {
  let component: CS001Component;
  let fixture: ComponentFixture<CS001Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CS001Component]
    });
    fixture = TestBed.createComponent(CS001Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
