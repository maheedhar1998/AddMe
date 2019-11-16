import { Component, OnInit } from '@angular/core';
import { FirebaseBackendService } from '../firebase-backend.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  private profile: {};
  private uid: string;
  private firebase: FirebaseBackendService;
  constructor() {
    // TODO update so the page gets logged in user's uid
    this.uid = "";
    this.firebase = new FirebaseBackendService(this.uid);
    this.profile = this.firebase.getUserData();
    console.log(this.profile);
  }

  ngOnInit() {
  }

}
