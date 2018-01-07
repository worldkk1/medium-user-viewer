import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot) {
    // console.log('checkToken: '+localStorage.getItem('authen_code'));
    if (next.url[0] && next.url[0].path === 'login') {
      // console.log('next.url[0].path: '+next.url[0].path);
      if (localStorage.getItem('authen_code')) {
        // already authen
        this.router.navigate(['/']);
        return false;
      } else {
        return true;
      }
    }
    if (localStorage.getItem('authen_code')) {
      // console.log('true');
      if (next.url[0]) {
        // console.log('path: '+next.url[0].path);
        this.router.navigate(['/']);
        return false;
      }
      return true;
    } else {
      // console.log('false');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
