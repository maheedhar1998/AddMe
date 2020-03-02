import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'contacts', loadChildren: './contacts/contacts.module#ContactsPageModule' },
  { path: 'qrcode', loadChildren: './qrcode/qrcode.module#QRcodePageModule' },
  { path: 'camera', loadChildren: './camera/camera.module#CameraPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' },
  { path: 'super-tabs', loadChildren: './super-tabs/super-tabs.module#SuperTabsPageModule' },
  { path: 'user-contact', loadChildren: './user-contact/user-contact.module#UserContactPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
