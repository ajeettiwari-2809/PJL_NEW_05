import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HackersGenerallyTargetComponent } from './hackers-generally-target.component';

describe('HackersGenerallyTargetComponent', () => {
  let component: HackersGenerallyTargetComponent;
  let fixture: ComponentFixture<HackersGenerallyTargetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HackersGenerallyTargetComponent]
    });
    fixture = TestBed.createComponent(HackersGenerallyTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
