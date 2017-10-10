/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ThemesLoaderService } from './themesLoader.service';

describe('Service: ThemesLoader', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThemesLoaderService]
    });
  });

  it('should ...', inject([ThemesLoaderService], (service: ThemesLoaderService) => {
    expect(service).toBeTruthy();
  }));
});