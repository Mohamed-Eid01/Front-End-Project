import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { DescriptionPipe } from '../pipes/description.pipe';
import { CurrencyPipe } from '@angular/common';
import { Pagination } from '../interfaces/pagination';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [DescriptionPipe, CurrencyPipe,RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  imageDomain: string = '';
  search: string = '';
  subscription: any;
  products: any[] = [];
  page: number = 1;
  pagination: Pagination = {};
  constructor(private _productsServices: ProductsService) {}

  loadProducts() {
    this.imageDomain = this._productsServices.imageDomain;
    this.subscription = this._productsServices
      .getproducts(16, this.page, undefined, this.search)
      .subscribe((res) => {
        this.products = res.data;
        this.pagination = res.pagination;
      });
  }
  changePage(page: number) {
    this.page = page;
    this.loadProducts();
  }
  ngOnInit(): void {
    this.loadProducts();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
