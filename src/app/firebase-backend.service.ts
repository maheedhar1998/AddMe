import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router'
import * as backend from './backendClasses';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { BackendCameraService } from './backend-camera.service'
import { ImagePicker, ImagePickerOptions, OutputType } from '@ionic-native/image-picker/ngx';

@Injectable({
  providedIn: 'root'
})
export class FirebaseBackendService {
  private uid: string;
  private cam: BackendCameraService;
  constructor(uId: string) {
    this.uid = uId;
    this.cam = new BackendCameraService();
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
    var user: backend.user = new backend.user(this.uid, name_user, username_user, email_user, phoneNumber_user, dateOfBirth, photo_user, null, null, [new backend.qrCode(null, new backend.contact(null,username_user,name_user,email_user,phoneNumber_user,dateOfBirth,photo_user,null))],true);
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
      userProfile = new backend.user(val.uid, val.name, val.username, val.email, val.phoneNumber, val.DOB, val.photo, val.socials, val.contacts, val.qrCodes,val.first);
    });
    return userProfile;
  }
  // adding user contact list with new contact
  async addToUserContacts(cont: backend.contact) {
    var userContacts: backend.contact [];
    await this.getUserData().then(usr => {
      userContacts = usr.getContacts;
      if(!userContacts) {
        userContacts = [];
      }
      userContacts.push(cont);
      var updates = {};
      updates['Users/'+this.uid+'/contacts'] = userContacts;
      firebase.database().ref().update(updates);
    });
  }
  // deletion from user contact list
  async deleteFromUserContacts(cont: backend.contact) {
    console.log(cont);
    var userContacts: {} [];
    await this.getUserData().then(usr => {
      userContacts = usr.getContacts;
      for(let i: number = 0; i < userContacts.length; i++){
        console.log(userContacts);
        console.log(cont);
        if(userContacts[i]['id'] == cont['id'] && userContacts[i]['name'] == cont['name'] && userContacts[i]['username'] == cont['username'] && userContacts[i]['email'] == cont['email']
            && userContacts[i]['phoneNumber'] == cont['phoneNumber'] && userContacts[i]['DOB'] == cont['DOB'] && userContacts[i]['photo'] == cont['photo'])
        {
          console.log(userContacts);
          userContacts.splice(i,1);
          break;
        }
      }
      var updates = {};
      updates['Users/'+this.uid+'/contacts'] = userContacts;
      firebase.database().ref().update(updates);
    });
  }
  // Updating user contact
  async updateUsersContact(old: backend.contact, saerowon: backend.contact) {
    var userContacts: {}[] = [];
    await this.getUserData().then(usr => {
      userContacts = usr.getContacts;
      for(let i: number = 0; i<userContacts.length; i++) {
        if(userContacts[i]['id'] == old['id'] && userContacts[i]['name'] == old['name'] && userContacts[i]['username'] == old[i]['username'] && userContacts[i]['email'] == old['email']
            && userContacts[i]['phoneNumber'] == old['phoneNumber'] && userContacts[i]['DOB'] == old['DOB'] && userContacts[i]['photo'] == old['photo'])
        {
          userContacts[i] = saerowon;
          break;
        }
      }
      var updates: {} = {};
      updates['Users/'+this.uid+'/contacts'] = userContacts;
      firebase.database().ref().update(updates);
    });
  }
  // Adding user socialAccount
  // typ the stringed version of which social media
  async addSocialAccount(typ: string, newAccount: backend.socialAccount) {
    var userSocials: {} [];
    await this.getUserData().then(usr => {
      userSocials = usr.getSocials;
      let found: boolean = false;
      for(let i:number=0; i<userSocials.length && !found; i++) {
        if(userSocials[i]['type'] == typ && userSocials[i]['socialAccounts']) {
          userSocials[i]['socialAccounts'].push(newAccount);
          found = true;
        } else if(userSocials[i]['type'] == typ && !userSocials[i]['socialAccounts']) {
          userSocials[i]['socialAccounts'] = [];
          userSocials[i]['socialAccounts'].push(newAccount);
          found = true;
        }
      }
      if(!found) {
        userSocials.push(new backend.social(typ, null, [newAccount]));
      }
      var updates = {};
      updates['Users/'+this.uid+'/socials'] = userSocials;
      firebase.database().ref().update(updates);
    });
  }
  // delete social account
  async deleteSocialAccount(typ: string, sAcot: backend.socialAccount) {
    var userSocialAccounts: {} [];
    var userSocials: {} [] = [];
    await this.getUserData().then(usr => {
      userSocials = usr.getSocials;
      let i:number = 0;
      for(; i < userSocials.length; i++){
        if(userSocials[i]['type'] == typ){
          break;
        }
      }
      this.getSocialAccountsType(typ).then(dat => {
        userSocialAccounts = dat;
        for(let j:number = 0; j < userSocialAccounts.length; j++){
          console.log(userSocialAccounts[j]);
          if(userSocialAccounts[j]['id'] == sAcot['id'] && userSocialAccounts[j]['user'] == sAcot['user'] && userSocialAccounts[j]['url'] == sAcot['url']){
            userSocialAccounts.splice(j,1);
            break;
          }
        }
        console.log(userSocialAccounts);
        var updates = {};
        userSocials[i]['socialAccounts'] = userSocialAccounts;
        console.log(userSocials);
        updates['Users/'+this.uid+'/socials'] = userSocials;
        firebase.database().ref().update(updates);
      });
    });
  }
  // Update social account
  async updateSocialAccount(typ: string, old: backend.socialAccount, saerowon: backend.socialAccount) {
    var userSocialAccounts: {} [] = [];
    var userSocials: {} [] = [];
    await this.getUserData().then(usr => {
      userSocials = usr.getSocials;
      let i:number = 0;
      for(; i < userSocials.length; i++){
        if(userSocials[i]['type'] == typ){
          break;
        }
      }
      this.getSocialAccountsType(typ).then(dat => {
        userSocialAccounts = dat;
        for(let j: number = 0; j<userSocialAccounts.length; j++) {
          if(userSocialAccounts[j]['id'] == old['id'] && userSocialAccounts[j]['user'] == old['user'] && userSocialAccounts[j]['url'] == old['url']){
            userSocialAccounts[j] = saerowon;
            break;
          }
        }
        var updates = {};
        userSocials[i]['socialAccounts'] = userSocialAccounts;
        // console.log(userSocials[i]);
        updates['Users/'+this.uid+'/socials'] = userSocials;
        firebase.database().ref().update(updates);
      });
    });
  }
  // Getting social accounts of a given type
  async getSocialAccountsType(type: string) : Promise<backend.socialAccount []> {
    // console.log(type)
    var socialAccs: backend.socialAccount[];
    await this.getUserData().then(usr => {
      let found: boolean = false;
      let socials: {}[] = usr.getSocials;
      for(let i: number = 0; i<socials.length && !found; i++) {
        // console.log(socials[i]);
        if(socials[i]['type'] == type) {
          socialAccs = socials[i]['socialAccounts'];
          found = true;
        }
      }
      if(!found){
        socialAccs = [new backend.socialAccount(null,null,null)];
      }
    });
    return socialAccs;
  }
  // Gets a contacts accessible socials
  async getContactAccessSocials(usrName: string): Promise<backend.social []> {
    var qrCodes: {} [] = [];
    var accessSocials: backend.social[] = [];
    await this.getUserData().then(usr => {
      qrCodes = usr.getQrCodes;
      for(let i: number = 0; i<qrCodes.length; i++) {
        if(qrCodes[i]['qContact']['username'] == usrName) {
          accessSocials.push(qrCodes[i]['qContact']['accessSocials']);
        }
      }
    });
    return accessSocials;
  }
  // Gets social accounts of a type from a contact
  async getSocialAccountsTypeContact(type: string, usrName: string) : Promise<backend.socialAccount []> {
    // console.log(type)
    var socialAccs: backend.socialAccount[];
    await this.getContactAccessSocials(usrName).then(usr => {
      let found: boolean = false;
      let socials: {} [] = usr;
      for(let i: number = 0; i<socials.length && !found; i++) {
        // console.log(socials[i]);
        if(socials[i]['type'] == type) {
          socialAccs = socials[i]['socialAccounts'];
          found = true;
        }
      }
      if(!found){
        socialAccs = [new backend.socialAccount(null,null,null)];
      }
    });
    return socialAccs;
  }
  // Upload user taken photo to profile and return url
  async takeAndUploadProfilePhoto(camera: Camera): Promise<string> {
    var urlPic: string;
    await this.cam.takeSelfie(camera).then(async profilePic => {
      const name = new Date().getTime().toString();
      await firebase.storage().ref('Profile Pics/'+this.uid+'/'+name).putString(profilePic, 'base64', {contentType: 'image/jpeg'}).then(async urlSnap => {
        await firebase.storage().ref('Profile Pics/'+this.uid+'/'+name).getDownloadURL().then(url => {
          urlPic = url;
        });
      });
    })
    var updates: {} = {};
    updates['Users/'+this.uid+'/photo'] = urlPic;
    updates['Users/'+this.uid+'/first'] = false;
    firebase.database().ref().update(updates);
    return urlPic;
  }
  // Upload user photo to profile and return url
  async uploadProfilePhoto(imagePicker: ImagePicker): Promise<string> {
    var urlPic: string;
    var options: ImagePickerOptions = {
      maximumImagesCount: 1,
      quality: 100,
      outputType: OutputType.DATA_URL
    }
    alert("options");
    const name = new Date().getTime().toString();
    await imagePicker.getPictures(options).then(async result => {
      alert("image recieved");
      await firebase.storage().ref('Profile Pics/'+this.uid+'/'+name).putString('data:text/plain;base64,'+result, 'data_url', {contentType: 'image/jpeg'}).then(async urlSnap => {
        alert('Upload success');
        await firebase.storage().ref('Profile Pics/'+this.uid+'/'+name).getDownloadURL().then(url => {
          urlPic = url;
          alert("url success");
        }).catch(err => {
          alert(err);
        });
      }).catch(err => {
        alert(err);
      });
    });
    var updates: {} = {};
    updates['Users/'+this.uid+'/photo'] = urlPic;
    updates['Users/'+this.uid+'/first'] = false;
    firebase.database().ref().update(updates);
    return urlPic;
  }
  // Toggles the first boolean of a user
  async toggleFirst() {
    var updates: {} = {};
    console.log('toggle');
    await this.getUserData().then(async usr => {
      console.log(usr.getFirst);
      updates['Users/'+this.uid+'/first'] = !usr.getFirst;
      await firebase.database().ref().update(updates);
    });
  }
  // Runs first login cloud function
  async firstTimeLogin(): Promise<{}> {
    var firstLogin = firebase.functions().httpsCallable('firstLogin');
    var ret: {} = {};
    await firstLogin(this.uid).then(val => {
      ret = val;
    });
    return ret;
  }
  // Logs Out
  async logOut() {
    await firebase.auth().signOut().then(res => {
      console.log("Logged Out");
    });
  }
}
