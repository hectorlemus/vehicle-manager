import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { VehicleService } from 'src/app/services/vehicle.service';

import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  mapbox = (mapboxgl as typeof mapboxgl);
  map: mapboxgl.Map | any;

  constructor(
    private vehicleService: VehicleService,
  ) {
    this.mapbox.accessToken = environment.mapBoxToken;
  }

  ngOnInit(): void {
    this.buildMap();
    this.loadVehicle();
  }

  private buildMap(): void {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 10,
      center: [-99.14532606796655, 19.422951670095955]
    });
    this.map.addControl(new mapboxgl.NavigationControl());
  }

  private loadVehicle(): void {
    this.vehicleService.getVehicles().subscribe((response) => {
      console.log(response);
      const vehicles: any[] = response?.data?.userVehicles;
      if (vehicles) {
        vehicles.forEach((vehicle) => this.addMarker(vehicle.lng, vehicle.lat));
      }
    }, (error) => {
      console.log(error);
    });
  }

  private addMarker(lng: number, lat: number): void {
    new mapboxgl.Marker({ color: 'black' })
    .setLngLat([lng, lat])
    .addTo(this.map);
  }

}
