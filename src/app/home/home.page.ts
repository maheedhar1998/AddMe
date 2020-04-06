import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseBackendService } from '../firebase-backend.service';
import * as firebase from 'firebase';
import { ThrowStmt } from '@angular/compiler';
import { ContactOptionsPage } from '../contact-options/contact-options.page';
import { AlertController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import * as backend from '../backendClasses';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private firebase: FirebaseBackendService;
  private qrData: string;
  private profile: backend.user = new backend.user(null,null,null,null,null,null,null,null,null,null);
  constructor(private router: Router, private popOver: PopoverController, public alertController: AlertController) {
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(!firebaseUser)
      {
        this.router.navigate(['login']);
      }
      else
      {
        this.firebase =  new FirebaseBackendService(firebase.auth().currentUser.uid);
        this.firebase.getUserData().then(dat => {
          this.profile = dat;
          this.qrData = JSON.stringify(this.profile.getQrCodes).substr(0,100);
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

  async openPopover(ev: any, contact: backend.contact) {
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

    });
  }
}
