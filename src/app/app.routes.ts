import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { authGuard } from './guards/auth.guard';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'Home',
    // canActivate:[authGuard],  وقفت الجارد علشان اعمل تيست عالمنتجات
    component: HomeComponent,
  },
  {
    path: 'products',
    //  canActivate:[authGuard],
    component: ProductsComponent,
  },
  {
    path: 'products/:id',
    //  canActivate:[authGuard],
    component: ProductDetailsComponent,
  },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotfoundComponent },
];
