import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseBackendService } from '../firebase-backend.service';
import * as firebase from 'firebase';
import { ThrowStmt } from '@angular/compiler';
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
  constructor(private router: Router) {
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
          this.qrData = 'https://www.facebook.com/maheedhar1998'//JSON.stringify(this.profile.getQrCodes).substr(0,100);
        });
      }
    });
  }

  goToContacts() {
    this.router.navigate(['contacts']);
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

  logOut() {
    this.firebase.logOut();
    this.router.navigate(['login']);
  }

}
