import { Component } from '@angular/core';
import { Location } from '@angular/common'
import { FirebaseBackendService } from '../firebase-backend.service';
import * as firebase from 'firebase'
import { Router } from '@angular/router'
import * as backend from '../backendClasses'
import { Camera, CameraOptions } from '@ionic-native/camera/ngx'
import { ImagePicker } from '@ionic-native/image-picker/ngx';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage {
  private firebaseService: FirebaseBackendService;
  private user: backend.user = {} as backend.user;

  constructor(private location: Location, private router: Router, private camera: Camera, private imagePicker: ImagePicker) {
    firebase.auth().onAuthStateChanged(async user => {
      if(!user)
        this.router.navigate(["/login"]);
      else
      {
        this.firebaseService = new FirebaseBackendService(firebase.auth().currentUser.uid);
        this.user = await this.firebaseService.getUserData();
      }
    })
  }

  updateProfile()
  {
    this.firebaseService.updateUserData(this.user).then(() => {
      console.log("sucess");
      this.router.navigate(['profile']);
    });
  }
  async takeProfilePicture() {
    this.firebaseService.takeAndUploadProfilePhoto(this.camera).then(url => {
      console.log(url);
    });
  }
  async selectProfilePicture() {
    this.firebaseService.uploadProfilePhoto(this.imagePicker).then(url => {
      console.log(url);
    });
  }
  goBack()
  {
    this.location.back();
  }
}
