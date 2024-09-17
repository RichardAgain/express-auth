import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SessionsService } from '../../services/session.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  user: any = null
  userService = inject(UserService)

  ngOnInit() {
    this.userService.getUser().subscribe((res: any) => {
      console.log('yup')
      this.user = res.user
    })
  }

  logout() {
    this.userService.logOut()
  }
}
