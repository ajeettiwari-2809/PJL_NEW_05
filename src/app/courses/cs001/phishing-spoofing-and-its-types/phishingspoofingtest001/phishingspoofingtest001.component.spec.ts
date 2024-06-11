import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Phishingspoofingtest001Component } from './phishingspoofingtest001.component';

describe('Phishingspoofingtest001Component', () => {
  let component: Phishingspoofingtest001Component;
  let fixture: ComponentFixture<Phishingspoofingtest001Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Phishingspoofingtest001Component]
    });
    fixture = TestBed.createComponent(Phishingspoofingtest001Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
