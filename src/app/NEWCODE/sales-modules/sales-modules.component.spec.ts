import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesModulesComponent } from './sales-modules.component';

describe('SalesModulesComponent', () => {
  let component: SalesModulesComponent;
  let fixture: ComponentFixture<SalesModulesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalesModulesComponent]
    });
    fixture = TestBed.createComponent(SalesModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
