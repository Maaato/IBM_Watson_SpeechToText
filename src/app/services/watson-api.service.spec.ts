import { TestBed } from '@angular/core/testing';

import { WatsonAPIService } from './watson-api.service';

describe('WatsonAPIService', () => {
  let service: WatsonAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WatsonAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
