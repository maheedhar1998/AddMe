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

export class social {
  private type : string;
  private profile : string;
  private socialAccounts : socialAccount[];

  constructor(tempType: string, tempProfile: string, tempSocialAccount: socialAccount[]) {
    this.type = tempType;
    this.profile = tempProfile;
    this.socialAccounts = tempSocialAccount;
  }

  public get getType(): string {
    return this.type;
  }

  public set setType(value: string) {
    this.type = value;
  }

  public get getProfile(): string {
    return this.profile;
  }

  public set setProfile(value: string) {
    this.profile = value;
  }

  public get getSocialAccount(): socialAccount[] { 
    return this.socialAccounts;
  }
  // TODO : Appending and deleting socialAccounts

}
export class socialAccount {
  private id : string;
  private user: string;
  private url: string;

  constructor(tempId: string, tempUser: string, tempUrl: string) {
    this.id = tempId;
    this.url = tempUrl;
    this.user = tempUser;
  }

  public get getId(): string {
    return this.id;
  }

  public set setId(value: string) {
    this.id = value;
  }

  public get getUrl(): string {
    return this.url;
  }

  public set setUrl(value: string) {
    this.url = value;
  }

  public get getUser(): string {
    return this.user;
  }

  public set setUser(value: string) {
    this.user = value;
  }
}


