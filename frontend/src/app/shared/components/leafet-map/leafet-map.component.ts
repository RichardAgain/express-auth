import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import * as L from 'leaflet';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-leafet-map',
  standalone: true,
  imports: [],
  templateUrl: './leafet-map.component.html',
  styleUrl: './leafet-map.component.scss',
})
export class LeafetMapComponent implements OnInit {
  map: any;
  theme = inject(ThemeService)
  markers: L.Marker[] = [];

  @Input() coordinates: { lat: number, lng: number } = { lat: 10.236396928729727, lng: -67.96242397055313 };

  @Output() getCoordinatesEvent = new EventEmitter<{ lat: number, lng: number}>();

  ngOnInit() {
    this.initMap();
  }

  icon = L.icon({
    iconUrl: './unnamed.png',
    iconSize: [25, 41],
  });

  constructor () {
    const zoomIn = document.querySelector('.leaflet-control-zoom-in')
  }

  initMap() {
    this.map = L.map('map').setView([this.coordinates.lat, this.coordinates.lng], 18);

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

      const newMarker = L.marker([lat, lng], {
        icon: this.icon
      })
        .addTo(this.map)
        .bindPopup(`${lat}, ${lng}`)
        .openPopup();

      this.markers.push(newMarker);

      this.getCoordinatesEvent.emit({lat, lng});
    });
  }
}
