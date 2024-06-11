import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DntAptTest001Component } from './dnt-apt-test001.component';

describe('DntAptTest001Component', () => {
  let component: DntAptTest001Component;
  let fixture: ComponentFixture<DntAptTest001Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DntAptTest001Component]
    });
    fixture = TestBed.createComponent(DntAptTest001Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
