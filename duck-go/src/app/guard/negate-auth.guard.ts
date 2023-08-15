import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap, last } from 'rxjs/operators';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class NegateAuthGuard {
  constructor(private apiService: ApiService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {

    let cacheAuthUser: boolean = false;
    if (localStorage.getItem('isVerified')) {
      cacheAuthUser = JSON.parse(localStorage.getItem('isVerified')).isVerified;
    }

    return this.apiService.isUserVerified().pipe(
      map((isLoggedIn) => {
        console.log(isLoggedIn);
        if (!(isLoggedIn || cacheAuthUser)) {
          return true;
        }
        this.router.navigate(['']);
        return false;
      })
    );
  }
}
