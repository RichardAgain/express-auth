import { Component } from '@angular/core';
import { ProfileIconComponent } from './profile-icon/profile-icon.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ProfileIconComponent],
  templateUrl: './header.component.html',
})
export class HeaderComponent {


}
