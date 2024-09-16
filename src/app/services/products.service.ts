import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private hostName: string = 'http://localhost:3000';
  private routName: string = '/api/v1/products';
  imageDomain: string = `${this.hostName}/products/`;
  constructor(private _HttpClient: HttpClient) {}
  getproducts(
    limit: number = 16,
    page: number = 1,
    sort: string = '-createdAt',
    search: string
  ): Observable<any> {
    return this._HttpClient.get(
      `${this.hostName}${this.routName}?limit=${limit}&page=${page}&sort=${sort}&search=${search}`
    );
  }
  getOneProduct(id: string):Observable<any>{
    return this._HttpClient.get(`${this.hostName}${this.routName}/${id}`);
  }
}
