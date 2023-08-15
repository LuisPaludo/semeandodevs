import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProfileApiService } from './api/profile-api.service';
import { User } from './models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: User;
  private userSubscription: Subscription;

  constructor(private api: ProfileApiService) {}

  ngOnInit(): void {
    if (this.api.user) {
      this.user = this.api.user;
    } else {
      this.api.getUser();
      this.userSubscription = this.api.userData$.subscribe((data: User) => {
        if (data) {
          this.user = this.api.user;
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
