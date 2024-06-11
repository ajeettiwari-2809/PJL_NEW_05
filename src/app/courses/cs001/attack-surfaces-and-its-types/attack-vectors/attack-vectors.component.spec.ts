import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttackVectorsComponent } from './attack-vectors.component';

describe('AttackVectorsComponent', () => {
  let component: AttackVectorsComponent;
  let fixture: ComponentFixture<AttackVectorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttackVectorsComponent]
    });
    fixture = TestBed.createComponent(AttackVectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
