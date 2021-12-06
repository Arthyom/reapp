import { TestBed } from '@angular/core/testing';

import { PasschangeService } from './passchange.service';

describe('PasschangeService', () => {
  let service: PasschangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasschangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
