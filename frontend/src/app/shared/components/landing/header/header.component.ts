import { Component, inject } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { Router, RouterLink } from '@angular/router';
import { ProfileIconComponent } from "../../dahsboard/header/profile-icon/profile-icon.component";
import { SessionsService } from '../../../services/session.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, ProfileIconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  session = inject(SessionsService)
  router = inject(Router)
  theme = inject(ThemeService)

  username: string | undefined = ''

  constructor () {
    this.username = this.session.getSession()?.username
  }
}
