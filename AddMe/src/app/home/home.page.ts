import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseBackendService } from '../firebase-backend.service';
import * as firebase from 'firebase';
import { ThrowStmt } from '@angular/compiler';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private firebase: FirebaseBackendService;
  constructor(private router: Router) {
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(!firebaseUser)
      {
        this.router.navigate(['login']);
      }
      else
      {
        this.firebase = new FirebaseBackendService(firebase.auth().currentUser.uid);
      }
      
    })

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
<<<<<<< HEAD

  goToSettings() {
    this.router.navigate(['settings']);
  }

=======
  goToProfile() {
    this.router.navigate(['profile']);
  }
>>>>>>> b1681b909995ce874a0a8089147dc41495cdcf41
  logOut() {
    this.firebase.logOut();
    this.router.navigate(['login']);
  }
  
}

