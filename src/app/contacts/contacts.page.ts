import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import * as backend from '../backendClasses';
import { FirebaseBackendService } from '../firebase-backend.service';
import * as firebase from 'firebase';
import { NavParams, Events } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

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

  constructor(private router: Router, private navParam: NavParams, private toastController: ToastController, private events: Events) {
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
        this.events.subscribe('update-accounts', async () => {
          this.firebase = new FirebaseBackendService(firebase.auth().currentUser.uid);
          this.type = this.navParam.get('type');
          const socialsArr = await this.firebase.getSocialAccountsType(this.type)
            this.socialAccounts = socialsArr;
            if(this.socialAccounts == null)
              this.socialAccounts = []
            else if(this.socialAccounts.length == 1
              && this.socialAccounts[0].getId == "N/A"
              && this.socialAccounts[0].getUrl == "N/A"
              && this.socialAccounts[0].getUser == "N/A") {
                this.socialAccounts = [];
                this.none = true;
              }
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

  async editAccount() {
    if(this.type == "linkedin"){
      if(this.username.trim() == "" || this.id.trim() == "" || this.url.trim() == ""){
        const toast = await this.toastController.create({
          message: "No fields may be blank",
          duration: 4000,
          color: "danger"
        });
        toast.present();
      }
      else{
        if(this.hasDuplicateAccount()){
          const toast = await this.toastController.create({
            message: "No duplicate accounts allowed",
            duration: 4000,
            color: "danger"
          });
          toast.present();
        }
        else{
          this.id = this.username;
          const newSocialAccount = this.firebase.generateSocialAccountFromInfo(this.type, this.username.trim(), this.id.trim(), this.url.trim())
          this.firebase.updateSocialAccount(this.type, this.editingAccount, newSocialAccount);
          this.id = "";
          this.username = "";
          this.url = "";
          this.editing = false;
          let replaceIndex = -1
          for(let i = 0; i < this.socialAccounts.length; i++)
          {
            if(this.socialAccounts[i].id === newSocialAccount.id)
              replaceIndex = i
          }
          this.socialAccounts.splice(0, replaceIndex, newSocialAccount)
          this.modeChange();
          const toast = await this.toastController.create({
            message: "Social Media account edited",
            duration: 4000,
            color: "success"
          });
          toast.present();
        }
      }
    }
    else if(this.username.trim() == ""){
      const toast = await this.toastController.create({
        message: "Username can not be blank",
        duration: 4000,
        color: "danger"
      });
      toast.present();
    }
    else{
      if(this.hasDuplicateAccount()){
        const toast = await this.toastController.create({
          message: "No duplicate accounts allowed",
          duration: 4000,
          color: "danger"
        });
        toast.present();
      }
      else{
        this.id = this.username;
        const newSocialAccount = this.firebase.generateSocialAccountFromInfo(this.type, this.username.trim(), this.id.trim(), this.url.trim())
        this.firebase.updateSocialAccount(this.type, this.editingAccount, newSocialAccount);
        this.id = "";
        this.username = "";
        this.url = "";
        let replaceIndex = -1
        for(let i = 0; i < this.socialAccounts.length; i++)
        {
          if(this.socialAccounts[i].id === newSocialAccount.id)
            replaceIndex = i
        }
        this.socialAccounts.splice(replaceIndex, 1, newSocialAccount)
        this.editing = false;
        this.modeChange();
        const toast = await this.toastController.create({
          message: "Social Media account edited",
          duration: 4000,
          color: "success"
        });
        toast.present();
      }
    }
  }

  async deleteAccount(account: backend.socialAccount) {
    this.firebase.deleteSocialAccount(this.type, account);
    let deleteIndex = -1
    for(let i = 0; i < this.socialAccounts.length; i++)
    {
      if(this.socialAccounts[i].id === account.id)
        deleteIndex = i
    }
    this.socialAccounts.splice(deleteIndex,1)
    this.modeChange();
    const toast = await this.toastController.create({
      message: "Social Media account deleted",
      duration: 4000,
      color: "danger"
    });
    toast.present();
  }

  async addSMAccount() {
    if(this.type == "linkedin"){
      if(this.username.trim() == "" || this.id.trim() == "" || this.url.trim() == ""){
        const toast = await this.toastController.create({
          message: "No fields may be blank",
          duration: 4000,
          color: "danger"
        });
        toast.present();
      }
      else{
        if(this.hasDuplicateAccount()){
          const toast = await this.toastController.create({
            message: "No duplicate accounts allowed",
            duration: 4000,
            color: "danger"
          });
          toast.present();
        }
        else{
          const newSocialAccount = this.firebase.generateSocialAccountFromInfo(this.type, this.username.trim(), this.id.trim(), this.url.trim())
          this.adding = false;
          this.modeChange();
          this.id = "";
          this.username = "";
          this.url = "";
          this.firebase.addSocialAccount(this.type, newSocialAccount);
          this.socialAccounts.push(newSocialAccount)
          const toast = await this.toastController.create({
            message: "New Social Media account added",
            duration: 4000,
            color: "success"
          });
          toast.present();
        }
      }
    }
    else if(this.username.trim() == ""){
      const toast = await this.toastController.create({
        message: "Username can not be blank",
        duration: 4000,
        color: "danger"
      });
      toast.present();
    }
    else{
      if(this.hasDuplicateAccount()){
        const toast = await this.toastController.create({
          message: "No duplicate accounts allowed",
          duration: 4000,
          color: "danger"
        });
        toast.present();
      }
      else{
        const newSocialAccount = this.firebase.generateSocialAccountFromInfo(this.type, this.username.trim(), this.id.trim(), this.url.trim())
        this.adding = false;
        this.modeChange();
        this.id = "";
        this.username = "";
        this.url = "";
        this.firebase.addSocialAccount(this.type, newSocialAccount);
        this.socialAccounts.push(newSocialAccount)
        const toast = await this.toastController.create({
          message: "New Social Media account added",
          duration: 4000,
          color: "success"
        });
        toast.present();
      }
    }
  }

  hasDuplicateAccount(){
    for(let i = 0; i < this.socialAccounts.length; i++)
    {
      console.log(this.username);
      console.log(this.socialAccounts[i].user);
      if(this.username == this.socialAccounts[i].user)
      {
        return true;
      }
    }
    return false;
  }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(async firebaseUser => {
      if(!firebaseUser)
      {
        this.router.navigate(['login']);
      }
      else
      {
        this.firebase = new FirebaseBackendService(firebase.auth().currentUser.uid);
        this.type = this.navParam.get('type');
        const socialsArr = await this.firebase.getSocialAccountsType(this.type)
          this.socialAccounts = socialsArr;

          if(this.socialAccounts == null || (this.socialAccounts.length == 1
            && this.socialAccounts[0].getId == "N/A"
            && this.socialAccounts[0].getUrl == "N/A"
            && this.socialAccounts[0].getUser == "N/A")) {
              this.socialAccounts = [];
              this.none = true;
            }
          this.editingAccount = new backend.socialAccount(null,null,null);
      }
    });
  }
}
