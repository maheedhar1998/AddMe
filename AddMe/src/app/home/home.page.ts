import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseBackendService } from '../firebase-backend.service';
import * as firebase from 'firebase';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private firebase: FirebaseBackendService;
  constructor(private router: Router) {
    this.firebase = new FirebaseBackendService(firebase.auth().currentUser.uid);
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

  logOut() {
    this.firebase.logOut();
    this.router.navigate(['login']);
  }
}
