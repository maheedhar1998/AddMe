import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { FirebaseBackendService } from '../firebase-backend.service';
import * as firebase from 'firebase'
import { Router } from '@angular/router'
import * as backend from '../backendClasses'
import { Camera, CameraOptions } from '@ionic-native/camera/ngx'
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { ToastController, Events } from '@ionic/angular'

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {
  private photoUpload: boolean;
  private firebaseService: FirebaseBackendService;
  private user: backend.user = {} as backend.user;

  constructor(private location: Location,
              private router: Router,
              private camera: Camera,
              private imagePicker: ImagePicker,
              private toastController: ToastController,
              private events: Events) {
    firebase.auth().onAuthStateChanged(async user => {
      if(!user)
        this.router.navigate(["/login"]);
      else
      {
        this.photoUpload = false
        this.firebaseService = new FirebaseBackendService(firebase.auth().currentUser.uid);
        this.user = await this.firebaseService.getUserData();
      }
    })
  }

  async ngOnInit()
  {
    firebase.auth().onAuthStateChanged(async user => {
      if(user)
      {
        this.firebaseService = new FirebaseBackendService(firebase.auth().currentUser.uid);
        this.user = await this.firebaseService.getUserData();
      }
    })
  }

  updateProfile()
  {
    this.firebaseService.updateUserData(this.user).then(async () => {
      const toast = await this.toastController.create({
        message: "Profile Information updated",
        duration: 4000,
        color: "success"
      });
      toast.present();
      this.events.publish('update-profile')
      this.router.navigate(['profile']);
    });
  }

  async takeProfilePicture() {
    const self = this
    this.photoUpload = true;
    this.firebaseService.takeAndUploadProfilePhoto(this.camera).then(url => {
      self.user.setPhoto = url
      this.events.publish('update-profile')
    });
    this.photoUpload = false;
  }
  async selectProfilePicture() {
    const self = this
    this.photoUpload = true;
    this.firebaseService.uploadProfilePhoto(this.imagePicker).then(url => {
      self.user.setPhoto = url
      this.events.publish('update-profile')
    });
    this.photoUpload = false;
  }

  goBack()
  {
    this.location.back();
  }
}
