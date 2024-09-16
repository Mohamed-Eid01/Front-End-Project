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
  private hostName: string = 'http://localhost:3000';
  private routName: string = '/api/v1/auth';
  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    if (localStorage.getItem('user') != null) {
      this.saveCurrentUser();
    }
  }
  currentUser = new BehaviorSubject<any>(null);
  authPhoto: string = '/images/mobile.png';

  saveCurrentUser() {
    const token: any = localStorage.getItem('user');
    this.currentUser.next(jwtDecode(token));
  }

  checkToken() {
    const token: any = localStorage.getItem('user');
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp! > Date.now() / 1000) {
      this.logout();
      this._Router.navigate(['/login']);
    }
  }
  signUp(formData: signUp): Observable<any> {
    return this._HttpClient.post(
      `${this.hostName}${this.routName}/signup`,
      formData
    );
  }

  Login(formData: Login): Observable<any> {
    return this._HttpClient.post(
      `${this.hostName}${this.routName}/login`,
      formData
    );
  }
  sendMail(formData: Login): Observable<any> {
    return this._HttpClient.post(
      `${this.hostName}${this.routName}/forgetPassword`,
      formData
    );
  }

  verifyCode(formData: Login): Observable<any> {
    return this._HttpClient.post(
      `${this.hostName}${this.routName}/verifyCode`,
      formData,
      { headers: { authorization: `Bearer ${localStorage.getItem('verify')}` } }
    );
  }

  resetPassword(formData: Login): Observable<any> {
    return this._HttpClient.put(
      `${this.hostName}${this.routName}/resetCode`,
      formData,
      { headers: { authorization: `Bearer ${localStorage.getItem('verify')}` } }
    );
  }
  logout() {
    localStorage.removeItem('user');
    this.currentUser.next(null);
  }
  ngOnInit(): void {}
}
