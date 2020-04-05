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
  private username2: string;
  private url: string;
  private socialAccounts: backend.socialAccount[];
  private mode: boolean;
  private editing: boolean;
  private none: boolean;
  private usernameSM: string[];

  constructor(private router: Router, private navParam: NavParams) {
    this.id = "";
    this.username = "";
    this.url = "";
    this.mode = false;
    this.none = false;
    this.editing = false;
    this.usernameSM = ["facebook", "instagram", "snapchat", "twitter"];
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(!firebaseUser)
      {
        this.router.navigate(['login']);
      }
      else
      {
        this.firebase = new FirebaseBackendService(firebase.auth().currentUser.uid);
        this.type = this.navParam.get('type');
        this.username2 = this.navParam.get('username');
        this.firebase.getSocialAccountsTypeContact(this.type, this.username2).then(socialsArr => {
          this.socialAccounts = socialsArr;
          if(this.socialAccounts.length == 1
            && this.socialAccounts[0].getId == "N/A"
            && this.socialAccounts[0].getUrl == "N/A"
            && this.socialAccounts[0].getUser == "N/A") {
              this.socialAccounts = [];
              this.none = true;
            }
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

  modeChange() {
    if(this.mode == false) {
      this.mode = true;
    }
    else {
      this.mode = false;
    }
  }

  edit(account: {}) {
    console.log(account);
    this.id = account['id'];
    this.username = account['user'];
    this.url = account['url'];
    this.editing = true;
  }

  editAccount() {
    this.id = "";
    this.username = "";
    this.url = "";
    this.modeChange();
  }

  deleteAccount(account: backend.socialAccount) {
    console.log(account);
    this.firebase.deleteSocialAccount(this.type, account);
    this.modeChange();
  }
}
