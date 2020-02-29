import { Component, OnInit } from '@angular/core';
import { FirebaseBackendService } from '../firebase-backend.service';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import * as backend from '../backendClasses';
// import {hmTouchEvents} from '';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  private profile: backend.user;
  private firebase: FirebaseBackendService;
  private grid: {name: string, logo: string} [][];
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
    let name: ['instagram', 
              'facebook', 
              'snapchat', 
              'tiktok', 
              'github', 
              'twitter',
              'linkedin',
              'whatsapp',
              'tinder',
              'steam',
              'gmail',
              'outlook',
              'venmo',
              'paypal',
              'discord',
              'katalk'
      ]
    let logo: ['../assets/instagram-2-1.svg',
                '../assets/facebook-icon.svg',
                '../assets/snapchat.svg',
                '../assets/tiktok-logo.svg',
                '../assets/github.svg',
                '../assets/twitter.svg',
                '../assets/linkedin-icon-2.svg',
                '../assets/whatsapp-symbol.svg',
                '../assets/tinder-icon.svg',
                '../assets/steam-icon-logo.svg',
                '../assets/gmail-icon.svg',
                '../assets/outlook-1.svg',
                '../assets/venmo.svg',
                '../assets/paypal-icon.svg',
                '../assets/discord.svg',
                '../assets/kakaotalk.svg'
      ]
      for (var i =0; i<4; i++) {
        var names = name[i];
        for (var j = 0; j < names.length; j++) {
          //set src = the srting at index j
          //j will index through the logo array
          var logos = logos[j];
          
        }
      }
  }

  goToContacts() {
    this.router.navigate(['contacts']);
  }

  goToHome() {
    this.router.navigate(['home']);
  }

  ngOnInit() {
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
}
