import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage' 

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  public darkMode: boolean;
  constructor(private storage: Storage) { 
    if(this.storage.get('darkMode') == null)
      this.setAppTheme(false)
    else 
    {
      this.storage.get('darkMode').then( val => {
        this.setAppTheme(val === "true")
      });
    }
  }

  toggleDarkMode()
  {
    this.darkMode = !this.darkMode
    this.setAppTheme(this.darkMode) 
  }

  setAppTheme(dark)
  {
    this.darkMode = dark;
    if(this.darkMode)
      document.body.classList.add("dark")
    else 
      document.body.classList.remove("dark")
  }
}
