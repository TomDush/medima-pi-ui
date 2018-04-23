import { TestBed, inject } from '@angular/core/testing';

import { PlayerCtrlService } from './player-ctrl.service';

describe('PlayerCtrlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayerCtrlService]
    });
  });

  it('should be created', inject([PlayerCtrlService], (service: PlayerCtrlService) => {
    expect(service).toBeTruthy();
  }));
});
