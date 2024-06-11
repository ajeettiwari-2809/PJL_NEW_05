import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenanComponent } from './sidenan.component';

describe('SidenanComponent', () => {
  let component: SidenanComponent;
  let fixture: ComponentFixture<SidenanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidenanComponent]
    });
    fixture = TestBed.createComponent(SidenanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
