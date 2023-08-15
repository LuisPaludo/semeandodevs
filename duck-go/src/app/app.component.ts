import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from './api/api.service';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'duck-go';

  cacheUserVerified: boolean;
  userVerified: Observable<boolean>;
  private subscription: Subscription;

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.subscription = this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.userVerified = this.api.isUserVerified();
        if (localStorage.getItem('isVerified')) {
          this.cacheUserVerified = JSON.parse(
            localStorage.getItem('isVerified')
          ).isVerified;
        }
      }
    });
  }

  logout() {
    this.api.logout();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
