import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DnsAndAptAttacksComponent } from './dns-and-apt-attacks.component';

describe('DnsAndAptAttacksComponent', () => {
  let component: DnsAndAptAttacksComponent;
  let fixture: ComponentFixture<DnsAndAptAttacksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DnsAndAptAttacksComponent]
    });
    fixture = TestBed.createComponent(DnsAndAptAttacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
