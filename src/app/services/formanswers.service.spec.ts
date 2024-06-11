import { TestBed } from '@angular/core/testing';

import { FormanswersService } from './formanswers.service';

describe('FormanswersService', () => {
  let service: FormanswersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormanswersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
