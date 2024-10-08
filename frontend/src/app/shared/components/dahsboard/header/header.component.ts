import { Component, inject } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { ProfileIconComponent } from './profile-icon/profile-icon.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ProfileIconComponent],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  theme = inject(ThemeService)

}
