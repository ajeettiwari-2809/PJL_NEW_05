import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DnsAttacksComponent } from './dns-attacks.component';

describe('DnsAttacksComponent', () => {
  let component: DnsAttacksComponent;
  let fixture: ComponentFixture<DnsAttacksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DnsAttacksComponent]
    });
    fixture = TestBed.createComponent(DnsAttacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
