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
  
   loginWithEmail(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return firebase.auth().signInWithEmailAndPassword(email, password) 
  }

  signupWithEmail(email, password): Promise<firebase.auth.UserCredential> {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
  }

  //
  sendUserDataSignUp(name_user: string, username_user: string, email_user: string, phoneNumber_user: string, dateOfBirth: Date, photo_user: string, uid: string ) {
    this.uid = uid;
    var user = {};
    user[this.uid] = {
      id : this.uid,
      name: name_user,
      username : username_user,
      email : email_user,
      phoneNumber_user : phoneNumber_user,
      DOB : dateOfBirth,
      photo : photo_user
    };

    firebase.database().ref('Users').update(user);
  }
}
