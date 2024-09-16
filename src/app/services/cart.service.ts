import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import{GlobalService} from './global.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private hostName: string = 'http://localhost:3000';
  private routName: string = '/api/v1/carts';
  constructor(
    private _HttpClient: HttpClient,
    private _GlobalService: GlobalService
  ) {
    this.hostName = this._GlobalService.hostName;
    this.routName = this._GlobalService.cartRoute;
  }

  getUserCart(): Observable<any> {
    return this._HttpClient.get(`${this.hostName}${this.routName}`, {
      headers: { authorization: `Bearer ${localStorage.getItem('user')}` },
    });
  }

  addProductToCart(product: string): Observable<any> {
    return this._HttpClient.post(
      `${this.hostName}${this.routName}`,
      { product },
      { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } }
    );
  }

  clearCart(): Observable<any> {
    return this._HttpClient.delete(`${this.hostName}${this.routName}`, {
      headers: { authorization: `Bearer ${localStorage.getItem('user')}` },
    });
  }

  removeProductFromCart(itemId: string): Observable<any> {
    return this._HttpClient.delete(
      `${this.hostName}${this.routName}/${itemId}`,
      { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } }
    );
  }

  applyCoupon(formData: any): Observable<any> {
    return this._HttpClient.put(
      `${this.hostName}${this.routName}/applyCoupon`,
      formData,
      { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } }
    );
  }
}