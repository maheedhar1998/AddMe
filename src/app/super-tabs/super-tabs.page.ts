import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseBackendService } from '../firebase-backend.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-super-tabs',
  templateUrl: './super-tabs.page.html',
  styleUrls: ['./super-tabs.page.scss']
})
@Component({
  selector: 'page-home',
  templateUrl: '../home/home.page.html',
  styleUrls: ['../home/home.page.scss']
})
export class SuperTabsPage implements OnInit {
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
    });
  }

  ngOnInit() {
  }

}
