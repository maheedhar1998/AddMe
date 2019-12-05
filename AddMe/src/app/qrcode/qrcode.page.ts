import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseBackendService } from '../firebase-backend.service';
import * as firebase from 'firebase';
import * as backend from '../backendClasses';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.page.html',
  styleUrls: ['./qrcode.page.scss'],
})
export class QRcodePage implements OnInit {
  qrData = '';
  elementType: 'url' | 'canvas' | 'img' = 'canvas';
  private profile: backend.user;
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
        this.firebase.getUserData().then(dat => {
          this.profile = dat;
          console.log(this.profile);
          this.qrData = "https://github.com/SCCapstone/AddMe/wiki/Samuel-Menkus-Log#week-of-november-18-2019-through-november-24-2019";
        });
      }
    });
  }

  goToHome(){
    this.router.navigate(['home']);
  }

  ngOnInit() {
  }

}
