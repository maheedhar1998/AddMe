import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as backend from '../backendClasses';
import { FirebaseBackendService } from '../firebase-backend.service';
import * as firebase from 'firebase';
import { PopoverController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { NavParams, Events } from '@ionic/angular';

@Component({
  selector: 'app-contact-options',
  templateUrl: './contact-options.page.html',
  styleUrls: ['./contact-options.page.scss'],
})
export class ContactOptionsPage implements OnInit {
  private firebase: FirebaseBackendService;
  private contact: backend.contact;
  private option: string;
  private contactName: string;
  private editing: boolean;

  constructor(private popOver: PopoverController,private events: Events, private router: Router, private navParam: NavParams, public alertController: AlertController) {
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(!firebaseUser)
      {
        this.router.navigate(['login']);
      }
      else
      {
        this.option = "";
        this.editing = false;
        this.firebase = new FirebaseBackendService(firebase.auth().currentUser.uid);
        this.contact = this.navParam.get('contact');
        this.contactName = this.contact['name'];
      }
    })
  }

  async delete(){
    const alert = await this.alertController.create({
      header: 'Delete',
      message: 'Are you sure you want to delete this contact?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.firebase.deleteFromUserContacts(this.contact);
            this.events.publish('update-profile');
            this.popOver.dismiss(this.option);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log("dismiss contact deletion");
          }
        }
      ]
    });
    await alert.present();
  }

  save() {
    let editCon: backend.contact = this.contact;
    editCon['name'] = this.contactName;
    console.log(editCon);
    this.firebase.updateUsersContact(this.contact, editCon);
    this.editing = false;
  }

  edit() {
    this.editing = true;
  }

  ngOnInit() {
  }

}
