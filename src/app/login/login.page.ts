import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  isSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private app: AppComponent
  ) {}

  get errorControl() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  showLoginButton(): boolean {
    return true;
  }

  submitLogin() {
    this.setLoginData(
      this.getFormValue('email'),
      this.getFormValue('password')
    );
    this.loginForm.reset();
    this.app.setLoggedUser(this.getFormValue('email'));
    this.router.navigate(['home']);
  }

  async setLoginData(email: string, password: string) {
    await Storage.set({
      key: 'loginData',
      value: btoa(email + ':' + password),
    });
    await Storage.set({
      key: 'email',
      value: email,
    });
  }

  getFormValue(field: string) {
    return this.loginForm.get(field).value;
  }
}
