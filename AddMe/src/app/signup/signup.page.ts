import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { EqualityValidator, UsernameValidator } from './validation/validators'
import ValidationMessages from './validation/validationMessages'
import { Router } from '@angular/router'

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

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.name = "";
    this.username = "";
    this.password = "";
    this.email = "";
    this.phone = "";
  }

  ngOnInit() {
    this.matchingPasswordsGroup = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$') // Password must contain at least one uppercase, one lowercase, and one number.
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
      name: new FormControl('', Validators.required),
      username: new FormControl('', Validators.compose([
        // TODO - Valid username is determined by whether it is available or not. Waiting on Firebase stuff
        // UsernameValidator.validUsername,
        Validators.required,
        Validators.maxLength(25),
        Validators.minLength(5)
      ])),
      matchingPasswords: this.matchingPasswordsGroup,
      matchingEmails: this.matchingEmailsGroup,
      phone: new FormControl('', Validators.required)
    });
  }

  submitSignUpForm(signupForm)
  {
    if(signupForm.status === "VALID")
    {
      // FORM INFO IS VALID -> SEND TO FIREBASE...
      
    }

    return
  }
}
