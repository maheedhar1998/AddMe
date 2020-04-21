import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { FirebaseBackendService } from '../firebase-backend.service';
import { ThemeService } from '../theme.service'
import { Storage } from '@ionic/storage'
import { ToastController } from '@ionic/angular'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {
  private firebase: FirebaseBackendService;
  private darkMode: boolean;
  constructor(private router: Router,
              private themeService: ThemeService,
              private storage: Storage,
              private toastController: ToastController) {
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
  
  async deleteAccount()
  {
    const answer = confirm("Are you sure you want to delete your account?")
    if(answer === true)
    {
      const uid = firebase.auth().currentUser.uid
      await firebase.auth().currentUser.delete().catch(err => {throw new Error(err)})
      await this.firebase.deleteAccount(uid).catch(err => {throw new Error(err)})
      await this.firebase.logOut().catch(err => {throw new Error(err)})

      const toast = await this.toastController.create({
        message: "Your account has been deleted.",
        duration: 4000,
        color: "danger"
      });
      toast.present();
    }
  }
}
