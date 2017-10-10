/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SiderTabs.service.tService } from './sider-tabs.service.t.service';

describe('Service: SiderTabs.service.t', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SiderTabs.service.tService]
    });
  });

  it('should ...', inject([SiderTabs.service.tService], (service: SiderTabs.service.tService) => {
    expect(service).toBeTruthy();
  }));
});