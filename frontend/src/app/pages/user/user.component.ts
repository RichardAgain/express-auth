import { Component, Directive, HostListener, inject, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { SessionsService } from '../../services/session.service';
import { UserService } from './user.service';
import { LayoutComponent } from '../../components/layout/layout.component';
import { LeafetMapComponent } from '../../components/leafet-map/leafet-map.component';
import { GeoInfoService } from './geo-info.service';
import { CommonModule } from '@angular/common';
import { InputEventsModule } from './input-events/inputs-events.module';

interface KLMEvent {
  type: string;
  times?: string;
}

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LayoutComponent,
    LeafetMapComponent,
    InputEventsModule,
    CommonModule,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  user: any = null;
  userService = inject(UserService);
  locationService = inject(GeoInfoService);

  actionList: KLMEvent[] = [];
  lastAction: KLMEvent = { type: 'B' };
  totalTime: number = 0;

  ngOnInit() {
    this.user = this.userService.getUser();
  }

  getEvents(event: KLMEvent) {
    this.actionList.push(event);

    if (
      (event.type === 'B' && this.lastAction.type === 'K') ||
      (event.type === 'K' && this.lastAction.type === 'B')
    ) {
      this.actionList.push({ type: 'H' });
    }

    if (event.type === 'K' || event.type === 'B') {
      this.lastAction = event;
    }

    if (event.type === 'B') {
      this.totalTime += 0.1;
    } else if (event.type === 'K') {
      this.totalTime += 0.2;
    } else if (event.type === 'H') {
      this.totalTime += 0.4;
    } else if (event.type === 'P') {
      this.totalTime += 1.1;
    }

    this.totalTime = Math.round(this.totalTime * 10) / 10;
  }

  getGeoInfo(event: { lat: number; lng: number }) {
    const { lat, lng } = event;

    this.locationService.getLocationInfo(lat, lng).subscribe((data: any) => {
      this.profileForm.patchValue({
        nat: data.address.country,

        location: {
          street: {
            number: data.address.house_number,
            name: data.address.road,
          },
          city: data.address.city,
          state: data.address.state,
          country: data.address.country,
          postcode: data.address.postcode,

          coordinates: {
            latitude: data.lat,
            longitude: data.lon,
          },
        },
      });
    });
  }

  profileForm = new FormGroup({
    username: new FormControl(this.user?.username),

    name: new FormGroup({
      first: new FormControl('Ejemplo'),
      last: new FormControl(''),
    }),

    phone: new FormControl(''),
    email: new FormControl(''),
    cell: new FormControl(''),

    dob: new FormGroup({
      date: new FormControl(''),
      age: new FormControl(''),
    }),

    nat: new FormControl(''),

    location: new FormGroup({
      street: new FormGroup({
        number: new FormControl(''),
        name: new FormControl(''),
      }),

      city: new FormControl(''),
      state: new FormControl(''),
      country: new FormControl(''),
      postcode: new FormControl(''),

      coordinates: new FormGroup({
        latitude: new FormControl(''),
        longitude: new FormControl(''),
      }),
    }),
  });
}
