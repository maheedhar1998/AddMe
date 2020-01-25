import { TestBed } from '@angular/core/testing';
import * as firebase from 'firebase';
import { FirebaseBackendService } from './firebase-backend.service';
import testCredentials from '../../firebaseTestCredentials'
import * as firebase from 'firebase';

const service: FirebaseBackendService = TestBed.get(FirebaseBackendService);

describe('FirebaseBackendService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log in using valid credentials', async () => {
    await service.loginWithEmail(testCredentials.validUser.email, testCredentials.validUser.password).catch(err => { fail() })
  })
});
