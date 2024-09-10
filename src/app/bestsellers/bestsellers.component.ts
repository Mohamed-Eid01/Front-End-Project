import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { CurrencyPipe } from '@angular/common';
import { DescriptionPipe } from '../pipes/description.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-bestsellers',
  standalone: true,
  imports: [CurrencyPipe, DescriptionPipe,RouterLink],
  templateUrl: './bestsellers.component.html',
  styleUrl: './bestsellers.component.scss',
})
export class BestsellersComponent implements OnInit {
  imageDomain: string = '';
  search: string = '';
  products: any[] = [];
  subscription: any;
  constructor(private _productsServices: ProductsService) {}
  ngOnInit(): void {
    this.imageDomain = this._productsServices.imageDomain;
    this.subscription = this._productsServices
      .getproducts(16, 1, '-price', this.search)
      .subscribe((res) => {
        this.products = res.data;
      });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
