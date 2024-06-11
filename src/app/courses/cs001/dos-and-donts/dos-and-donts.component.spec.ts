import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DosAndDontsComponent } from './dos-and-donts.component';

describe('DosAndDontsComponent', () => {
  let component: DosAndDontsComponent;
  let fixture: ComponentFixture<DosAndDontsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DosAndDontsComponent]
    });
    fixture = TestBed.createComponent(DosAndDontsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
