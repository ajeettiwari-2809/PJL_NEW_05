import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CyberThreatComponent } from './cyber-threat.component';

describe('CyberThreatComponent', () => {
  let component: CyberThreatComponent;
  let fixture: ComponentFixture<CyberThreatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CyberThreatComponent]
    });
    fixture = TestBed.createComponent(CyberThreatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
