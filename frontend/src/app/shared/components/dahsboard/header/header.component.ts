import { Component, inject } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { ProfileIconComponent } from './profile-icon/profile-icon.component';
import { Router, RouterLink } from '@angular/router';
import { SessionsService } from '../../../services/session.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ProfileIconComponent, RouterLink],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  theme = inject(ThemeService)
  session = inject(SessionsService)
  router = inject(Router)

  logOut () {
    this.session.signOut()
    this.router.navigateByUrl('/')
  }

}
