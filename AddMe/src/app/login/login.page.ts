import { Component} from '@angular/core';
import { Router } from '@angular/router';
import * as firbase from 'firebase';
import { FirebaseBackendService } from '../firebase-backend.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  private email: string;
  private password: string;
  private fire: FirebaseBackendService;

  constructor(private route: Router) {
    this.email = "";
    this.password = "";
    this.fire = new FirebaseBackendService(null);
  }

  signup() {
    this.route.navigate(['signup'])
  }
  login() {
    if(this.email == "" || this.password == "") {
      alert("Please enter an Email and/or Password");
    } else {
      var x = this.fire.loginWithEmail(this.email, this.password);
      if(x) {
        this.route.navigate(['home']);
      }
    }
  }
}
