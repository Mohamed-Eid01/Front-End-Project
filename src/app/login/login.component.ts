import { Login } from './../interfaces/auth';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, Validators,ReactiveFormsModule} from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  invalidLogin: string ='';
  constructor(private _AuthService: AuthService, private _Router: Router) {
    this.phoneImage = _AuthService.authPhoto;
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

  Login(formData: FormGroup) {
    this._AuthService.Login(formData.value).subscribe(
      (res) => {
        if (res.token) {
          localStorage.setItem('user', res.token);
          this._AuthService.saveCurrentuser();
        }
        this._Router.navigate(['/home']);
      },
      (err) => {
        err.error.errors.map((error: any) => {
          this.invalidLogin = err.error.message;
          console.log(this.invalidLogin);
        });
      }
    );
  }
}
