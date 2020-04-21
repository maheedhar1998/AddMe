import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseBackendService } from '../firebase-backend.service';
import { ToastController } from '@ionic/angular'

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

  constructor(private router: Router,
              private toastController: ToastController) {
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
      this.showToastMessage("Please enter an Email and/or Password", "danger");
    } else {
      this.fire.loginWithEmail(this.email, this.password).then(() => {
        this.router.navigate(['home']);
      })
      .catch(err => {
        this.showToastMessage(err.message, "danger")
      })
    }
  }

  async showToastMessage(msg, level = "primary")
  {
    const toast = await this.toastController.create({
      message: msg,
      duration: 4000,
      color: level
    });
    toast.present();
  }

  async loginGoogle() {
    await this.fire.loginWithGoogle().then(res => {
      console.log(res);
      if(res) {
        this.router.navigate(['home']);
      } else if(!res) {
        console.log(res);
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
