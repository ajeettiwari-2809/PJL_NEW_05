import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AptAttacksComponent } from './apt-attacks.component';

describe('AptAttacksComponent', () => {
  let component: AptAttacksComponent;
  let fixture: ComponentFixture<AptAttacksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AptAttacksComponent]
    });
    fixture = TestBed.createComponent(AptAttacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
