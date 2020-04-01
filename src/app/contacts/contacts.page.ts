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

  constructor(private router: Router, private navParam: NavParams) {
    this.id = "";
    this.username = "";
    this.url = "";
    this.adding = false;
    this.editing = false;
    this.mode = false;
    this.none = false;
    this.usernameSM = ["facebook", "instagram", "snapchat", "twitter"]
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

  edit() {
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

  }

  deleteAccount(account: backend.socialAccount) {
    console.log(account);
    this.firebase.deleteSocialAccount(this.type, account);
    this.mode = false;
  }

  addSMAccount() {
    if(this.type == "facebook"){
      this.firebase.addSocialAccount(this.type, new backend.socialAccount(this.username,this.username,"https://www.facebook.com/"+this.username));
    }else if(this.type == "snapchat"){
      this.firebase.addSocialAccount(this.type, new backend.socialAccount(this.username,this.username,"https://www.snapchat.com/add/"+this.username));
    }else if(this.type == "instagram"){
      this.firebase.addSocialAccount(this.type, new backend.socialAccount(this.username,this.username,"https://www.instagram.com/"+this.username));
    }else if(this.type == "twitter"){
      this.firebase.addSocialAccount(this.type, new backend.socialAccount(this.username,this.username,"https://www.twitter.com/"+this.username));
    }else{
      this.firebase.addSocialAccount(this.type, new backend.socialAccount(this.id,this.username,this.url));
    }
    this.adding = false;
    this.mode = false;
    this.id = "";
    this.username = "";
    this.url = "";
  }

  ngOnInit() {
  }
}
