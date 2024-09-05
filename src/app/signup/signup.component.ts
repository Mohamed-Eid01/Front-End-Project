import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgModule } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { animationFrameProvider } from 'rxjs/internal/scheduler/animationFrameProvider';
import { Login } from '../interfaces/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  constructor(private _AuthService: AuthService, private _Router: Router) {
    this.phoneImage = _AuthService.authPhoto;
  }
  signupForm = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
    confirmPassword: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
  });
  // emailErrors: string[] = [];
  // passwordErrors: string[] = [];

  emailErrors: string | null = null;
  passwordErrors: string | null = null;
  phoneImage: string = '';

  signup(formData: FormGroup) {
    this._AuthService.signUp(formData.value).subscribe(
      (res) => {
        if (res.token) {
          localStorage.setItem('user', res.token);
          this._AuthService.saveCurrentuser();
        }
        this._Router.navigate(['/home']);
      },
      (err) => {
        err.error.errors.map((error: any) => {
          if (error.path === 'email') this.emailErrors = error.msg;
          if (error.path === 'password') this.passwordErrors = error.msg;
        });
      }
    );
  }
}
