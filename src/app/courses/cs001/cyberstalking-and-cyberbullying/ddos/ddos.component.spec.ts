import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DdosComponent } from './ddos.component';

describe('DdosComponent', () => {
  let component: DdosComponent;
  let fixture: ComponentFixture<DdosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DdosComponent]
    });
    fixture = TestBed.createComponent(DdosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
