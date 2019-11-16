export default {
    'username': [
      { type: 'required', message: 'Username is required.' },
      { type: 'minlength', message: 'Username must be at least 5 characters long.' },
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
      { type: 'validUsername', message: 'Your username has already been taken.' }
      ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 6 characters long.' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.' }
    ],
    'confirmPassword': [
      { type: 'required', message: 'Confirm password is required.' }
    ],
    'matchingPasswords': [
      { type: 'areEqual', message: 'Password mismatch.' }
    ],
    'name': [
      { type: 'required', message: 'Name is required.' }
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email' }
    ],
    'confirmEmail': [
      { type: 'required', message: 'Confirm email is required.' }
    ],
    'matchingEmails': [
      { type: 'areEqual', message: 'Emails mismatch.' }
    ],
    'phone': [
      { type: 'required', message: 'Phone is required.' }
    ]
  }
