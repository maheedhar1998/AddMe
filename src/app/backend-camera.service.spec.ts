import { TestBed } from '@angular/core/testing';

import { BackendCameraService } from './backend-camera.service';

describe('BackendCameraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BackendCameraService = TestBed.get(BackendCameraService);
    expect(service).toBeTruthy();
  });
});
