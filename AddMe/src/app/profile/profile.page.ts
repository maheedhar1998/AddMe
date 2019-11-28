import { Component, OnInit } from '@angular/core';
import { FirebaseBackendService } from '../firebase-backend.service';
import { CameraPage } from '../camera/camera.page';
import { Router } from '@angular/router'

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
    this.uid = "";
    this.firebase = new FirebaseBackendService(this.uid);
    this.profile = this.firebase.getUserData();
    console.log(this.profile);
  }
  
  goToContacts() {
    this.router.navigate(['contacts']);
  }

  goToHome() {
    this.router.navigate(['home']);
  }

  ngOnInit() {
  }

}
