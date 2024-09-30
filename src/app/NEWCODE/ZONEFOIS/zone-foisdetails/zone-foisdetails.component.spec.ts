import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneFOISDetailsComponent } from './zone-foisdetails.component';

describe('ZoneFOISDetailsComponent', () => {
  let component: ZoneFOISDetailsComponent;
  let fixture: ComponentFixture<ZoneFOISDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ZoneFOISDetailsComponent]
    });
    fixture = TestBed.createComponent(ZoneFOISDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
