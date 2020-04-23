import { contact } from './../backendClasses';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseBackendService } from '../firebase-backend.service';
import * as firebase from 'firebase';
import { ThrowStmt } from '@angular/compiler';
import { ContactOptionsPage } from '../contact-options/contact-options.page';
import { AlertController } from '@ionic/angular';
import { PopoverController, Events } from '@ionic/angular';
import * as backend from '../backendClasses';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private firebase: FirebaseBackendService;
  private qrData: string;
  private searchKeyword: string;
  private filteredContacts: {} [] = [];
  private editContact: boolean[] = [];
  private data: boolean;
  private profile: backend.user = new backend.user(null,null,null,null,null,null,null,null,null,null, false);
  
  constructor(private router: Router,
              private alertController: AlertController,
              private popOver: PopoverController,
              private camera: Camera,
              private imagePicker: ImagePicker,
              private events: Events) {
    this.data = false;
    const self = this
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(!firebaseUser)
      {
        this.router.navigate(['login']);
      }
      else
      {
        this.firebase = new FirebaseBackendService(firebase.auth().currentUser.uid)
        this.events.subscribe('update-profile', () => {    
          self.firebase =  new FirebaseBackendService(firebase.auth().currentUser.uid);
          self.editContact = [];
          self.firebase.getUserData().then(dat => {
            self.profile = dat;
            self.filteredContacts = this.profile.getContacts;
            for(let i: number = 0; i<this.filteredContacts.length; i++) {
              if(self.filteredContacts[i]['id'] == 'N/A') {
                self.filteredContacts.splice(i,1);
                i--;
              }
              self.editContact.push(false);
            }
            self.qrData = JSON.stringify(this.profile.getQrCodes).substr(0,100);
            self.searchKeyword = "";
            console.log(self.editContact);
            this.data = true;
          })
        });
      }
    });
  }

  ngOnInit()
  {
    this.data = false;
    const self = this
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(!firebaseUser)
      {
        this.router.navigate(['login']);
      } else {
        this.firebase =  new FirebaseBackendService(firebase.auth().currentUser.uid);
        this.editContact = [];
        this.firebase.getUserData().then(dat => {
          self.profile = dat;
          self.filteredContacts = this.profile.getContacts;
          for(let i: number = 0; i<this.filteredContacts.length; i++) {
            if(self.filteredContacts[i]['id'] == 'N/A') {
              self.filteredContacts.splice(i,1);
              i--;
            }
            self.editContact.push(false);
          }
          self.qrData = JSON.stringify(this.profile.getQrCodes).substr(0,100);
          self.searchKeyword = "";
          console.log(self.editContact);
          this.data = true;
        })
      }
    })
  }

  ionViewDidEnter(){
    if (this.profile.getFirst) {
        console.log('profile');
        this.presentAlert();
    }
    this.firebase.getUserData().then(dat => {
      this.profile = dat;
      this.filteredContacts = this.profile.getContacts;
      for(let i: number = 0; i<this.filteredContacts.length; i++) {
            if(this.filteredContacts[i]['id'] == 'N/A') {
              this.filteredContacts.splice(i,1);
              i--;
            }
            this.editContact.push(false);
      }
      this.qrData = JSON.stringify(this.profile.getQrCodes).substr(0,100);
      this.searchKeyword = "";
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
  async openPopover(ev: any, contact: backend.contact, i) {
    const pop = await this.popOver.create({
      component: ContactOptionsPage,
      componentProps: {'contact': contact},
      translucent: true,
      backdropDismiss: true,
      cssClass: 'popover',
      event: ev
    });
    await pop.present();
    pop.onDidDismiss().then(option => {
      console.log(option)
      if(option.data == 'edit') {
        this.editContact[i] = true;
      }
    });
  }
  async saveContact(cont: backend.contact, i) {
    console.log("attempt")
    await this.firebase.getUserData().then(async usr => {
      console.log("usr")
      await this.firebase.updateUsersContact(usr.getContacts[i], cont);
      this.editContact[i] = false;
    });
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
