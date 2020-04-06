import { Component } from '@angular/core';
import { Location } from '@angular/common'
import { FirebaseBackendService } from '../firebase-backend.service';
import * as firebase from 'firebase'
import { Router } from '@angular/router'
import * as backend from '../backendClasses'

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage {
  private firebaseService: FirebaseBackendService;
  private user: backend.user = {} as backend.user;

  constructor(private location: Location, private router: Router, ) {
    firebase.auth().onAuthStateChanged(async user => {
      if(!user)
        this.router.navigate(["/login"]);
      else
      {
        this.firebaseService = new FirebaseBackendService(firebase.auth().currentUser.uid);
        this.user = await this.firebaseService.getUserData();
      }
    })
  }

  updateProfile()
  {
    this.firebaseService.updateUserData(this.user).then(() => {
      console.log("sucess");
      this.router.navigate(['profile']);
    });
  }

  goBack()
  {
    this.location.back();
  }
}
