import { TestBed } from '@angular/core/testing';
import { BackendCameraService } from './backend-camera.service';
import { Router } from '@angular/router'
describe('BackendCameraService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate'])}
      ]
    })
  });

  it('should create', () => {
    const service: BackendCameraService = TestBed.get(BackendCameraService);
    expect(service).toBeTruthy();
  });
});
