import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './services/login.service';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate  {
  constructor(private authService: LoginService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isLoggedIn()) {
      console.log(this.authService.isLoggedIn());
      // Nếu người dùng đã đăng nhập, cho phép truy cập route.
      return true;
    } else {
      // Nếu người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập.
      this.router.navigate(['/login']);
      return false;
    }
  }
}