import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signUp, Login } from '../interfaces/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  constructor(private _HttpClient: HttpClient,private _Router:Router) {
    if (localStorage.getItem('user') != null) {
      this.saveCurrentuser();
    }
  }
  currentUser = new BehaviorSubject(null);
  authPhoto: string = '/images/mobile.png';

  saveCurrentuser() {
    const token: any = localStorage.getItem('user');
    this.currentUser = jwtDecode(token);
  }

  checkToken() { 
    const token: any = localStorage.getItem('user');
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp! > Date.now()/ 1000) {
      this.logout();
      this._Router.navigate(['/login'])
    }
  }
  signUp(formData: signUp): Observable<any> {
    return this._HttpClient.post(
      'http://localhost:3000/api/v1/auth/signup',
      formData
    );
  }

  Login(formData: Login): Observable<any> {
    return this._HttpClient.post(
      'http:localhost:3000/api/v1/auth/login',
      formData
    );
  }
  logout() {
    localStorage.removeItem('user');
    this.currentUser.next(null);
  }
  ngOnInit(): void {}
}
