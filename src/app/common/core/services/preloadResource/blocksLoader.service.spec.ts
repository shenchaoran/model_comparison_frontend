/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BlocksLoaderService } from './blocksLoader.service';

describe('Service: BlocksLoader', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlocksLoaderService]
    });
  });

  it('should ...', inject([BlocksLoaderService], (service: BlocksLoaderService) => {
    expect(service).toBeTruthy();
  }));
});
