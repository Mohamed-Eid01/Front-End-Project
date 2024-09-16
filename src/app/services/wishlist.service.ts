import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private hostName: string = 'http://localhost:3000';
  private routName: string = '/api/v1/wishlist';
  constructor(private _HttpClient: HttpClient) {}
  addProductToWishlist(product: string): Observable<any> {
    return this._HttpClient.post(
      `${this.hostName}${this.routName}`,
      { product },
      { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } }
    );
  }
  getUserWishlist(): Observable<any> {
    return this._HttpClient.get(`${this.hostName}${this.routName}`, {
      headers: { authorization: `Bearer ${localStorage.getItem('user')}` },
    });
  }

  removeProductFromWishlist(itemId: string): Observable<any> {
    return this._HttpClient.delete(
      `${this.hostName}${this.routName}/${itemId}`,
      { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } }
    );
  }
}
