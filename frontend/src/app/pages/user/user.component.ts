import { Component, inject, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { SessionsService } from '../../services/session.service';
import { UserService } from './user.service';
import { LayoutComponent } from '../../components/layout/layout.component';
import { LeafetMapComponent } from '../../components/leafet-map/leafet-map.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ReactiveFormsModule, LayoutComponent, LeafetMapComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  userService = inject(UserService)

  user: any = null

  ngOnInit () {
    this.user = this.userService.getUser()
  }

  profileForm = new FormGroup({
    username: new FormControl(this.user?.username),

    name: new FormGroup({
      first: new FormControl(''),
      last: new FormControl('')
    }),

    phone: new FormControl(''),
    email: new FormControl(''),
    cell: new FormControl(''),

    dob: new FormGroup({
      date: new FormControl(''),
      age: new FormControl('')
    }),

    location: new FormGroup({
      street: new FormGroup({
        number: new FormControl(''),
        name: new FormControl('')
      }),
      
      city: new FormControl(''),
      state: new FormControl(''),
      country: new FormControl(''),
      postcode: new FormControl(''),
      
      timezone: new FormGroup({
        offset: new FormControl(''),
        description: new FormControl('')
      }),
    }),
  })


}
