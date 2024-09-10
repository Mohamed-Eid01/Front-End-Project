import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { WishlistService } from '../services/wishlist.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  subscription: any;
  id: string = '';
  imgDomain: string = '';
  product: any = {};
  constructor(
    private _AuthService:AuthService,
    private _ActivatedRoute: ActivatedRoute,
    private _productsService: ProductsService,
    private _WishListService: WishlistService,
    private _CartService :CartService
  ) {}
  ngOnInit(): void {
    this._AuthService.checkToken();
    this.id = this._ActivatedRoute.snapshot.params['id'];
    this.imgDomain = this._productsService.imageDomain;
    this.subscription = this._productsService
      .getOneproduct(this.id)
      .subscribe((res) => {
        this.product = res.data;
        console.log(this.product);
      });
  }
addToWishlist(productId:string){
  this._WishListService.addProductToWishlist(productId).subscribe((res)=> {

  })
}
addToCarts(productId:string){
  this._CartService.addProductToCart(productId).subscribe((res) => {console.log(res.data)});
}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
