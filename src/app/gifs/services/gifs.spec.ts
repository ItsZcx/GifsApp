import { TestBed } from '@angular/core/testing';

import { GifsServiceTsService } from './gifs.service';

describe('GifsServiceTsService', () => {
  let service: GifsServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GifsServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
