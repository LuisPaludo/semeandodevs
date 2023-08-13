import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocationApiService } from '../api/location-api.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  id:any;

  constructor(private route: ActivatedRoute, private api: LocationApiService) {
    this.loadLocation();
  }

  location:any

  ngOnInit(): void {
    this.loadLocation();
  }

  loadLocation() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.api.getLocation(this.id).subscribe({
        next: (data) => {
          this.location = data.name;
        },
        error: (e) => console.log(e.message),
        complete: () => {},
      });
    })
  }
}
