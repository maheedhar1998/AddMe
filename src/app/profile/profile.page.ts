import { Component, OnInit } from '@angular/core';
import { FirebaseBackendService } from '../firebase-backend.service';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import * as backend from '../backendClasses';
import { PopoverController, Events } from '@ionic/angular';
import { ContactsPage } from '../contacts/contacts.page';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  private profile: backend.user = {} as backend.user;
  private firebase: FirebaseBackendService;
  private logos: any[] = [];
  private chunks: any[] = [];
  private gridColumnSize = 3;

  constructor(private router: Router,
              private popOver: PopoverController,
              private callNum: CallNumber,
              private events: Events) {
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(!firebaseUser)
      {
        this.router.navigate(['login']);
      }
      else
      {
        this.events.subscribe('update-profile', () => {
          this.firebase = new FirebaseBackendService(firebase.auth().currentUser.uid);
          this.firebase.getUserData().then(data => {
            this.profile = data;
          });
        })

        this.logos = [
          { name: 'instagram', logo:'instagram-2-1.svg'},
          { name: 'facebook', logo:'facebook-icon.svg'},
          { name: 'snapchat', logo:'snapchat.svg'},
          { name: 'twitter', logo:'twitter-new.svg'},
          { name: 'linkedin', logo:'linkedin-icon-2.svg'},
          // { name: 'github', logo:'github.svg'},
          // { name: 'tiktok', logo:'tiktok-logo.svg'},
          // { name: 'whatsapp', logo:'whatsapp-symbol.svg'},
          // { name: 'tinder', logo:'tinder-icon.svg'},
          // { name: 'steam', logo:'steam-icon-logo.svg'},
          // { name: 'gmail', logo:'gmail-icon.svg'},
          // { name: 'outlook', logo:'outlook-1.svg'},
          // { name: 'paypal', logo:'paypal-icon.svg'},
          // { name: 'discord', logo:'discord.svg'},
          // { name: 'kakaotalk', logo:'kakaotalk.svg'}
        ] 
      
        for(let i = 0; i < this.logos.length; i += this.gridColumnSize)
          this.chunks.push(this.logos.slice(i, i + this.gridColumnSize))
      }
    });
  }

  goToContacts() {
    this.router.navigate(['contacts']);
  }

  goToHome() {
    this.router.navigate(['home']);
  }

  goToSettings()
  {
    this.router.navigate(['settings'])
  }

  goToEditProfile()
  {
    this.router.navigate(['/editprofile'])
  }

  ngOnInit()
  {
    const self = this
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser)
      {
        self.firebase = new FirebaseBackendService(firebase.auth().currentUser.uid);
        self.firebase.getUserData().then(data => {
          self.profile = data;
        });
      }
    })
  }

  async openPopover(ev: any, typ: string) {
    const pop = await this.popOver.create({
      component: ContactsPage,
      componentProps: {'type': typ},
      translucent: true,
      backdropDismiss: true,
      cssClass: 'popover',
      event: ev
    });
    return await pop.present();
  }

  call() {
    this.callNum.callNumber(this.profile.getPhoneNumber, true).then( res => {
      console.log("success");
    });
  }
}
