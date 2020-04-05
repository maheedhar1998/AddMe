import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
// import { FirebaseBackendService } from '../firebase-backend.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {

  constructor(private location: Location) {
    // console.log(this.firebase.getUserData())
  }

  ngOnInit() {
  }

  goBack()
  {
    this.location.back()
  }
}
