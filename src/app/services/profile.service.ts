import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private hostName: string = 'http://localhost:3000';
  private routName: string = '/api/v1/profile';
  userImage: string = '';
  constructor(
    private _HttpClient: HttpClient,
    private _GlobalService: GlobalService
  ) {
    this.hostName = this._GlobalService.hostName;
    this.routName = this._GlobalService.usersRoute;
    this.userImage = this._GlobalService.userImage;
  }

  getUser(): Observable<any> {
    return this._HttpClient.get(`${this.hostName}${this.routName}/me`, {
      headers: { authorization: `Bearer ${localStorage.getItem('user')}` },
    });
  }

  updateUser(formData: any): Observable<any> {
    return this._HttpClient.put(
      `${this.hostName}${this.routName}/updateMe`,
      formData,
      { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } }
    );
  }

  changePassword(formData: any): Observable<any> {
    return this._HttpClient.put(
      `${this.hostName}${this.routName}/changeMyPassword`,
      formData,
      { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } }
    );
  }
}
