import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayVediosComponent } from './play-vedios.component';

describe('PlayVediosComponent', () => {
  let component: PlayVediosComponent;
  let fixture: ComponentFixture<PlayVediosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayVediosComponent]
    });
    fixture = TestBed.createComponent(PlayVediosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
