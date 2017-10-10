/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TaskStatusLoaderService } from './taskStatusLoader.service';

describe('Service: TaskStatusLoader', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskStatusLoaderService]
    });
  });

  it('should ...', inject([TaskStatusLoaderService], (service: TaskStatusLoaderService) => {
    expect(service).toBeTruthy();
  }));
});