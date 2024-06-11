import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticesToFollowComponent } from './practices-to-follow.component';

describe('PracticesToFollowComponent', () => {
  let component: PracticesToFollowComponent;
  let fixture: ComponentFixture<PracticesToFollowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PracticesToFollowComponent]
    });
    fixture = TestBed.createComponent(PracticesToFollowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
