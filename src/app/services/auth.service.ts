import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signUp, Login } from '../interfaces/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _HttpClient: HttpClient) {}
  currentUser = new BehaviorSubject(null);
  authPhoto: string = '/images/mobile.png';
  saveCurrentuser() {
    const token: any = localStorage.getItem('user');
    this.currentUser = jwtDecode(token);
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
  logout(){
    localStorage.removeItem('user');
    this.currentUser.next(null);
  }
}
