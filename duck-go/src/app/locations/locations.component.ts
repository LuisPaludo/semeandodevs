import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationApiService } from './api/location-api.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css'],
})
export class LocationsComponent {
  locations: any;

  constructor(private api: LocationApiService) {
    this.getLocations();
  }

  getLocations = () => {
    this.api.getAllLocations().subscribe({
      next: (data) => this.locations = data,
      error: (e) => console.log(e.message),
      complete: () => {}
    });
  };
}
