import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router'
@Injectable({
  providedIn: 'root'
})
export class FirebaseBackendService {
  private uid: string;
  private route: Router;
  constructor(uId: string) {
    this.uid = uId;
  }

  loginWithEmail(email: string, password: string) {
    var s = this;
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      return true;
    }).catch((err) => {
      alert("The Email or Password is incorrect.");
      return false;
    });
  }

  signupWithEmail() {
    var s = this;
    
  }
}
