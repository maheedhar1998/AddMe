import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router'
import * as backend from './backendClasses';

@Injectable({
  providedIn: 'root'
})
export class FirebaseBackendService {
  private uid: string;
  private route: Router;
  constructor(uId: string) {
    this.uid = uId;
  }

  public loginWithEmail(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  async signupWithEmail(email, password): Promise<firebase.auth.UserCredential> {
    return await firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  // Send users data to firebse and sets in the way desribed by architecture milestone
  public sendUserDataSignUp(name_user: string, username_user: string, email_user: string, phoneNumber_user: string, dateOfBirth: Date, photo_user: string, uid: string ) {
    this.uid = uid;
    var user: backend.user = new backend.user(this.uid, name_user, username_user, email_user, phoneNumber_user, dateOfBirth, photo_user, null, null, null);
    console.log(this.uid);
    console.log(user);
    firebase.database().ref('Users/'+this.uid).set(user).then((res) => {
      console.log("success");
    });
  }
  // Getting user data from firebase
  async getUserData(): Promise<backend.user> {
    var userProfile: backend.user;
    await firebase.database().ref('Users/'+this.uid).once('value', function(snap) {
      var val = snap.val();
      userProfile = new backend.user(val.uid, val.name, val.username, val.email, val.phoneNumber, val.DOB, val.photo, val.socials, val.contacts, val.qrCodes,);
    });
    return userProfile;
  }
  // Updating user contact list with new contact
  async updateUserContacts(cont: backend.contact) {
    var userContacts: backend.contact [];
    await this.getUserData().then(usr => {
      userContacts = usr.getContacts;
      userContacts.push(cont);
      // TODO Update the contact on firebase
      // await firebase.database().ref('Users/'+this.uid).once('value', fucntion())
    });
  }
  async logOut() {
    await firebase.auth().signOut().then(res => {
      console.log("Logged Out");
    });
  }
}
