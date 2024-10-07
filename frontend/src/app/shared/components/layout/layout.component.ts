import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { SessionsService } from '../../services/session.service';
import { ThemeService } from '../../services/theme.service';
import { UserService } from '../../../pages/user-form/services/user.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  username: string | undefined = ''
  userService = inject(UserService)
  session = inject(SessionsService)
  theme = inject(ThemeService)

  constructor () {
    this.username = this.session.getSession()?.username
  }

  logout() {
    this.userService.logOut()
  }
}
