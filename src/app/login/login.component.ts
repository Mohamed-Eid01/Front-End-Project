import { Login } from './../interfaces/auth';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private _AuthService: AuthService, private _Router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
      ]),
    });
  }
  phoneImage: string = '';
  invalidLogin: string = '';

  Login(formData: FormGroup) {
    this._AuthService.Login(formData.value).subscribe(
      (res) => {
        if (res.token) {
          localStorage.setItem('user', res.token);
          this._AuthService.saveCurrentUser();
        }
        this._Router.navigate(['/home']);
      },
      (err) => {
        console.log(err);
        err.error.errors?.map((error: any) => {
          this.invalidLogin = err.error.message;
          console.log(this.invalidLogin);
        });
      }
    );
  }
  ngOnInit(): void {
    this.phoneImage = this._AuthService.authPhoto;
  }
  //   ngOnDestroy(): void {
  //     this.phoneImage = this.subscription.unsubscribe();
  //   }
}
