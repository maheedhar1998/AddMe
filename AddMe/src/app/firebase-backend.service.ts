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

  async signupWithEmail(email, password): Promise<firebase.auth.UserCredential> {
    return await firebase.auth().createUserWithEmailAndPassword(email, password)
  }

  // Send users data to firebse and sets in the way desribed by architecture milestone
  sendUserDataSignUp(name_user: string, username_user: string, email_user: string, phoneNumber_user: string, dateOfBirth: Date, photo_user: string, uid: string ) {
    this.uid = uid;
    var user = {};
    console.log(this.uid);
    user = {
      id : this.uid,
      name: name_user,
      username : username_user,
      email : email_user,
      phoneNumber : phoneNumber_user,
      DOB : dateOfBirth,
      photo : photo_user
    };
    console.log(user);
    firebase.database().ref('Users/'+this.uid).set(user).then((res) => {
      console.log("success");
    });
  }
  // Getting user data from firebase
  async getUserData() {
    var userProfile;
    await firebase.database().ref('Users/'+this.uid).once('value', function(snap) {
      userProfile = {
        uid: snap.val().id,
        name: snap.val().name,
        username: snap.val().username,
        email: snap.val().email,
        phoneNumber: snap.val().phoneNumber
      };
    });
    return userProfile;
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

export class contact {
  private id : string;
  private name: string;
  private username: string;
  private email: string;
  private phoneNumber: string;
  private DOB: Date;
  private photo: string;
  private accessSocial: social[];

  constructor(tempId: string, tempUser: string, tempUrl: string, tempEmail: string, tempPhoneNum: string, tempDate: Date, tempPhoto: string, tempAccessSocial: social[]) {
    this.id = tempId;
    this.name = tempUrl;
    this.username = tempUser;
    this.email = tempEmail;
    this.phoneNumber = tempPhoneNum;
    this.DOB = tempDate;
    this.photo = tempPhoto;
    this.accessSocial = tempAccessSocial;
  }

  public get getId(): string {
    return this.id;
  }

  public set setId(value: string) {
    this.id = value;
  }

  public get getName(): string {
    return this.name;
  }

  public set setName(value: string) {
    this.name = value;
  }

  public get getEmail(): string {
    return this.email;
  }

  public set setEmail(value: string) {
    this.email = value;
  }

  public getPhoneNumber(): string {
    return this.phoneNumber;
  }

  public set setPhoneNumber(value: string) {
    this.phoneNumber = value;
  }

  public get getDOB(): Date {
    return this.DOB;
  }

  public set setDOB(value: Date) {
    this.DOB = value;
  }

  public get getPhoto(): string {
    return this.photo;
  }

  public set setPhoto(value: string) {
    this.photo = value;
  }

  public get getAccessSocial(): social[] {
    return this.accessSocial;
  }

  public set setAccessSocial(value: social[]) {
    this.accessSocial = value;
  }
}

