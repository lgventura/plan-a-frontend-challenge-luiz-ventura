import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { UserService } from './api/user.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  users = [];
  email = '';
  logged = false;

  constructor(
    private router: Router,
    private usersService: UserService,
    private menu: MenuController
  ) {
    this.loadUsers();
  }

  async checkIfIsLogged() {
    console.log(this.users);

    const loginData = await this.getLoginData();
    if (this.users.includes(loginData)) {
      this.setLoggedUser();
      this.navigateTo('home');
    } else {
      this.navigateTo('login');
    }
  }
  async getLoginData() {
    const { value } = await Storage.get({ key: 'loginData' });
    return value;
  }

  async setLoggedUser(email?: string) {
    this.logged = true;
    const { value } = await Storage.get({ key: 'email' });
    this.email = email || value;
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  async loadUsers() {
    this.usersService.getUsersFakeDB().subscribe(
      (res) => {
        this.users = res.users;
        this.checkIfIsLogged();
      },
      (err) => {
        console.log(err);
        this.navigateTo('login');
      }
    );
  }

  async logout() {
    await Storage.remove({ key: 'loginData' });
    await Storage.remove({ key: 'email' });
    this.navigateTo('login');
    this.logged = false;
    this.menu.close();
  }
}
