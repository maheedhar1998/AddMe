import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UserContactPage } from './user-contact.page';
<<<<<<< HEAD
import { ContactsPage } from '../contacts/contacts2.module';
=======
// import { Contacts2PageModule } from '../contacts/contacts2.module';
>>>>>>> development

const routes: Routes = [
  {
    path: '',
    component: UserContactPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
<<<<<<< HEAD
    UserContactPage
  ],
  entryComponents: [ContactsPage]
=======
    UserContactPage,
    // Contacts2PageModule
  ],
  entryComponents: [//Contacts2PageModule
  ]
>>>>>>> development
})
export class UserContactPageModule {}
