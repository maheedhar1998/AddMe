import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

let storageSpy

describe('ThemeService', () => {
  let service: ThemeService
  beforeEach(async () => 
  {
    storageSpy = jasmine.createSpyObj('Storage', [])
    service = new ThemeService(storageSpy)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
