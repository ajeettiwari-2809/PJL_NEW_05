import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpoofingComponent } from './spoofing.component';

describe('SpoofingComponent', () => {
  let component: SpoofingComponent;
  let fixture: ComponentFixture<SpoofingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpoofingComponent]
    });
    fixture = TestBed.createComponent(SpoofingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
