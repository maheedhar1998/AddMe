import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import * as backend from '../backendClasses';
import { FirebaseBackendService } from '../firebase-backend.service';
import * as firebase from 'firebase';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-popover-other',
  templateUrl: './popover-other.page.html',
  styleUrls: ['./popover-other.page.scss'],
})
export class PopoverOtherPage implements OnInit {
  private firebase: FirebaseBackendService;
  private type: string;
  private id: string;
  private username: string;
  private url: string;
  private socialAccounts: backend.socialAccount[];
  private none: boolean;

  constructor(private router: Router, private navParam: NavParams) {
    this.id = "";
    this.url = "";
    this.none = false;
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(!firebaseUser)
      {
        this.router.navigate(['login']);
      }
      else
      {
        this.firebase = new FirebaseBackendService(firebase.auth().currentUser.uid);
        this.type = this.navParam.get('type');
        this.username = this.navParam.get('username');
        console.log(this.username)
        this.firebase.getSocialAccountsTypeContact(this.type, this.username).then(socialsArr => {
          this.socialAccounts = socialsArr;
          console.log(socialsArr);
        });
      }
    });
  }

  ngOnInit() {
  }

  goToHome() {
    this.router.navigate(['home']);
  }

}
