import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { SidebarComponent } from "../sidebar/sidebar.component";
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from '../header/header.component';
import { UserService } from '../../../../pages/user-form/services/user.service';
import { SessionsService } from '../../../services/session.service';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, SidebarComponent, HeaderComponent, FooterComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  username: string | undefined = ''
  userService = inject(UserService)
  session = inject(SessionsService)
  theme = inject(ThemeService)

  logout() {
    this.userService.logOut()
  }
}
