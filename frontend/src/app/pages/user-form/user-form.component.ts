import { ChangeDetectorRef, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { LeafetMapComponent } from '../../shared/components/leafet-map/leafet-map.component';
import { GeoInfoService } from './services/geo-info.service';
import { CommonModule } from '@angular/common';
import { InputEventsModule } from './input-events/inputs-events.module';
import { UserService } from './services/user.service';
import { ThemeService } from '../../shared/services/theme.service';
import { LayoutComponent } from '../../shared/components/dahsboard/layout/layout.component';
import { ButtonOutlineComponent } from "../../shared/components/buttons/button-outline/button-outline.component";
import { ButtonPrimaryComponent } from "../../shared/components/buttons/button-primary/button-primary.component";
import { LoadingService } from '../../shared/components/loading/loading.service';

interface KLMEvent {
  type: string;
  times: number;
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
    ButtonOutlineComponent,
    ButtonPrimaryComponent
],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent {
  user: any = null;
  userService = inject(UserService);
  locationService = inject(GeoInfoService);
  formBuilder = inject(FormBuilder);
  theme = inject(ThemeService)

  actionList: KLMEvent[] = [];
  lastAction: KLMEvent = { type: 'B', times: 1 };
  totalTime: number = 0;
  cdr = inject(ChangeDetectorRef);

  _loading = inject(LoadingService)

  constructor () {
    this.getUser()
    this.theme.changeTheme()
  }

  getUser() {
    this.userService.getUser().subscribe((res: any) => {
      const user = res.user

      const parsedDate = new Date(user.dob.date);
      const formattedDate = `${('0' + (parsedDate.getMonth() + 1)).slice(-2)}-${('0' + parsedDate.getDate()).slice(-2)}-${parsedDate.getFullYear()}`;
      
      this.profileForm.patchValue({
        ...user,
        dob: formattedDate,
      });
    })
  }

  submitForm() {
    this._loading.isLoading.set(true)

    const formObject = {
      ...this.profileForm.value,
      dob: {
        date: this.profileForm.value.dob,
        age: 0,
      },
    };

    this.userService.updateUser(this.profileForm.value).subscribe((res) => {
      console.log(res, 'LESGOO!!!');
    }).add(() => {
      this._loading.isLoading.set(false)
    })
  }

  getEvents(event: KLMEvent) {
    if (
      (event.type === 'B' && this.lastAction.type === 'K') ||
      (event.type === 'K' && this.lastAction.type === 'B')
    ) {
      this.actionList.push({ type: 'H', times: 1 });
    }

    if (
      this.actionList.length > 0 &&
      event.type === this.actionList[this.actionList.length - 1].type
    ) {
      this.actionList[this.actionList.length - 1].times += 1;
    } else {
      this.actionList.push(event);
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
      const addressData = data.address;

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
            latitude: lat.toString(),
            longitude: lng.toString(),
          },
        },
      });
    });
  }

  profileForm = this.formBuilder.group({
    username: [''],

    name: this.formBuilder.group({
      first: [''],
      last: new FormControl(''),
    }),

    phone: new FormControl(''),
    email: new FormControl(''),
    
    cell: new FormControl(''),

    dob: [''],

    nat: [''],

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
