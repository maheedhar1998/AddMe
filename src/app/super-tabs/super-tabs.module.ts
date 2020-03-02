import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from '../home/home.page';
import { CameraPage } from '../camera/camera.page';
import { ProfilePage } from '../profile/profile.page';
import { IonicModule } from '@ionic/angular';
import { SuperTabsPage } from './super-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: SuperTabsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SuperTabsPage]
})
export class SuperTabsPageModule {}
