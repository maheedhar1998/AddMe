import { Component} from '@angular/core';
import { Router } from '@angular/router';
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
  private rc1: boolean;

  constructor(private router: Router) {
    this.email = "";
    this.password = "";
    this.rc1 = false;
    this.fire = new FirebaseBackendService(null);
  }

  signup() {
    this.router.navigate(['signup'])
  }
  login() {
    if(this.email == "" || this.password == "") {
      alert("Please enter an Email and/or Password");
    } else {
      this.fire.loginWithEmail(this.email, this.password).then(() => {
        this.router.navigate(['home']);
      })
      .catch(err => {
        alert("The Email or Password is incorrect.")
        console.log(err)
      })
    }
  }
  async loginGoogle() {
    await this.fire.loginWithGoogle().then(res => {
      if(res) {
        this.router.navigate(['home']);
      } else if(!res) {
        alert("Google login error");
      }
    });
  }
  async loginFacebook() {
    await this.fire.loginWithFacebook();
  }
  devLogin()
  {
    this.email = "test@gmail.com"
    this.password = "Test12"
    this.login()
  }
}
