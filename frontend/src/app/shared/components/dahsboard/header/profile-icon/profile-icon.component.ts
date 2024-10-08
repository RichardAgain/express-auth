import { Component, inject } from '@angular/core';
import { SessionsService } from '../../../../services/session.service';

@Component({
  selector: 'app-profile-icon',
  standalone: true,
  imports: [],
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
