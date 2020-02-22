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
  constructor(private router: Router) {
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
    var grid_arr:string[][]
  }

  goToContacts() {
    this.router.navigate(['contacts']);
  }

  goToHome() {
    this.router.navigate(['home']);
  }

  ngOnInit() {
  }

  // swipeEvent(e) {
  //   console.log("in this")
  //   if (e.direction == 4) {
  //     this.goToHome();
  //   }
  //   var pContent =  document.getElementById('pContent');
  //   var mc = new Hammer(pContent);
  //   mc.on("panleft panright tap press", function(ev) {
  //     pContent.textContent = ev.type +" gesture detected.";
  //   });
  //   mc.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL});
  //   mc.on('swipeleft', (event) => {
  //     this.goToHome();
  //   })
  // }

}
