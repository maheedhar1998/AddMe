import { Component, OnInit } from '@angular/core';
import { FirebaseBackendService } from '../firebase-backend.service';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import * as backend from '../backendClasses';
import { PopoverController } from '@ionic/angular';
import { ContactsPage } from '../contacts/contacts.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  private profile: backend.user;
  private firebase: FirebaseBackendService;
  constructor(private router: Router, private popOver: PopoverController) {
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(!firebaseUser)
      {
        this.router.navigate(['login']);
      }
      else
      {
        this.firebase = new FirebaseBackendService(firebase.auth().currentUser.uid);
        this.firebase.getUserData().then(dat => {
          this.profile = dat;
          console.log(this.profile);
        });
      }
    });
  }

  goToContacts() {
    this.router.navigate(['contacts']);
  }

  goToHome() {
    this.router.navigate(['home']);
  }

  ngOnInit() {
  }

  async openPopover(ev: any) {
    const pop = await this.popOver.create({
      component: ContactsPage,
      translucent: true,
      backdropDismiss: true,
      cssClass: 'popover',
      event: ev
    });
    return await pop.present();
  }
}
