import { Component, inject } from '@angular/core';
import { SessionsService } from '../../../../services/session.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile-icon',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profile-icon.component.html',
  styleUrl: './profile-icon.component.scss'
})
export class ProfileIconComponent {
  session = inject(SessionsService)
  username: string | undefined = ''

  constructor () {
    this.username = this.session.getSession()?.username
  }
}
