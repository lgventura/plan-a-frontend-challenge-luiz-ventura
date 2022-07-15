import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router) {
    this.checkIfIsLogged();
  }

  async checkIfIsLogged() {
    const loginData = await this.getLoginData();
    if (loginData) {
      this.navigateTo('home');
    } else {
      this.navigateTo('login');
    }
  }
  async getLoginData() {
    const { value } = await Storage.get({ key: 'loginData' });
    return value;
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
