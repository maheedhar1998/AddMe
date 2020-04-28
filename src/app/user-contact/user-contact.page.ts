import { Component, OnInit } from '@angular/core';
import { FirebaseBackendService } from '../firebase-backend.service';
import * as firebase from 'firebase';
import { Router, ActivatedRoute } from '@angular/router';
import * as backend from '../backendClasses';
import { PopoverController } from '@ionic/angular';
import { PopoverOtherPage } from '../popover-other/popover-other.page';

@Component({
  selector: 'app-user-contact',
  templateUrl: './user-contact.page.html',
  styleUrls: ['./user-contact.page.scss'],
})
export class UserContactPage implements OnInit {
  private profile:backend.contact = {} as backend.contact
  private firebase: FirebaseBackendService;
  private logos: any[] = [];
  private chunks: any[] = [];
  private gridColumnSize = 3;

  constructor(private router: Router, private route: ActivatedRoute, private popOver: PopoverController) {
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(!firebaseUser){
        this.router.navigate(['login']);
      }else{
        this.firebase = new FirebaseBackendService(firebase.auth().currentUser.uid);
        this.route.params.subscribe(data => {
          this.chunks = [];
          this.profile = JSON.parse(data['contact']) as backend.contact;
          console.log(this.profile)
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

  async openPopover(ev: any, typ: string) {
    console.log(this.profile['username'])
    const pop = await this.popOver.create({
      component: PopoverOtherPage,
      componentProps: {'type': typ, 'username': this.profile['username']},
      translucent: true,
      backdropDismiss: true,
      cssClass: 'popover',
      event: ev
    });
    return await pop.present();
  }
}
