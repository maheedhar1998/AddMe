import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseBackendService } from '../firebase-backend.service';
import * as firebase from 'firebase';
import { ThrowStmt } from '@angular/compiler';
import { AlertController } from '@ionic/angular';
import * as backend from '../backendClasses';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private firebase: FirebaseBackendService;
  private qrData: string;
  private searchKeyword: string;
  private filteredContacts: {} [];
  private profile: backend.user = new backend.user(null,null,null,null,null,null,null,null,null,null, false);
  constructor(private router: Router, private alertController: AlertController, private camera: Camera, private imagePicker: ImagePicker) {
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(!firebaseUser)
      {
        this.router.navigate(['login']);
      }
      else
      {
        this.firebase = new FirebaseBackendService(firebase.auth().currentUser.uid);
        this.firebase.getUserData().then(dat => {
          this.profile = dat;
          this.qrData = JSON.stringify(this.profile.getQrCodes).substr(0,100);
          if (this.profile.getFirst) {
            console.log('profile');
            this.presentAlert();
          }
          console.log(dat);
          this.searchKeyword = "";
        });
      }
    });
  }

  deleteContact(cont: backend.contact) {
    // console.log(cont);
    this.firebase.deleteFromUserContacts(cont);
  }

  goToUserContact( cont: backend.contact ) {
    this.router.navigate(['user-contact', {contact: JSON.stringify(cont)}]);
  }

  goToCamera() {
    this.router.navigate(['camera']);
  }

  goToQRCode() {
    this.router.navigate(['qrcode']);
  }

  goToSettings() {
    this.router.navigate(['settings']);
  }

  goToProfile() {
    this.router.navigate(['profile']);
  }

  async logOut() {
    const alert = await this.alertController.create({
      header: 'Log Out??',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.firebase.logOut();
            this.router.navigate(['login']);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log("dismiss logout");
          }
        }
      ]
    });
    await alert.present();
  }

  async presentAlert() {
    const alert =  await this.alertController.create({
      message: 'Welcome to Connekt.\nClick the camera button to upload a profile picture.',
      buttons: [
        {
          text: 'Maybe Later',
          handler: () => {
            this.firebase.toggleFirst();
          },
          role: 'cancel'
        },
        {
          text: 'Camera',
          handler: () => {
            this.takeProfilePicture();
          }
        },
        {
          text: 'Photos',
          handler: () => {
            this.selectProfilePicture();
          }
        }
      ],
    });
    alert.present();
  }
  async filterContacts(ev: any) {
    this.filteredContacts = [];
    let contacts = this.profile.getContacts;
    for(let i:number = 0; i<contacts.length; i++) {
      console.log(contacts[i])
      if(contacts[i]['name'].match(new RegExp(this.searchKeyword, 'i'))) {
        this.filteredContacts.push(contacts[i]);
      }
    }
    
   }
  swipe(ev: any) {
    this.router.navigate(['profile']);
  }
  async takeProfilePicture() {
    this.firebase.takeAndUploadProfilePhoto(this.camera).then(url => {
      console.log(url);
    });
  }
  async selectProfilePicture() {
    this.firebase.uploadProfilePhoto(this.imagePicker).then(url => {
      console.log(url);
    });
  }
}
