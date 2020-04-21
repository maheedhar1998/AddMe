import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseBackendService } from '../firebase-backend.service';
import { ToastController } from '@ionic/angular'
import { AlertController } from '@ionic/angular';
import * as firebase from 'firebase'

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
              private toastController: ToastController,
              private alertController: AlertController) {
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

  forgotPassword()
  {
    this.presentAlertPrompt()
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Forgot Password',
      inputs: [
        {
          name: 'email',
          type: 'text',
          placeholder: 'Enter your email address'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            return true
          }
        }, {
          text: 'Ok',
          handler: (val) => {
            this.sendForgotPasswordEmail(val.email.trim())
          }
        }
      ]
    });

    await alert.present();
  }

  sendForgotPasswordEmail(email)
  {
    firebase.auth().sendPasswordResetEmail(email).then(async () => {
      this.showToastMessage("Check your inbox for your password reset link.", "success")
    })
    .catch(err => {
      throw new Error(err)
    })
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
