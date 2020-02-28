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
  private id: string;
  private username: string;
  private url: string;
  private socialAccounts: backend.socialAccount[];
  private adding: boolean = false;
  constructor(private router: Router, private navParam: NavParams) {
    this.id = "";
    this.username = "";
    this.url = "";
    this.adding = false;
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

  add() {
    this.adding = true;
  }

  addSMAccount() {
    this.firebase.addSocialAccount(this.type, new backend.socialAccount(this.id,this.username,this.url));
    this.adding = false;
    this.id = "";
    this.username = "";
    this.url = "";
  }

  ngOnInit() {
  }

  window() {
    window.open(this.socialAccounts[0].getUrl);
  }
}
