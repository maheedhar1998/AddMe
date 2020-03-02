import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UserContactPage } from './user-contact.page';
// import { Contacts2PageModule } from '../contacts/contacts2.module';

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
    UserContactPage,
    // Contacts2PageModule
  ],
  entryComponents: [//Contacts2PageModule
  ]
})
export class UserContactPageModule {}
