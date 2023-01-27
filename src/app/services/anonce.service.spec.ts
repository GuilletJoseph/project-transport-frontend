import { TestBed } from '@angular/core/testing';

import { AnonceService } from './anonce.service';

describe('AnonceService', () => {
  let service: AnonceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnonceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
