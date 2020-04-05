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
  private editing: boolean;
  private adding: boolean;
  private mode: boolean;
  private none: boolean;
  private usernameSM: string[];
  private editingAccount: backend.socialAccount;

  constructor(private router: Router, private navParam: NavParams) {
    this.id = "";
    this.username = "";
    this.url = "";
    this.adding = false;
    this.editing = false;
    this.mode = false;
    this.none = false;
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
        this.firebase.getSocialAccountsType(this.type).then(socialsArr => {
          this.socialAccounts = socialsArr;
          if(this.socialAccounts.length == 1
            && this.socialAccounts[0].getId == "N/A"
            && this.socialAccounts[0].getUrl == "N/A"
            && this.socialAccounts[0].getUser == "N/A") {
              this.socialAccounts = [];
              this.none = true;
            }
          console.log(socialsArr);
          this.editingAccount = new backend.socialAccount(null,null,null);
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

  edit(account: backend.socialAccount) {
    console.log(account);
    this.editingAccount = account;
    this.id = account['id'];
    this.username = account['user'];
    this.url = account['url'];
    this.editing = true;
  }

  modeChange() {
    if(this.mode == false) {
      this.mode = true;
    }
    else {
      this.mode = false;
    }
  }

  editAccount() {
    this.id = this.username;
    this.firebase.updateSocialAccount(this.type, this.editingAccount, this.firebase.generateSocialAccountFromInfo(this.type,this.username, this.id, this.url));
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

  addSMAccount() {
    this.firebase.addSocialAccount(this.type, this.firebase.generateSocialAccountFromInfo(this.type,this.username, this.id, this.url));
    this.adding = false;
    this.modeChange();
    this.id = "";
    this.username = "";
    this.url = "";
  }

  ngOnInit() {
  }
}
