import { TestBed } from '@angular/core/testing';

import { HomeDashServicesService } from './home-dash-services.service';

describe('HomeDashServicesService', () => {
  let service: HomeDashServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeDashServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
