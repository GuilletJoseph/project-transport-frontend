import { TestBed } from '@angular/core/testing';

import { TypevService } from './typev.service';

describe('TypevService', () => {
  let service: TypevService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypevService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
