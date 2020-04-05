import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { FirebaseBackendService } from '../firebase-backend.service';
import { ThemeService } from '../theme.service'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {
  private firebase: FirebaseBackendService;

  constructor(private router: Router, private themeService: ThemeService) {
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(!firebaseUser)
        this.router.navigate(['login']);
      else
        this.firebase = new FirebaseBackendService(firebase.auth().currentUser.uid);
    })
  }

  logOut() {
    this.firebase.logOut();
    this.router.navigate(['login']);
  }

  goHome()
  {
    this.router.navigate(['home']);
  }
  
  toggleDarkMode()
  {
    this.themeService.toggleDarkMode()
  }
}
