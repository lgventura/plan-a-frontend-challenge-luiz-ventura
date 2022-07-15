import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  isSubmitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  get errorControl() {
    return this.loginForm.controls;
  }

  setLoginData = async (email: string, password: string) => {
    await Storage.set({
      key: 'loginData',
      value: btoa(email + ':' + password),
    });
  };

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
    this.router.navigate(['home']);
  }

  getFormValue(field: string) {
    return this.loginForm.get(field).value;
  }
}
