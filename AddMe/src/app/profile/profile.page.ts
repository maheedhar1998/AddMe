import { Component, OnInit } from '@angular/core';
import { FirebaseBackendService } from '../firebase-backend.service';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  private profile: {};
  private uid: string;
  private firebase: FirebaseBackendService;
  constructor(private router: Router) {
    // TODO update so the page gets logged in user's uid
    if(firebase.auth().currentUser) {
      this.firebase = new FirebaseBackendService(firebase.auth().currentUser.uid);
      this.profile = this.firebase.getUserData();
      console.log(this.profile);
    } else {
      this.router.navigate(['login']);
    }
  }

  ngOnInit() {
  }

}
