import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SqlInjectionComponent } from './sql-injection.component';

describe('SqlInjectionComponent', () => {
  let component: SqlInjectionComponent;
  let fixture: ComponentFixture<SqlInjectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SqlInjectionComponent]
    });
    fixture = TestBed.createComponent(SqlInjectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
