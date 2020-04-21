import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UserContactPage } from './user-contact.page';
import { PopoverOtherPage } from '../popover-other/popover-other.page';

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
    PopoverOtherPage
  ],
  entryComponents: [PopoverOtherPage]
})
export class UserContactPageModule {}
