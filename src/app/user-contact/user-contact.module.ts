import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UserContactPage } from './user-contact.page';
import { ContactsPage } from '../contacts/contacts2.module';

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
    UserContactPage
  ],
  entryComponents: [ContactsPage]
})
export class UserContactPageModule {}
