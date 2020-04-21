import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { EqualityValidator } from './validation/validators'
import ValidationMessages from './validation/validationMessages'
import { Router } from '@angular/router'
import { FirebaseBackendService } from '../firebase-backend.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})

export class SignupPage implements OnInit {
  private validateSignupForm: FormGroup
  private validationMessages = ValidationMessages
  private matchingPasswordsGroup: FormGroup
  private matchingEmailsGroup: FormGroup
  private name: string;
  private username: string;
  private password: string;
  private email: string;
  private phone: string;
  private firebase: FirebaseBackendService;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.name = "";
    this.username = "";
    this.password = "";
    this.email = "";
    this.phone = "";
    this.firebase = new FirebaseBackendService(null);
  }

  ngOnInit() {
    this.matchingPasswordsGroup = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*()-=_+{}|:;"\'<>,.?/]*$') // Password must contain at least one uppercase, one lowercase, and one number.
      ])),
      confirmPassword: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return EqualityValidator.areEqual(formGroup)
    })

    this.matchingEmailsGroup = new FormGroup({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$') // Email must follow certain pattern
      ])),
      confirmEmail: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    }, (formGroup: FormGroup) => EqualityValidator.areEqual(formGroup))

    this.validateSignupForm = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(20)
      ])),
      username: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(25),
        Validators.minLength(5)
      ])),
      matchingPasswords: this.matchingPasswordsGroup,
      matchingEmails: this.matchingEmailsGroup,
      phone: new FormControl('', Validators.required)
    });
  }

  async submitSignUpForm(signupForm)
  {
    if(signupForm.status === "VALID")
    {
      var uid = "";
      const defaultProfilePicture = "https://firebasestorage.googleapis.com/v0/b/addme-cd3be.appspot.com/o/default-user.png?alt=media&token=8c6caf56-6236-475d-a301-095cb60d7c93"
      await this.firebase.signupWithEmail(signupForm.value.matchingEmails.email, signupForm.value.matchingPasswords.password).then(val => {
        uid = val.user.uid;
        console.log(val);
      });
      this.firebase.sendUserDataSignUp(signupForm.value.name, signupForm.value.username, signupForm.value.matchingEmails.email, signupForm.value.phone, null, defaultProfilePicture, uid);
      this.router.navigate(['login']);
    }

    return
  }

  goToLogin()
  {
    this.router.navigate(['login']);
  }
}
