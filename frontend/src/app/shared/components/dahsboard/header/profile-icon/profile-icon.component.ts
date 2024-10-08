import { Component, inject } from '@angular/core';
import { SessionsService } from '../../../../services/session.service';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../../../services/theme.service';

@Component({
  selector: 'app-profile-icon',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profile-icon.component.html',
  styleUrl: './profile-icon.component.scss'
})
export class ProfileIconComponent {
  session = inject(SessionsService)
  theme = inject(ThemeService)
  username: string | undefined = ''

  constructor () {
    this.username = this.session.getSession()?.username
  }
}
