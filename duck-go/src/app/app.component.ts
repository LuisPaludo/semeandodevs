import { Component, OnInit } from '@angular/core';
import { ApiService } from './api/api.service';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'duck-go';

  userVerified: Observable<boolean>;
  logoutButton:boolean = true;

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.userVerified = this.api.isUserVerified();
      }
    });
  }

  logout() {
    this.logoutButton = false;
    this.api.logout();
  }
}
