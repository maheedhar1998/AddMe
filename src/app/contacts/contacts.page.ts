import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import * as backend from '../backendClasses';
import { FirebaseBackendService } from '../firebase-backend.service';
import * as firebase from 'firebase';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {
  private firebase: FirebaseBackendService;
  private type: string;
  private socialAccounts: backend.socialAccount[];
  constructor(private router: Router, private navParam: NavParams) {
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(!firebaseUser)
      {
        this.router.navigate(['login']);
      }
      else
      {
        this.firebase = new FirebaseBackendService(firebase.auth().currentUser.uid);
        this.type = this.navParam.get('type');
        this.firebase.getSocialAccountsType(this.type).then(socialsArr => {
          this.socialAccounts = socialsArr;
          console.log(socialsArr);
        });
      }
    });
  }

  goToHome() {
    this.router.navigate(['home']);
  }

  ngOnInit() {
  }

}
