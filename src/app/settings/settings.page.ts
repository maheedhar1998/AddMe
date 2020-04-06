import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { FirebaseBackendService } from '../firebase-backend.service';
import { ThemeService } from '../theme.service'
import { Storage } from '@ionic/storage'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {
  private firebase: FirebaseBackendService;
  private darkMode: boolean;
  constructor(private router: Router, private themeService: ThemeService, private storage: Storage) {
    const self = this
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(!firebaseUser)
        this.router.navigate(['login']);
      else
      {
        self.storage.get('darkMode').then( val => {
          this.darkMode = (val === "true")
        });
        this.firebase = new FirebaseBackendService(firebase.auth().currentUser.uid);
      }
    })
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
