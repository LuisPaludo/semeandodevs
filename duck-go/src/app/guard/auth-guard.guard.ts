import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ApiService } from '../api/api.service';


@Injectable({
  providedIn: 'root',
})

export class AuthGuard{
  constructor(private apiService: ApiService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {

    let cacheAuthUser:boolean = false;
    if (localStorage.getItem('isVerified')){
      cacheAuthUser = JSON.parse(
        localStorage.getItem('isVerified')
      ).isVerified;
    }


    return this.apiService.isUserVerified().pipe(
      map(isLoggedIn => {
        console.log(isLoggedIn);
        if (!(isLoggedIn || cacheAuthUser)) {
          this.router.navigate(['']);
          return false
        }
          return true
      })
    )
  }
}


