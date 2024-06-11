import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DosAndDontsTest001Component } from './dos-and-donts-test001.component';

describe('DosAndDontsTest001Component', () => {
  let component: DosAndDontsTest001Component;
  let fixture: ComponentFixture<DosAndDontsTest001Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DosAndDontsTest001Component]
    });
    fixture = TestBed.createComponent(DosAndDontsTest001Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
