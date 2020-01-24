import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { FirebaseBackendService } from '../firebase-backend.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
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

  ngOnInit() {
  }

  logOut() {
    this.firebase.logOut();
    this.router.navigate(['login']);
  }

  goHome()
  {
    this.router.navigate(['home']);
  }
  

}
