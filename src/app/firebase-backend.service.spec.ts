import { TestBed } from '@angular/core/testing';
import { FirebaseBackendService } from './firebase-backend.service';
import testCredentials from '../../firebaseTestCredentials'
import * as firebase from 'firebase';
import firebaseConfig from '../../firebaseConfig'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


describe('FirebaseBackendService', () => {
  let service: FirebaseBackendService = new FirebaseBackendService(testCredentials.genUid);
  firebase.initializeApp(firebaseConfig);
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [],
    providers: [FirebaseBackendService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  }).compileComponents());

  it('should log in using valid credentials', async () => {
    await service.loginWithEmail(testCredentials.validUser.email, testCredentials.validUser.password).catch(err => {
      console.log("Invalid Credentials");
    });
    firebase.auth().onAuthStateChanged(genUser => {
      console.log(genUser);
      expect(genUser).toBeDefined();
    });
  })

  it('should not log in with invalid credentials', async () => {
    await service.loginWithEmail(testCredentials.invalidUser.email, testCredentials.invalidUser.password).then(usr => {
      fail();
    }).catch(err => {
      console.log("Invalid Credentials");
      expect(true).toBeTruthy();
    });
  })
});
