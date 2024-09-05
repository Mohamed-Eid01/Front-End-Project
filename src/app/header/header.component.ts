import { Component } from '@angular/core';
import { Router, RouterModule, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isLogin: boolean = false;
  constructor(private _Authservice: AuthService, private _Router: Router) {
    //   if (_Authservice.currentUser != null){
    //     this.isLogin = true;
    //   }
    // else {this.isLogin = false;}
    _Authservice.currentUser.subscribe(() => {
      if (_Authservice.currentUser.getValue != null) {
        this.isLogin = true;
      } else {
        this.isLogin;
      }
    });

    console.log(this.isLogin);
  }
  logout() {
    this._Authservice.logout();
    this._Router.navigate(['/login']);
  }
}
