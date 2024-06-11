import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiaTriadComponent } from './cia-triad.component';

describe('CiaTriadComponent', () => {
  let component: CiaTriadComponent;
  let fixture: ComponentFixture<CiaTriadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CiaTriadComponent]
    });
    fixture = TestBed.createComponent(CiaTriadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
