import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestmspComponent } from './testmsp.component';

describe('TestmspComponent', () => {
  let component: TestmspComponent;
  let fixture: ComponentFixture<TestmspComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestmspComponent]
    });
    fixture = TestBed.createComponent(TestmspComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
