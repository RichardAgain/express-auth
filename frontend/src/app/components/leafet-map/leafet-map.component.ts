import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-leafet-map',
  standalone: true,
  imports: [],
  templateUrl: './leafet-map.component.html',
  styleUrl: './leafet-map.component.scss',
})
export class LeafetMapComponent implements OnInit {
  map: any;
  markers: L.Marker[] = [];

  lat: number = 10.236396928729727;
  lng: number = -67.96242397055313;

  ngOnInit() {
    this.initMap();
    this.addClickEvent();
  }

  initMap() {
    this.map = L.map('map').setView([this.lat, this.lng], 18);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>',
    }).addTo(this.map);
  }

  addClickEvent() {
    this.map.on('click', (e: any) => {
      const { lat, lng } = e.latlng;

      this.markers.forEach((marker) => this.map.removeLayer(marker));
      this.markers = [];

      const newMarker = L.marker([lat, lng])
        .addTo(this.map)
        .bindPopup(`${lat}, ${lng}`)
        .openPopup();

      this.markers.push(newMarker);

      console.log(`Coordinates: ${lat}, ${lng}`);
      
    });
  }

  getCoordinates() {
    return this.markers.map((marker) => marker.getLatLng());
  }
}
