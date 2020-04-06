import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as backend from '../backendClasses';
import { FirebaseBackendService } from '../firebase-backend.service';
import * as firebase from 'firebase';
import { PopoverController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-contact-options',
  templateUrl: './contact-options.page.html',
  styleUrls: ['./contact-options.page.scss'],
})
export class ContactOptionsPage implements OnInit {
  private firebase: FirebaseBackendService;
  private contact: backend.contact;
  private option: string;

  constructor(private popOver: PopoverController, private router: Router, private navParam: NavParams, public alertController: AlertController) {
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(!firebaseUser)
      {
        this.router.navigate(['login']);
      }
      else
      {
        this.option = "";
        this.firebase = new FirebaseBackendService(firebase.auth().currentUser.uid);
        this.contact = this.navParam.get('contact');
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

  edit() {
    this.popOver.dismiss(this.option);
  }

  ngOnInit() {
  }

}
